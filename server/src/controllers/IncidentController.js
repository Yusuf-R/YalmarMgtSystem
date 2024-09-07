import AuthController from "./AuthController";
import dbClient from "../utils/db";
import mongoose from "mongoose";
import {validateIncident} from "../utils/Validators/newIncidentReportSchema";

import dayjs from "dayjs";
import {cloudinary} from "../utils/cloudinary";
import fs from "node:fs";

const {
    Incident,
    StaffIncident,
    SiteIncident,
    FuelIncident,
    ServiceIncident,
    OthersIncident
} = require('../models/Incident');


const {ObjectId} = mongoose.Types;

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
            const reportCategory = value.reportCategory[0];
            let siteId = '';
            let folderPath = '';
            
            if (reportCategory === 'Staff') {
                const {classAction} = value.staffIncidentInfo;
                folderPath = `YalmarMgtSystem/IncidentReports/Staff/${classAction}/${year}/${month}/images`;
            } else if (reportCategory === 'Site') {
                const {category} = value.siteIncidentInfo;
                siteId = value.siteInfo.siteId;
                folderPath = `YalmarMgtSystem/IncidentReports/Site/${category}/${siteId}/${year}/${month}/images`;
            } else if (reportCategory === 'Fuel') {
                const {category} = value.fuelIncidentInfo;
                siteId = value.fuelSiteInfo.siteId;
                folderPath = `YalmarMgtSystem/IncidentReports/Fuel/${category}/${siteId}/${year}/${month}/images`;
            } else if (reportCategory === 'Service') {
                const {category} = value.serviceIncidentInfo;
                siteId = value.serviceSiteInfo.siteId;
                folderPath = `YalmarMgtSystem/IncidentReports/Service/${category}/${siteId}/${year}/${month}/images`;
            } else {
                folderPath = `YalmarMgtSystem/IncidentReports/Others/${year}/${month}/images`;
            }
            const uploadPromises = req.files.map(file =>
                cloudinary.uploader.upload(file.path, {
                    folder: folderPath,
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true,
                    invalidate: true,
                    transformation: [
                        {width: 500, height: 500, crop: 'fill'},
                        {quality: 'auto', fetch_format: 'auto'},
                    ],
                    secure: true
                })
            );
            let uploadedImages = [];
            try {
                const results = await Promise.all(uploadPromises);
                uploadedImages = results.map(result => result.secure_url);
            } catch (uploadError) {
                // Rollback: Delete any successfully uploaded images if any failure occurs
                if (uploadedImages.length > 0) {
                    const deletePromises = uploadedImages.map(image => {
                        const publicId = image.split('/').pop().split('.')[0]; // Extract public ID from URL
                        return cloudinary.uploader.destroy(publicId);
                    });
                    await Promise.all(deletePromises);
                }
                return res.status(500).json({error: 'Image upload failed'});
            } finally {
                // Always delete temp files
                req.files.forEach(file => {
                    fs.unlink(file.path, err => {
                        if (err) {
                            console.error('Failed to delete temp file:', err);
                        }
                    });
                });
            }
            // Update the images array in the request body
            value.images = uploadedImages;
            // Create a new incident report
            if (value.reportCategory.includes('Staff')) {
                // Create and save a StaffIncident
                const staffIncident = new StaffIncident(value);
                await staffIncident.save();
            }
            
            if (value.reportCategory.includes('Fuel')) {
                // Create and save a FuelIncident
                const fuelIncident = new FuelIncident(value);
                await fuelIncident.save();
            }
            
            if (value.reportCategory.includes('Site')) {
                // Create and save a SiteIncident
                const siteIncident = new SiteIncident(value);
                await siteIncident.save();
            }
            
            if (value.reportCategory.includes('Service')) {
                // Create and save a ServiceIncident
                const serviceIncident = new ServiceIncident(value);
                await serviceIncident.save();
            }
            
            if (value.reportCategory.includes('Others')) {
                // Create and save an OthersIncident
                const othersIncident = new OthersIncident(value);
                await othersIncident.save();
            }
            res.status(201).json({message: 'Incident report created successfully'});
            console.log('Incident report created successfully');
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            console.log(error);
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = IncidentController;