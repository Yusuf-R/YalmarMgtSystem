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
import Staff from "../models/Staff";

const _ = require('lodash');


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
            const cacheKey = JSON.stringify(value, Object.keys(value).sort());
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
            // cache the data as a json object
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
        console.log('Starter');
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
            console.log(req.files);
            // Ensure images exist in the request body
            if (!req.files || req.files.length === 0) {
                console.log('Point A');
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
            const month = dayjs(value.servicingDate).format('MMMM').toLowerCase();
            const year = dayjs(value.servicingDate).format('YYYY');
            const constructedValue = {
                siteType: value.siteType,
                location: value.location,
                pmInstance: value.pmInstance,
                siteId: value.siteId,
                cluster: value.cluster,
                state: value.state,
                month,
                year
            }
            const cacheKey = JSON.stringify(constructedValue, Object.keys(constructedValue).sort());
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
            const uploadPromises = req.files.map(file => {
                return cloudinary.uploader.upload(file.path, {
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
                });
            });
            let uploadedImages = [];
            try {
                const results = await Promise.all(uploadPromises);
                uploadedImages = results.map((result, index) => {
                    console.log(`Uploaded file ${index + 1} URL: ${result.secure_url}`);
                    return result.secure_url;
                });
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

    static async deleteServiceReport(req, res) {
        try {
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
            // extract the content of the req.body
            const {email, selectedIds} = req.body;
            if (!email || !selectedIds) {
                return res.status(400).json({error: 'Missing email or objectIds'});
            }
            // Basic email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json('Invalid email address');
            }
            // validates the email is indeed a staff and this staff is an admin or superAdmin
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
            // validates the staffIds in the array, array must not be empty
            if (selectedIds.length === 0) {
                return res.status(400).json({error: 'Missing servicing Records Ids'});
            }
            // Call the external async function to delete the cache
            await ServicingController.deleteServiceCache(selectedIds);
            // Call the external async function to delete the cloudinary images
            await ServicingController.deleteServiceCloudinaryImages(selectedIds);
            // // then we can be sure to delete
            const deleted = await Servicing.deleteMany({_id: {$in: selectedIds}});
            if (deleted.deletedCount === 0) {
                return res.status(500).json({error: 'Servicing deletion failed'});
            }
            res.status(200).json({message: 'Servicing Record deleted successfully'});
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }

    static async deleteServiceCache(pmdIds) {
        for (const ids of pmdIds) {
            const serviceRecordObj = await Servicing.findOne({_id: ids});
            if (!serviceRecordObj) {
                throw new Error('Servicing deletion failed');
            }
            const month = dayjs(serviceRecordObj.servicingDate).format('MMMM').toLowerCase();
            const year = dayjs(serviceRecordObj.servicingDate).format('YYYY');
            const constructedValue = {
                siteType: serviceRecordObj.siteType,
                location: serviceRecordObj.location,
                pmInstance: serviceRecordObj.pmInstance,
                siteId: serviceRecordObj.siteId,
                cluster: serviceRecordObj.cluster,
                state: serviceRecordObj.state,
                month,
                year
            }
            const cacheKey = JSON.stringify(constructedValue, Object.keys(constructedValue).sort());
            const cachedData = await redisClient.get(cacheKey);
            const data = JSON.parse(cachedData);
            // check if cacheData array is not empty
            if (data && data.length > 0) {
                // clear it
                await redisClient.del(cacheKey);
                console.log('cache entry deleted successfully');
            }
        }
        return;
    };

    static async deleteServiceCloudinaryImages(pmIds) {
        for (const ids of pmIds) {
            const serviceRecordObj = await Servicing.findOne({_id: ids});
            if (!serviceRecordObj) {
                throw new Error('Servicing deletion failed');
            }
            const servicingDate = new Date(serviceRecordObj.servicingDate);
            const monthName = servicingDate.toLocaleString('en-US', {month: 'long'}); // Get month name, e.g., "August"
            // We need to delete all the files in the pmInstance folder
            const folderPath = `YalmarMgtSystem/ServicingReports/${serviceRecordObj.siteId}/${servicingDate.getFullYear()}/${monthName}/${serviceRecordObj.pmInstance}/${serviceRecordObj.servicingDate}/images`;
            // 1. List all resources (images, files) in the folder and subfolders
            const {resources} = await cloudinary.api.resources({
                type: 'upload',
                prefix: folderPath,
                max_results: 500,
            });
            // 2. Delete each resource found in the list
            const deletePromises = resources.map((resource) => {
                const publicId = resource.public_id;
                console.log(`Deleting ${publicId}`);
                return cloudinary.uploader.destroy(publicId);
            });

            await Promise.all(deletePromises);
            // 3. Delete the folder itself
            // Since Cloudinary doesn’t allow direct folder deletion, ensure it’s empty
            await cloudinary.api.delete_folder(folderPath);
        }

    }
}

module.exports = ServicingController;
