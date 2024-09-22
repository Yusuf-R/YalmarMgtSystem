import AuthController from "./AuthController";
import dbClient from "../utils/db";
import mongoose from "mongoose";
import {validateIncident} from "../utils/Validators/newIncidentReportSchema";
import {cloudinary} from "../utils/cloudinary";

import dayjs from "dayjs";
import Staff from "../models/Staff";
import Images from "../models/Images";
// import fs from "node:fs";

const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const {
    Incident,
    StaffIncident,
    SiteIncident,
    FuelIncident,
    ServiceIncident,
    OthersIncident
} = require('../models/Incident');


const {ObjectId} = mongoose.Types;
const {fork} = require('child_process');
const path = require('path');
const fs = require('fs');

class IncidentController {

    static async getAllIncidentReport(req, res) {
        try {
            // perform full current check
            const verifiedJwt = await AuthController.currPreCheck(req);
            if (verifiedJwt instanceof Error) {
                return res.status(400).json({error: verifiedJwt.message});
            }
            const {id} = verifiedJwt;
            if (!id) {
                return res.status(400).json({error: 'Invalid token'});
            }
            // check DB connection
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({error: 'Database connection failed'});
            }
            const admin = await AuthController.AdminCheck(new ObjectId(id));
            if (admin instanceof Error) {
                return res.status(400).json({error: admin.message});
            }
            const allIncidentReport = await Incident.find({}).select('-__v');
            res.status(200).json({
                message: 'All incident report fetched successfully',
                allIncidentReport,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }

    static async newIncidentReport(req, res) {
        try {
            // perform full current check
            const verifiedJwt = await AuthController.currPreCheck(req);
            if (verifiedJwt instanceof Error) {
                return res.status(400).json({error: verifiedJwt.message});
            }
            const {id} = verifiedJwt;
            if (!id) {
                return res.status(400).json({error: 'Invalid token'});
            }
            // check DB connection
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({error: 'Database connection failed'});
            }
            const admin = await AuthController.AdminCheck(new ObjectId(id));
            if (admin instanceof Error) {
                return res.status(400).json({error: admin.message});
            }
            req.body.incidentDate = dayjs(req.body.incidentDate.split('T')[0]).format('YYYY-MM-DD')
            const restoreData = (data) => {
                const restoredData = {};

                Object.keys(data).forEach((key) => {
                    let value = data[key];

                    // Convert JSON strings back to objects or arrays
                    try {
                        if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
                            value = JSON.parse(value);
                        }
                    } catch (e) {
                        // Handle JSON parsing errors
                        console.warn(`Failed to parse ${key}: ${e.message}`);
                    }
                    restoredData[key] = value;
                });
                return restoredData;
            };

            // Convert incoming data
            const originalData = restoreData(req.body);

            // If you expect images to be handled separately, you may need to process them differently
            if (originalData.images && Array.isArray(originalData.images)) {
                originalData.images = originalData.images.map(img => {
                    // Process images if needed, e.g., base64 to Buffer
                    return img; // or any transformation needed
                });
            }
            originalData.incidentDate = dayjs(originalData.incidentDate).format('YYYY-MM-DD');
            const {error, value} = validateIncident(originalData);
            if (error) {
                console.log('validation error');
                const errMsg = error.details;
                console.log(errMsg);
                return res.status(400).json({error: error.details[0].message});
            }
            console.log('Validation passed');
            const month = dayjs(value.incidentDate).format('MMM').toUpperCase();
            const year = dayjs(value.incidentDate).format('YYYY');
            const currTime = dayjs(new Date()).format('LT');
            console.log({currTime});

            const dateVar = dayjs(value.incidentDate).format('MMMM-DD-YYYY') + '-' + currTime.replace(/ /g, '-');
            console.log({dateVar});
            const reportCategory = value.reportCategory[0];
            let siteId = '';
            let folderPath = '';

            if (reportCategory === 'Staff') {
                const {classAction} = value.staffIncidentInfo;
                folderPath = `YalmarMgtSystem/IncidentReports/Staff/${classAction}/${year}/${month}/${dateVar}/images`;
            } else if (reportCategory === 'Site') {
                const {category} = value.siteIncidentInfo;
                siteId = value.siteInfo.siteId;
                folderPath = `YalmarMgtSystem/IncidentReports/Site/${category}/${siteId}/${year}/${month}/${dateVar}/images`;
            } else if (reportCategory === 'Fuel') {
                const {category} = value.fuelIncidentInfo;
                siteId = value.fuelSiteInfo.siteId;
                folderPath = `YalmarMgtSystem/IncidentReports/Fuel/${category}/${siteId}/${year}/${month}/${dateVar}/images`;
            } else if (reportCategory === 'Service') {
                const {category} = value.serviceIncidentInfo;
                siteId = value.serviceSiteInfo.siteId;
                folderPath = `YalmarMgtSystem/IncidentReports/Service/${category}/${siteId}/${year}/${month}/${dateVar}/images`;
            } else {
                folderPath = `YalmarMgtSystem/IncidentReports/Others/${year}/${month}/${dateVar}/images`;
            }
            // Get the paths of uploaded files, but only proceed with images if they are uploaded
            const filePaths = req.files ? req.files.map(file => file.path) : [];

            // If no images are provided, we proceed with report creation without image processing
            if (filePaths.length === 0) {
                try {
                    // Save the incident report without images
                    await IncidentController.saveIncidentReport(value);
                    return res.status(201).json({message: 'Incident report created successfully without images'});
                } catch (err) {
                    console.log('Error saving incident:', err);
                    return res.status(500).json({error: 'Failed to save incident'});
                }
            }

            // If images are provided, we process and upload them
            const workerProcess = fork(path.resolve(__dirname, '../workers/imageWorker.js'));

            workerProcess.on('error', (error) => {
                console.error('Worker process error:', error);
                return res.status(500).json({error: 'Image processing failed'});
            });

            workerProcess.on('exit', (code) => {
                if (code !== 0) {
                    console.error(`Worker exited with code ${code}`);
                    return res.status(500).json({error: 'Worker process failed'});
                }
            });

            console.log({folderPath});

            // Send the file paths and other required data to the worker process
            workerProcess.send({
                filePaths,
                folderPath: folderPath,
            });

            workerProcess.on('message', async (uploadedImages) => {
                if (uploadedImages.error) {
                    return res.status(500).json({error: 'Image upload failed'});
                }

                // Add the uploaded images to the incident report
                value.images = uploadedImages;

                // Create the incident report with the images
                try {
                    await IncidentController.saveIncidentReport(value);
                    return res.status(201).json({message: 'Incident report created successfully with images'});
                } catch (err) {
                    console.log('Error saving incident:', err);
                    return res.status(500).json({error: 'Failed to save incident'});
                }
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            } else {
                console.log(error);
                return res.status(500).json({error: error.message});
            }
        }
    }

    static async saveIncidentReport(incidentData) {
        const categoryMap = {
            'Staff': StaffIncident,
            'Fuel': FuelIncident,
            'Site': SiteIncident,
            'Service': ServiceIncident,
            'Others': OthersIncident,
            // Add more categories here as needed
        };

        // If images are included in the incident, update the reference count
        if (incidentData.images && incidentData.images.length > 0) {
            await IncidentController.updateImageReferences(incidentData.images);
        }

        // Loop through each category in the array
        for (const category of incidentData.reportCategory) {
            const IncidentModel = categoryMap[category];
            if (IncidentModel) {
                console.log(`Saving ${category} incident`);
                const incident = new IncidentModel(incidentData);
                await incident.save();
            } else {
                console.warn(`Unknown category: ${category}`);
            }
        }
    }

    // Function to update or create image reference counts
    static async updateImageReferences(images) {
        for (const image of images) {
            const existingImage = await Images.findOne({url: image});
            if (existingImage) {
                existingImage.referenceCount += 1;
                await existingImage.save();
            } else {
                // Create a new image entry if not found
                const newImage = new Images({url: image, referenceCount: 1});
                await newImage.save();
            }
        }
    }


    static async deleteIncidentReport(req, res) {
        try {
            const verifiedJwt = await AuthController.currPreCheck(req);
            if (verifiedJwt instanceof Error) {
                return res.status(400).json({error: verifiedJwt.message});
            }
            const {id} = verifiedJwt;
            if (!id) {
                return res.status(400).json({error: 'Invalid token'});
            }
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({error: 'Database connection failed'});
            }
            const admin = await AuthController.AdminCheck(new ObjectId(id));
            if (admin instanceof Error) {
                return res.status(400).json({error: admin.message});
            }

            const {email, selectedIds} = req.body;
            if (!email || !selectedIds) {
                return res.status(400).json({error: 'Missing email or objectIds'});
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json('Invalid email address');
            }
            const staff = await Staff.findOne({email});
            if (!staff) {
                return res.status(400).json({error: 'Invalid email credentials'});
            }
            if (staff.role !== 'Admin' && staff.role !== 'SuperAdmin') {
                return res.status(400).json({error: 'You are not authorized to delete this record'});
            }
            if (admin.email !== staff.email) {
                return res.status(400).json({error: 'You are not authorized to delete this record'});
            }
            if (selectedIds.length === 0) {
                return res.status(400).json({error: 'Missing incident Records Ids'});
            }

            for (const id of selectedIds) {
                const incident = await Incident.findById(new ObjectId(id));
                if (incident) {
                    const {incidentType, images} = incident;
                    const incidentModels = {
                        'StaffIncident': StaffIncident,
                        'SiteIncident': SiteIncident,
                        'FuelIncident': FuelIncident,
                        'ServiceIncident': ServiceIncident,
                        'OthersIncident': OthersIncident
                    };
                    const IncidentModel = incidentModels[incidentType];
                    if (!IncidentModel) {
                        return res.status(400).json({error: `Invalid incident type: ${incidentType}`});
                    }

                    // Decrement image reference count and delete images if necessary
                    await IncidentController.decrementImageReferences(images);

                    // Delete the specific incident
                    await IncidentModel.deleteOne({_id: id});

                }
            }
            return res.status(200).json({message: 'Incident report(s) deleted successfully'});
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            return res.status(500).json({error: error.message});
        }
    }

