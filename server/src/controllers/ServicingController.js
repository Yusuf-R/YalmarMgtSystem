import mongoose from 'mongoose';
import streamifier from 'streamifier';
import dayjs from 'dayjs';


import AuthController from './AuthController';
import dbClient from '../utils/db';
import Servicing from '../models/Servicing';

import {
    newServiceReportSchemaValidator,
    getServiceRecordSchemaValidator,
} from '../utils/Validators/newServiceReportSchema';
import { cloudinary } from '../utils/cloudinary';
import redisClient from '../utils/redis';
import Staff from '../models/Staff';

const _ = require('lodash');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { ObjectId } = mongoose.Types;

const monthMap = {
    january: 'Jan',
    february: 'Feb',
    march: 'Mar',
    april: 'Apr',
    may: 'May',
    june: 'Jun',
    july: 'Jul',
    august: 'Aug',
    september: 'Sep',
    october: 'Oct',
    november: 'Nov',
    december: 'Dec',
};

class ServicingController {
    static async getAllServicingReport(req, res) {
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
            const allServicingReport = await Servicing.find({}).select('-__v');
            res.status(200).json({
                message: 'All servicing fetched successfully',
                allServicingReport,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            // unexpected error
            return res.status(500).json({ error: error.message });
        }
    }

    static async getServicingReport(req, res) {
        let emptyBit = false;
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
            // validate the request body
            const { error, value } = getServiceRecordSchemaValidator.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
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
                    emptyBit,
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
                    $lt: endDate,
                },
            };
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
                emptyBit,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            // unexpected error

            return res.status(500).json({ error: error.message });
        }
    }

    static async newServicingReport(req, res) {
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
            // Ensure images exist in the request body
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ error: 'Missing image files in the request' });
            }
            const { error, value } = newServiceReportSchemaValidator.validate(req.body, { abortEarly: false });
            if (error) {
                // Format Joi error messages
                const errMsg = error.details;
                return res.status(400).json({ error: errMsg });
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
                year,
            };
            const cacheKey = JSON.stringify(constructedValue, Object.keys(constructedValue).sort());
            const cachedData = await redisClient.get(cacheKey);
            const data = JSON.parse(cachedData);
            // check if cacheData array is not empty
            if (data && data.length > 0) {
                // clear it
                await redisClient.del(cacheKey);
            }
            // Construct folder path based on site ID, PM instance, and servicing date
            const servicingDate = dayjs.utc(value.servicingDate);
            const monthName = servicingDate.format('MMMM'); // Get month name, e.g., "August"
            const dateStr = servicingDate.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'); // Full UTC date string
            const folderPath = `YalmarMgtSystem/ServicingReports/${value.siteId}/${year}/${monthName}/${value.pmInstance}/${dateStr}/images`;

            // Image upload to Cloudinary (in-memory processing)
            const uploadPromises = req.files.map(file =>
                ServicingController.uploadToCloudinary(file.buffer, folderPath));

            let uploadedImages;
            try {
                const results = await Promise.all(uploadPromises);
                uploadedImages = results.map(result => result.secure_url);
            } catch (uploadError) {
                console.error('Error uploading images:', uploadError);
                return res.status(500).json({ error: 'Image upload failed' });
            }

            // Save uploaded image URLs in the report data
            value.images = uploadedImages;

            // Save the new servicing report in the database
            const newServiceReport = await Servicing.create(value);
            if (!newServiceReport) return res.status(500).json({ error: 'Servicing report creation failed' });

            res.status(201).json({
                message: 'Servicing report created successfully',
                newServiceReport,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            // unexpected error
            return res.status(500).json({ error: error.message });
        }
    }

    // Helper function to upload a single file buffer to Cloudinary
    static async uploadToCloudinary(buffer, folderPath) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                folder: folderPath,
                use_filename: true,
                unique_filename: false,
                overwrite: true,
                invalidate: true,
                transformation: [
                    { width: 500, height: 500 },
                    { quality: 'auto', fetch_format: 'auto' },
                ],
                secure: true,
            }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            streamifier.createReadStream(buffer).pipe(stream);
        });
    }

    static async deleteServiceReport(req, res) {
        try {
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
            // extract the content of the req.body
            const { email, selectedIds } = req.body;
            if (!email || !selectedIds) {
                return res.status(400).json({ error: 'Missing email or objectIds' });
            }
            // Basic email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json('Invalid email address');
            }
            // validates the email is indeed a staff and this staff is an admin or superAdmin
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
            // validates the staffIds in the array, array must not be empty
            if (selectedIds.length === 0) {
                return res.status(400).json({ error: 'Missing servicing Records Ids' });
            }
            console.log('I got here');
            console.log({ selectedIds });

            await Promise.all([
                ServicingController.deleteServiceCache(selectedIds),
                ServicingController.deleteServiceCloudinaryImages(selectedIds),
            ]);
            // // then we can be sure to delete
            const deleted = await Servicing.deleteMany({ _id: { $in: selectedIds } });
            if (deleted.deletedCount === 0) {
                return res.status(500).json({ error: 'Servicing deletion failed' });
            }
            res.status(200).json({ message: 'Servicing Record deleted successfully' });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            // unexpected error
            console.log({ error });
            return res.status(500).json({ error: error.message });
        }
    }

    static async deleteServiceCache(pmdIds) {
        try {
            const deleteCachePromises = pmdIds.map(async (id) => {
                const serviceRecordObj = await Servicing.findOne({ _id: id });
                if (!serviceRecordObj) throw new Error('Servicing deletion failed');

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
                    year,
                };
                const cacheKey = JSON.stringify(constructedValue, Object.keys(constructedValue).sort());
                const cachedData = await redisClient.get(cacheKey);
                const data = JSON.parse(cachedData);

                if (data && data.length > 0) {
                    await redisClient.del(cacheKey);
                }
            });

            await Promise.all(deleteCachePromises);
        } catch (error) {
            console.error('Cache Deletion Error:', error.message);
            throw error;
        }
    }

    static async deleteServiceCloudinaryImages(pmIds) {
        try {
            const deleteImagePromises = pmIds.map(async (id) => {
                const serviceRecordObj = await Servicing.findOne({ _id: id });
                if (!serviceRecordObj) throw new Error('Servicing deletion failed');

                const servicingDate = dayjs.utc(serviceRecordObj.servicingDate);
                const monthName = servicingDate.format('MMMM');
                const dateStr = servicingDate.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'); // UTC date string for folder path
    
                const folderPath = `YalmarMgtSystem/ServicingReports/${serviceRecordObj.siteId}/${servicingDate.year()}/${monthName}/${serviceRecordObj.pmInstance}/${dateStr}/images`;
    
                const { resources } = await cloudinary.api.resources({
                    type: 'upload',
                    prefix: folderPath,
                    max_results: 500,
                });

                // eslint-disable-next-line max-len
                const deleteResources = resources.map(resource => cloudinary.uploader.destroy(resource.public_id));
                await Promise.all(deleteResources);

                // Optionally delete the folder if empty
                await cloudinary.api.delete_folder(folderPath);
            });

            await Promise.all(deleteImagePromises);
        } catch (error) {
            console.error('Cloudinary Deletion Error:', error.message);
            throw error;
        }
    }
}

module.exports = ServicingController;
