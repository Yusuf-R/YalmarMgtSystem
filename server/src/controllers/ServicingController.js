import AuthController from "./AuthController";
import dbClient from "../utils/db";
import mongoose from "mongoose";
import Servicing from "../models/Servicing";

import {
    newServiceReportSchemaValidator,
    getServiceRecordSchemaValidator
} from "../utils/Validators/newServiceReportSchema";
import {cloudinary} from "../utils/cloudinary";
import * as fs from "node:fs";
import redisClient from "../utils/redis";
import dayjs from "dayjs";

const {ObjectId} = mongoose.Types;

const monthMap = {
    "january": "Jan",
    "february": "Feb",
    "march": "Mar",
    "april": "Apr",
    "may": "May",
    "june": "Jun",
    "july": "Jul",
    "august": "Aug",
    "september": "Sep",
    "october": "Oct",
    "november": "Nov",
    "december": "Dec"
};

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
    
    static async getServicingReport(req, res) {
        let emptyBit = false;
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
            // validate the request body
            const {error, value} = getServiceRecordSchemaValidator.validate(req.body, {abortEarly: false});
            if (error) {
                return res.status(400).json({error: error.details[0].message});
            }
            // Note for future debugging: - the month is in lower case due to passing it through joi validation
            // generate a unique key for caching
            const cacheKey = JSON.stringify(value);
            // check if the key exists in the cache
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                // check if the cacheData is empty
                const parsedData = JSON.parse(cachedData);
                // Check if the cached data is empty
                if (parsedData.length === 0) {
                    emptyBit = true;
                }
                return res.status(200).json({
                    message: 'Servicing fetched successfully',
                    servicingReport: parsedData,
                    emptyBit
                });
            }
            // Convert the month input to lowercase to handle case insensitivity
            const monthAbbr = monthMap[value.month];
            // Construct the start and end of the month in the string format
            const startDate = new Date(`Fri ${monthAbbr} 01 ${value.year} 00:00:00 GMT+0100 (West Africa Standard Time)`);
            const endDate = new Date(`Sun ${monthAbbr} 31 ${value.year} 23:59:59 GMT+0100 (West Africa Standard Time)`);
            
            // create the query object
            const query = {
                pmInstance: value.pmInstance,
                siteId: value.siteId,
                cluster: value.cluster,
                state: value.state,
                location: value.location,
                siteType: value.siteType,
                servicingDate: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
            // Query the database if no cached data is found
            const servicingReport = await Servicing.find(query).select('-__v');
            if (servicingReport.length === 0) {
                emptyBit = true;
            }
            // cache the data
            await redisClient.set(cacheKey, JSON.stringify(servicingReport), 3600); // cache for 1-hour
            res.status(201).json({
                message: 'Report fetched successfully',
                servicingReport,
                emptyBit
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
            // we need to construct the cacheKey base on this example format
            //cacheKey: '{"siteType":"TERMINAL","location":"AIR FORCE BASE","pmInstance":"PM2","year":"2024","month":"august","siteId":"KAD020","cluster":"KADUNA-CENTRAL","state":"KADUNA"}'
            // }
            // check if this data already exists in our redisCache
            // we need to construct month example -- august, and also year example -- 2024 from the servicing Date using dayjs
            const month = dayjs(value.servicingDate).format('MMMM').toLowerCase();
            const year = dayjs(value.servicingDate).format('YYYY');
            const cacheKey = JSON.stringify({
                siteType: value.siteType,
                location: value.location,
                pmInstance: value.pmInstance,
                siteId: value.siteId,
                cluster: value.cluster,
                state: value.state,
                month,
                year
            });
            const cachedData = await redisClient.get(cacheKey);
            const data = JSON.parse(cachedData);
            // check if cacheData array is not empty
            if (data && data.length > 0) {
                // clear it
                await redisClient.del(cacheKey);
                console.log('entry deleted successfully');
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