    // Extract folder path from the image URL
    static extractFolderPathFromUrl(url) {
        const urlParts = url.split('/');
        const folderIndex = urlParts.findIndex(part => part === 'YalmarMgtSystem');
        // Join parts starting from 'YalmarMgtSystem' to the second last part (excluding the filename)
        return urlParts.slice(folderIndex, urlParts.length - 1).join('/');
    }

    // Function to decrement image references and delete if count reaches zero
    static async decrementImageReferences(images) {
        console.log('I got here decremental references');
        for (const image of images) {
            const existingImage = await Images.findOne({url: image});
            if (existingImage) {
                console.log('I got here A');
                // Check if the image is referenced by only one incident before decrementing
                if (existingImage.referenceCount === 1) {
                    // If this is the last reference, delete the image from both Cloudinary and the database
                    await Images.deleteOne({url: image});

                    // Extract the folder path from the image URL
                    const folderPath = IncidentController.extractFolderPathFromUrl(image);
                    // Delete all resources in the folder from Cloudinary
                    const {resources} = await cloudinary.api.resources({
                        type: 'upload',
                        prefix: folderPath,
                        max_results: 500,
                    });
                    // Delete all images in the folder
                    const deletePromises = resources.map((resource) => {
                        return cloudinary.uploader.destroy(resource.public_id);
                    });
                    await Promise.all(deletePromises);
                    // Optionally, delete the folder (Cloudinary auto-deletes empty folders)
                    await cloudinary.api.delete_folder(folderPath);
                } else {
                    // Decrease the reference count and save the updated image record
                    existingImage.referenceCount -= 1;
                    await existingImage.save();
                }
            }
        }
    }

}

module.exports = IncidentController;