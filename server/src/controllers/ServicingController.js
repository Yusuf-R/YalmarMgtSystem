import AuthController from "./AuthController";
import dbClient from "../utils/db";
import mongoose from "mongoose";
import Servicing from "../models/Servicing";

import {newServiceReportSchemaValidator} from "../utils/Validators/newServiceReportSchema";
import {cloudinary} from "../utils/cloudinary";
import * as fs from "node:fs";

const {ObjectId} = mongoose.Types;

class ServicingController {
    
    static async getAllServicingReport(req, res) {
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
            const allServicingReport = await Servicing.find({}).select('-__v');
            res.status(200).json({
                message: 'All servicing fetched successfully',
                allServicingReport,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
    
    static async newServicingReport(req, res) {
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
            // Ensure images exist in the request body
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({error: 'Missing image files in the request'});
            }
            console.log(req.body);
            const {error, value} = newServiceReportSchemaValidator.validate(req.body, {abortEarly: false});
            if (error) {
                // Format Joi error messages
                console.log('validation error');
                const errMsg = error.details;
                console.log(errMsg);
                // const formattedErrors = error.details.map(detail => {
                //     // Remove slashes and display more readable messages
                //     return detail.message.replace(/["\\]/g, '');
                // });
                return res.status(400).json({error: errMsg});
            }
            // Construct folder path based on site ID, PM instance, and servicing date
            const servicingDate = new Date(value.servicingDate);
            const monthName = servicingDate.toLocaleString('en-US', {month: 'long'}); // Get month name, e.g., "August"
            const folderPath = `YalmarMgtSystem/ServicingReports/${value.siteId}/${servicingDate.getFullYear()}/${monthName}/${value.pmInstance}/${value.servicingDate}/images`;
            // send image files to cloudinary, use the returned urls to save to the database
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
                console.log(uploadError);
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
            // Save the servicing report to the database
            const newServiceReport = await Servicing.create(value);
            if (!newServiceReport) {
                return res.status(500).json({error: 'Servicing report creation failed'});
            }
            res.status(201).json({
                message: 'Servicing created successfully',
                newServiceReport,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = ServicingController;