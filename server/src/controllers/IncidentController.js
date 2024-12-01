import mongoose from 'mongoose';
import streamifier from 'streamifier';
import dayjs from 'dayjs';
import { cloudinary } from '../utils/cloudinary';
import { validateIncident } from '../utils/Validators/newIncidentReportSchema';
import dbClient from '../utils/db';
import AuthController from './AuthController';
import Staff from '../models/Staff';
import Images from '../models/Images';
// import fs from "node:fs";

const localizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(localizedFormat);

const {
    Incident,
    StaffIncident,
    SiteIncident,
    FuelIncident,
    ServiceIncident,
    OthersIncident,
} = require('../models/Incident');

const { ObjectId } = mongoose.Types;

class IncidentController {

    static async getAllIncidentReport(req, res) {
        try {
            // perform full current check
            const verifiedJwt = await AuthController.currPreCheck(req);
            if (verifiedJwt instanceof Error) {
                return res.status(400).json({ error: verifiedJwt.message });
            }
            const { id } = verifiedJwt;
            if (!id) {
                return res.status(400).json({ error: 'Invalid token' });
            }
            // check DB connection
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({ error: 'Database connection failed' });
            }
            const admin = await AuthController.AdminCheck(new ObjectId(id));
            if (admin instanceof Error) {
                return res.status(400).json({ error: admin.message });
            }
            const allIncidentReport = await Incident.find({}).select('-__v');
            res.status(200).json({
                message: 'All incident report fetched successfully',
                allIncidentReport,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            // unexpected error
            return res.status(500).json({ error: error.message });
        }
    }

    static async newIncidentReport(req, res) {
        try {
            // perform full current check
            const verifiedJwt = await AuthController.currPreCheck(req);
            if (verifiedJwt instanceof Error) {
                return res.status(400).json({ error: verifiedJwt.message });
            }
            const { id } = verifiedJwt;
            if (!id) {
                return res.status(400).json({ error: 'Invalid token' });
            }
            // check DB connection
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({ error: 'Database connection failed' });
            }
            const admin = await AuthController.AdminCheck(new ObjectId(id));
            if (admin instanceof Error) {
                return res.status(400).json({ error: admin.message });
            }
            req.body.incidentDate = dayjs(req.body.incidentDate.split('T')[0]).format('YYYY-MM-DD');

            // Convert incoming data
            const originalData = IncidentController.restoreData(req.body);

            originalData.incidentDate = dayjs(originalData.incidentDate).format('YYYY-MM-DD');
            const { error, value } = validateIncident(originalData);
            if (error) {
                const errMsg = error.details;
                console.log({ errMsg });
                return res.status(400).json({ error: error.details[0].message });
            }

            if (!req.files || req.files.length === 0) {
                await IncidentController.saveIncidentReport(value);
                return res.status(201).json({ message: 'Incident report created successfully without images' });
            }

            // this implicit else flow means we have an image to upload

            const folderPath = IncidentController.generateFolderPath(value);

            const uploadPromises = req.files.map(file =>
                IncidentController.uploadToCloudinary(file.buffer, folderPath)
            );

            try {
                const uploadResults = await Promise.all(uploadPromises);
                const uploadedImages = uploadResults.map(result => result.secure_url);

                // Only proceed if all images are successfully uploaded
                value.images = uploadedImages;
                await IncidentController.saveIncidentReport(value);
                return res.status(201).json({ message: 'Incident report created successfully with images' });


            } catch (uploadError) {
                // If any image upload fails, delete all images uploaded in this session
                console.error('Error uploading images:', uploadError);
                const deletionPromises = req.files.map(file => cloudinary.uploader.destroy(file.public_id));
                await Promise.all(deletionPromises);
                return res.status(500).json({ error: 'Image upload failed. No images were saved.' });
            }
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    static restoreData(data) {
        const restoredData = {};
        Object.keys(data).forEach((key) => {
            let value = data[key];
            try {
                if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
                    value = JSON.parse(value);
                }
            } catch (e) {
                console.warn(`Failed to parse ${key}: ${e.message}`);
            }
            restoredData[key] = value;
        });
        return restoredData;
    }

    // Helper function for unique Cloudinary upload with buffer
    static async uploadToCloudinary(buffer, folderPath) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: folderPath,
                    use_filename: true,
                    unique_filename: true, // Ensure a unique filename
                    overwrite: false,
                    transformation: [
                        { width: 500, height: 500 },
                        { quality: 'auto', fetch_format: 'auto' },
                    ],
                    secure: true,
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            streamifier.createReadStream(buffer).pipe(stream);
        });
    }

    // Helper function to generate the folder path based on incident data
    static generateFolderPath(data) {
        const month = dayjs(data.incidentDate).format('MMM').toUpperCase();
        const year = dayjs(data.incidentDate).format('YYYY');
        const currTime = dayjs().format('LT').replace(/ /g, '-');
        const dateVar = `${dayjs(data.incidentDate).format('MMMM-DD-YYYY')}-${currTime}`;

        switch (data.reportCategory[0]) {
            case 'Staff':
                return `YalmarMgtSystem/IncidentReports/Staff/${data.staffIncidentInfo.classAction}/${year}/${month}/${dateVar}/images`;
            case 'Site':
                return `YalmarMgtSystem/IncidentReports/Site/${data.siteIncidentInfo.category}/${data.siteInfo.siteId}/${year}/${month}/${dateVar}/images`;
            case 'Fuel':
                return `YalmarMgtSystem/IncidentReports/Fuel/${data.fuelIncidentInfo.category}/${data.fuelSiteInfo.siteId}/${year}/${month}/${dateVar}/images`;
            case 'Service':
                return `YalmarMgtSystem/IncidentReports/Service/${data.serviceIncidentInfo.category}/${data.serviceSiteInfo.siteId}/${year}/${month}/${dateVar}/images`;
            default:
                return `YalmarMgtSystem/IncidentReports/Others/${year}/${month}/${dateVar}/images`;
        }
    }

    // Save incident report with batched reference count update
    static async saveIncidentReport(incidentData) {
        const categoryMap = {
            Staff: StaffIncident,
            Fuel: FuelIncident,
            Site: SiteIncident,
            Service: ServiceIncident,
            Others: OthersIncident,
        };

        // Batch update for image reference counts
        if (incidentData.images && incidentData.images.length > 0) {
            await IncidentController.updateImageReferences(incidentData.images);
        }

        for (const category of incidentData.reportCategory) {
            const IncidentModel = categoryMap[category];
            if (IncidentModel) {
                const incident = new IncidentModel(incidentData);
                await incident.save();
            } else {
                console.warn(`Unknown category: ${category}`);
            }
        }
    }

    // Batch image reference count update to avoid looped async calls
    static async updateImageReferences(images) {
        const imageOperations = images.map(async (url) => {
            const existingImage = await Images.findOne({ url });
            if (existingImage) {
                existingImage.referenceCount += 1;
                await existingImage.save();
            } else {
                await Images.create({ url, referenceCount: 1 });
            }
        });
        await Promise.all(imageOperations);
    }

    static async deleteIncidentReport(req, res) {
        try {
            const verifiedJwt = await AuthController.currPreCheck(req);
            if (verifiedJwt instanceof Error) {
                return res.status(400).json({ error: verifiedJwt.message });
            }
            const { id } = verifiedJwt;
            if (!id) {
                return res.status(400).json({ error: 'Invalid token' });
            }
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({ error: 'Database connection failed' });
            }
            const admin = await AuthController.AdminCheck(new ObjectId(id));
            if (admin instanceof Error) {
                return res.status(400).json({ error: admin.message });
            }

            const { email, selectedIds } = req.body;
            if (!email || !selectedIds) {
                return res.status(400).json({ error: 'Missing email or objectIds' });
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json('Invalid email address');
            }
            const staff = await Staff.findOne({ email });
            if (!staff) {
                return res.status(400).json({ error: 'Invalid email credentials' });
            }
            if (staff.role !== 'Admin' && staff.role !== 'SuperAdmin') {
                return res.status(400).json({ error: 'You are not authorized to delete this record' });
            }
            if (admin.email !== staff.email) {
                return res.status(400).json({ error: 'You are not authorized to delete this record' });
            }
            if (selectedIds.length === 0) {
                return res.status(400).json({ error: 'Missing incident Records Ids' });
            }

            // Process all selected IDs concurrently
            const deletePromises = selectedIds.map(async (id) => {
                const incident = await Incident.findById(new ObjectId(id));
                if (incident) {
                    const { incidentType, images } = incident;
                    const incidentModels = {
                        StaffIncident,
                        SiteIncident,
                        FuelIncident,
                        ServiceIncident,
                        OthersIncident,
                    };
                    const IncidentModel = incidentModels[incidentType];
                    if (!IncidentModel) {
                        throw new Error(`Invalid incident type: ${incidentType}`);
                    }

                    // Decrement image references and delete images if necessary
                    await IncidentController.decrementImageReferences(images);

                    // Delete the specific incident
                    await IncidentModel.deleteOne({ _id: id });
                }
            });
            await Promise.all(deletePromises);
            return res.status(200).json({ message: 'Incident report(s) deleted successfully' });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            console.log({ error });
            return res.status(500).json({ error: error.message });
        }
    }

    // Extract folder path from the image URL
    static extractFolderPathFromUrl(url) {
        const urlParts = url.split('/');
        const folderIndex = urlParts.findIndex(part => part === 'YalmarMgtSystem');
        // Join parts starting from 'YalmarMgtSystem' to the second last part (excluding the filename)
        return urlParts.slice(folderIndex, urlParts.length - 1).join('/');
    }

    // Optimize decrementImageReferences for concurrent processing
    static async decrementImageReferences(images) {
        const decrementPromises = images.map(async (image) => {
            const existingImage = await Images.findOne({ url: image });
            if (existingImage) {
                if (existingImage.referenceCount === 1) {
                    await Images.deleteOne({ url: image });

                    // Delete from Cloudinary
                    const folderPath = IncidentController.extractFolderPathFromUrl(image);
                    const { resources } = await cloudinary.api.resources({
                        type: 'upload',
                        prefix: folderPath,
                        max_results: 500,
                    });
                    const deleteResourcePromises = resources.map((resource) =>
                        cloudinary.uploader.destroy(resource.public_id));
                    await Promise.all(deleteResourcePromises);
                    await cloudinary.api.delete_folder(folderPath);
                } else {
                    existingImage.referenceCount -= 1;
                    await existingImage.save();
                }
            }
        });
        await Promise.all(decrementPromises);
    }
}

module.exports = IncidentController;
