import dayjs from 'dayjs';
import mongoose from 'mongoose';
import SecurityConfig from '../utils/config';
import AuthController from './AuthController';

import { editStaffSchemaValidator } from '../utils/Validators/editStaffSchema';
import { newStaffSchemaValidator } from '../utils/Validators/newStaffSchema';
import redisClient from '../utils/redis';
import { cloudinary } from '../utils/cloudinary';

const { Worker } = require('node:worker_threads');
const path = require('path');

const bcrypt = require('bcrypt');
const Staff = require('../models/Staff');
const BioDataUpdateRequest = require('../models/BioDataUpdateRequest');
const authClient = require('./AuthController');
const RefreshToken = require('../models/RefreshToken');
const dbClient = require('../utils/db');
const MailClient = require('../utils/mailer');

const securityConfig = new SecurityConfig();
const staffRef = ['username', 'country', 'city', 'phone', 'isAdmin', 'img'];
const forbiddenUpdate = ['email', 'dob', '_id', 'createdAt', 'updatedAt', '__v'];
const { ObjectId } = mongoose.Types;

class StaffController {
    static async login(req, res) {
        const { encryptedData } = req.body;
        if (!encryptedData) {
            return res.status(400).json({ error: 'Missing login data' });
        }
        try {
            const decryptedData = await authClient.loginDecrypt(encryptedData);
            // decrypt data
            if (!decryptedData) {
                return res.status(400).json({ error: 'Invalid data' });
            }
            const { email, password } = decryptedData;
            if (!email) {
                return res.status(400).json({
                    error: 'Missing email address',
                    reqFormat: ' { email:  <string>, password:  <string> }',
                });
            }
            if (!password) {
                return res.status(400).json({
                    error: 'Missing password',
                    reqFormat: ' { email:  <string>, password:  <string> }',
                });
            }
            // check DB connection
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({ error: 'Database connection failed' });
            }
            const staff = await Staff.findOne({ email });
            if (!staff) {
                return res
                    .status(404)
                    .json({ error: 'AllStaff with this email address not found' });
            }
            const isMatch = await bcrypt.compare(password, staff.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Incorrect password' });
            }
            const id = staff._id.toString();
            if (!id) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // set up JWT token using this credentials
            const { accessToken, refreshToken } = await authClient.generateJWT(staff);
            if (!accessToken || !refreshToken) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // set the access token to redis client
            try {
                await authClient.setJWT(staff, accessToken);
            } catch (err) {
                return res.status(500).json({ error: 'Redis Internal Server Error' });
            }
            // encrypt our accessToken with our CIPHER_TOKEN_SECRET
            const encryptedAccessToken = securityConfig.encryptData(accessToken);

            res.cookie('accessToken', encryptedAccessToken, {
                secure: true,
                sameSite: 'None',
                httpOnly: true,
            });
            // Return the encrypted access token in the response body
            return res.status(201).json({
                message: 'Login successful',
                accessToken: encryptedAccessToken,
            });
        } catch (err) {
            if (err.code === 11000) {
                let duplicate = Object.keys(err.keyValue)[0];
                // capitalize the first character of duplicate
                duplicate = duplicate.charAt(0).toUpperCase() + duplicate.slice(1);
                return res.status(409).json({
                    error: `Duplicate Error: ${duplicate} Credentials already exists`,
                });
            }
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async logout(req, res) {
        try {
            const verifiedToken = await authClient.currPreCheck(req);
            if (verifiedToken instanceof Error) {
                return res.status(401).json({ error: verifiedToken.message });
            }
            // delete the access token from Redis
            const result = await authClient.deleteJWT(verifiedToken.id);
            if (result.error) {
                return res.status(500).json(result);
            }
            const ret = await RefreshToken.deleteOne({ staffId: verifiedToken.id });
            if (ret.deletedCount === 0) {
                return res.status(500).json({ error: 'Token Object does not exit' });
            }
            if (ret.deletedCount === 1 && result === 1) {
                // delete all the content of the cookie
                res.clearCookie('accessToken');
                res.clearCookie('staffData');
                res.clearCookie('rememberMe');
                return res.status(200).json({ message: 'Logout successful' });
            }
            return res
                .status(500)
                .json({ error: 'Invalid Operational Request', msg: 'Logout failed' });
        } catch (err) {
            return res.status(401).json({ error: err.message });
        }
    }

    static async createNew(req, res) {
        try {
            const verifiedJWT = await AuthController.currPreCheck(req);
            if (verifiedJWT instanceof Error) {
                return res.status(400).json({ error: verifiedJWT.message });
            }
            const { id } = verifiedJWT;
            if (!id) {
                return res.status(400).json({ error: 'Invalid token' });
            }
            const admin = await AuthController.AdminCheck(id);
            if (admin instanceof Error) {
                return res.status(400).json({ error: admin.message });
            }
            // validate the request body against Joi
            const { error, value } = newStaffSchemaValidator.validate(req.body, { abortEarly: false });
            const clearPassword = value.password;
            if (error) {
                // Format Joi error messages
                const formattedErrors = error.details.map(detail =>
                    // Remove slashes and display more readable messages
                    detail.message.replace(/["\\]/g, ''));
                return res.status(400).json({ error: formattedErrors });
            }
            //  correctly format the dob, employmentDate, graduationDate to DD-MMM-YYYY
            value.dob = dayjs(value.dob).format('DD-MMM-YYYY');
            value.employmentDate = dayjs(value.employmentDate).format('DD-MMM-YYYY');
            value.graduationDate = dayjs(value.graduationDate).format('DD-MMM-YYYY');
            // check if server is up before verifying
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({ error: 'Database connection failed' });
            }
            // Hash the password
            const saltRounds = 10;
            value.password = await bcrypt.hash(value.password, saltRounds);
            // check DB connection
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({ error: 'Database connection failed' });
            }
            await Staff.create(value);
            return res.status(201).json({
                msg: 'AllStaff object successfully created',
                email: value.email,
                password: clearPassword,
            });
        } catch (err) {
            // check if err message is 'jwt expired'
            if (err.message === 'jwt expired') {
                return res.status(401).json({ error: err.message });
            }
            if (err.code === 11000) {
                let duplicate = Object.keys(err.keyValue)[0];
                // capitalize the first character of duplicate
                duplicate = duplicate.charAt(0).toUpperCase() + duplicate.slice(1);
                return res.status(409).json({
                    error: `Duplicate Error: ${duplicate} Credentials already exists`,
                });
            }
            if (err.code === 57) {
                return res.status(406).json({ error: 'DottedFieldName: Error in field names' });
            }
            return res.status(500).json({ error: err.message });
        }
    }

    // get a single staff data
    static async getStaffData(req, res) {
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
            const staffData = await Staff.findById(id).select('-password -createdAt -updatedAt -__v');
            if (!staffData) {
                return res.status(404).json({ error: 'AllStaff not found' });
            }
            return res.status(200).json({ message: 'AllStaff data retrieved successfully', staffData });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            // unexpected error
            return res.status(500).json({ error: error.message });
        }
    }

    // get all staff data
    static async getAllStaff(req, res) {
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
            const allStaff = await Staff.find().select('-password -createdAt -updatedAt -__v');
            if (!allStaff) {
                return res.status(404).json({ error: 'No staff found' });
            }
            return res.status(200).json({
                message: 'All staff retrieved successfully',
                allStaff,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            // unexpected error
            return res.status(500).json({ error: error.message });
        }
    }

    static async updateStaff(req, res) {
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
            const admin = await AuthController.AdminCheck(id);
            if (admin instanceof Error) {
                return res.status(400).json({ error: admin.message });
            }
            // validate the request body against Joi
            const { error, value } = editStaffSchemaValidator.validate(req.body, { abortEarly: false });
            if (error) {
                // Format Joi error messages
                const formattedErrors = error.details.map(detail =>
                    // Remove slashes and display more readable messages
                    detail.message.replace(/["\\]/g, ''));
                return res.status(400).json({ error: 'Form Validation Error' });
                // return res.status(400).json({error: formattedErrors});
            }
            // check if server is up before verifying
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({ error: 'Database connection failed' });
            }
            // check if the staff exists
            const staff = await Staff.findById(value._id);
            if (!staff) {
                return res.status(400).json({ error: 'AllStaff not found' });
            }
            // check for id Integrity
            if (staff._id.toString() !== value._id) {
                return res.status(400).json({ error: 'ID Integrity Violation' });
            }
            // check for email integrity
            if (staff.email !== value.email) {
                return res.status(400).json({ error: 'Email Integrity Violation' });
            }
            // ensure DOB integrity
            value.dob = dayjs(value.dob).format('DD-MMM-YYYY');
            if (staff.dob !== value.dob) {
                return res.status(400).json({ error: 'DOB Integrity Violation' });
            }
            //  we can assume that integrity is passed, then we can remove the forbidden fields from the req.body
            for (const key of forbiddenUpdate) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    delete value[key];
                }
            }
            // update the staff profile
            const updatedStaff = await Staff.findByIdAndUpdate(staff._id, value, {
                new: true,
                runValidators: true,
                context: 'query',
            });
            if (!updatedStaff) {
                return res.status(400).json({ error: 'Failed to update staff profile' });
            }
            return res.status(201).json({ message: 'AllStaff profile updated successfully', updatedStaff });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            // unexpected error
            return res.status(500).json({ error: error.message });
        }
    }

    static async deleteStaff(req, res) {
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
            const admin = await AuthController.AdminCheck(id);
            if (admin instanceof Error) {
                return res.status(400).json({ error: admin.message });
            }
            // extract the content of the req.body
            const { email, selectedIds } = req.body;
            if (!email || !selectedIds) {
                return res.status(400).json({ error: 'Missing email or staffIds' });
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
                return res.status(400).json({ error: 'You are not authorized to delete staff' });
            }
            if (admin.email !== staff.email) {
                return res.status(400).json({ error: 'You are not authorized to delete staff' });
            }
            // validates the staffIds in the array, array must not be empty
            if (selectedIds.length === 0) {
                return res.status(400).json({ error: 'Missing staffIds' });
            }
            // use deleteMany to delete multiple staff members
            const deletedStaff = await Staff.deleteMany({ _id: { $in: selectedIds } });
            if (deletedStaff.deletedCount === 0) {
                return res.status(400).json({ error: 'Failed to delete staff' });
            }
            // delete every stored refreshToken associated with the ids in the DB
            await RefreshToken.deleteMany({ userId: { $in: selectedIds } });

            // delete every stored AccessToken in the redisClient
            // delete associated Redis keys
            const redisDeletePromises = selectedIds.map(id => redisClient.del(`auth_${id}`));
            await Promise.all(redisDeletePromises);

            return res.status(201).json({
                message: 'AllStaff deleted successfully',
                deletedCount: deletedStaff.deletedCount,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    // static async setAvatar(req, res) {
    //     try {
    //         const verifiedJWT = await AuthController.currPreCheck(req);
    //         if (verifiedJWT instanceof Error) {
    //             return res.status(400).json({error: verifiedJWT.message});
    //         }
    //         const {id} = verifiedJWT;
    //         if (!id) {
    //             return res.status(400).json({error: 'Invalid token'});
    //         }
    //         const {avatar} = req.body;
    //         if (!avatar) {
    //             return res.status(400).json({error: 'Missing file URL in the request'});
    //         }
    //         const result = await cloudinary.uploader.upload(avatar, {
    //             folder: `YalmarMgtSystem/ProfilePic/${id}`,
    //             public_id: 'image',
    //             overwrite: true,
    //             invalidate: true,
    //         });
    //         if (!result) {
    //             return res.status(500).json({error: 'Internal Server Error'});
    //         }
    //         // find the staff with the id and update the imgURL with the secure_url from the result object
    //         await AllStaff.findOneAndUpdate(new ObjectId(id), {imgURL: result.secure_url}, {
    //             new: true, // return the updated object as the saved object
    //             runValidators: true, // run the validators on the update operation
    //             context: 'query', // allows the use of the 'where' clause
    //             upsert: true // creates the object if it doesn't exist
    //         });
    //         return res.status(201).json({
    //             message: 'Profile Picture set successfully',
    //             imgURL: result.secure_url,
    //         });
    //     } catch (error) {
    //         if (error.message === 'jwt expired') {
    //             return res.status(401).json({error: error.message});
    //         }
    //         return res.status(500).json({error: error.message});
    //     }
    // }
    // static async setAvatar(req, res) {
    //     try {
    //         const verifiedJWT = await AuthController.currPreCheck(req);
    //         if (
    //             verifiedJWT instanceof Error) {
    //             return res.status(400).json({error: verifiedJWT.message});
    //         }
    //
    //         const {id} = verifiedJWT;
    //         if (!id) {
    //             return res.status(400).json({error: 'Invalid token'});
    //         }
    //
    //         const {avatar} = req.body;
    //         if (!avatar) {
    //             return res.status(400).json({error: 'Missing file URL in the request'});
    //         }
    //
    //         // Decode the base64 image string
    //         const base64Data = avatar.replace(/^data:image\/\w+;base64,/, '');
    //         const buffer = Buffer.from(base64Data, 'base64');
    //
    //         // Create a new worker thread
    //         const worker = new Worker(path.resolve(__dirname, 'imageWorker.js'));
    //
    //         worker.postMessage(buffer);
    //
    //         worker.on('message', async (compressedBuffer) => {
    //             if (compressedBuffer.error) {
    //                 return res.status(500).json({error: compressedBuffer.error});
    //             }
    //
    //             // Upload the processed image to Cloudinary
    //             const result = await new Promise((resolve, reject) => {
    //                 cloudinary.uploader.upload_stream(
    //                     {
    //                         folder: `YalmarMgtSystem/ProfilePic/${id}`,
    //                         public_id: 'image',
    //                         overwrite: true,
    //                         invalidate: true,
    //                     },
    //                     (error, result) => {
    //                         if (error) {
    //                             return reject(error);
    //                         }
    //                         resolve(result);
    //                     }
    //                 ).end(compressedBuffer);
    //             });
    //
    //             if (!result) {
    //                 return res.status(500).json({error: 'Internal Server Error'});
    //             }
    //             // if the object role is of type Admin or SuperAdmin
    //             const staffObj = await AllStaff.findById(new ObjectId(id))
    //             // if (staffObj.role === 'Admin' || staffObj.role === 'SuperAdmin') {
    //             if (staffObj.role !== 'Admin' && staffObj.role !== 'SuperAdmin') {
    //                 // Update the staff profile with the new image URL
    //                 await AllStaff.findOneAndUpdate(
    //                     new ObjectId(id),
    //                     {imgURL: result.secure_url},
    //                     {
    //                         new: true, // return the updated object as the saved object
    //                         runValidators: true, // run the validators on the update operation
    //                         context: 'query', // allows the use of the 'where' clause
    //                         upsert: true // creates the object if it doesn't exist
    //                     }
    //                 );
    //
    //                 return res.status(201).json({
    //                     message: 'Profile Picture set successfully',
    //                     imgURL: result.secure_url,
    //                 });
    //             } else if (staffObj.role === 'Admin' || staffObj.role === 'SuperAdmin') {
    //                 // } else if (staffObj.role !== 'Admin' && staffObj.role !== 'SuperAdmin') {
    //                 // Update the staff profile with the new image URL
    //                 await AllStaff.findOneAndUpdate(
    //                     new ObjectId(id),
    //                     {imgURL: result.secure_url, imgConfirmation: 'Pending', ctrlFlag: true},
    //                     {
    //                         new: true, // return the updated object as the saved object
    //                         runValidators: true, // run the validators on the update operation
    //                         context: 'query', // allows the use of the 'where' clause
    //                         upsert: true // creates the object if it doesn't exist
    //                     }
    //                 );
    //                 // create a bioDataUpdate for the Avatar-Confirmation
    //                 const bioDataUpdate = {
    //                     staffID: staffObj._id,
    //                     email: staffObj.email,
    //                     changes: {
    //                         imgURL: {
    //                             old: staffObj.imgURL,
    //                             new: result.secure_url,
    //                         }
    //                     },
    //                     category: 'Avatar-Confirmation',
    //                 }
    //                 await BioDataUpdateRequest.create(bioDataUpdate);
    //                 // send a notification of this created object to alert the admin
    //                 // to be implemented later
    //                 return res.status(201).json({
    //                     message: 'Profile Picture set successfully',
    //                 });
    //
    //             }
    //         });
    //
    //         worker.on('error', (error) => {
    //             return res.status(500).json({error: error.message});
    //         });
    //     } catch (error) {
    //         if (error.message === 'jwt expired') {
    //             return res.status(401).json({error: error.message});
    //         }
    //         return res.status(500).json({error: error.message});
    //     }
    // }
    static async setAvatar(req, res) {
        try {
            const verifiedJWT = await AuthController.currPreCheck(req);
            if (verifiedJWT instanceof Error) {
                return res.status(400).json({ error: verifiedJWT.message });
            }

            const { id } = verifiedJWT;
            if (!id) {
                return res.status(400).json({ error: 'Invalid token' });
            }

            const { avatar } = req.body;
            if (!avatar) {
                return res.status(400).json({ error: 'Missing file URL in the request' });
            }

            // Decode the base64 image string
            const base64Data = avatar.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            // Create a new worker thread
            const worker = new Worker(path.resolve(__dirname, 'imageWorker.js'));

            worker.postMessage(buffer);

            worker.on('message', async(compressedBuffer) => {
                try {
                    if (compressedBuffer.error) {
                        return res.status(500).json({ error: compressedBuffer.error });
                    }

                    // Upload the processed image to Cloudinary
                    const result = await new Promise((resolve, reject) => {
                        cloudinary.uploader.upload_stream({
                                folder: `YalmarMgtSystem/ProfilePic/${id}`,
                                public_id: 'image',
                                overwrite: true,
                                invalidate: true,
                            },
                            (error, result) => {
                                if (error) {
                                    return reject(error);
                                }
                                resolve(result);
                            },
                        ).end(compressedBuffer);
                    });

                    if (!result) {
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    // if the object role is of type Admin or SuperAdmin
                    const staffObj = await Staff.findById(new ObjectId(id));
                    if (staffObj.role !== 'Admin' && staffObj.role !== 'SuperAdmin') {
                        // Update the staff profile with the new image URL
                        await Staff.findOneAndUpdate(new ObjectId(id), { imgURL: result.secure_url }, {
                            new: true, // return the updated object as the saved object
                            runValidators: true, // run the validators on the update operation
                            context: 'query', // allows the use of the 'where' clause
                            upsert: true, // creates the object if it doesn't exist
                        });

                        return res.status(201).json({
                            message: 'Profile Picture set successfully',
                            imgURL: result.secure_url,
                        });
                    }
                    if (staffObj.role === 'Admin' || staffObj.role === 'SuperAdmin') {
                        // Update the staff profile with the new image URL
                        await Staff.findOneAndUpdate(new ObjectId(id), { imgURL: result.secure_url, imgConfirmation: 'Requested', ctrlFlag: true }, {
                            new: true, // return the updated object as the saved object
                            runValidators: true, // run the validators on the update operation
                            context: 'query', // allows the use of the 'where' clause
                            upsert: true, // creates the object if it doesn't exist
                        });

                        // create a bioDataUpdate for the Avatar-Confirmation
                        const bioDataUpdate = {
                            staffID: staffObj._id,
                            email: staffObj.email,
                            changes: {
                                imgURL: {
                                    old: staffObj.imgURL,
                                    new: result.secure_url,
                                },
                            },
                            category: 'Avatar-Confirmation',
                        };
                        await BioDataUpdateRequest.create(bioDataUpdate);

                        // send a notification of this created object to alert the admin
                        // to be implemented later
                        return res.status(201).json({
                            message: 'Profile Picture set successfully',
                        });
                    }
                } catch (error) {
                    return res.status(500).json({ error: error.message });
                }
            });

            worker.on('error', (error) => res.status(500).json({ error: error.message }));
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    // delete avatar from cloudinary for direct admin and staff
    static async delAvatar(req, res) {
        try {
            const verifiedJWT = await AuthController.currPreCheck(req);
            if (verifiedJWT instanceof Error) {
                return res.status(400).json({ error: verifiedJWT.message });
            }
            const { id } = verifiedJWT;
            if (!id) {
                return res.status(400).json({ error: 'Invalid token' });
            }
            // check DB connection
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({ error: 'Database connection failed' });
            }
            // if req.body.id is true, it means the operation is for the admin to delete the staff avatar
            const { staffID } = req.body;
            if (staffID) {
                const staffObj = await Staff.findById(new ObjectId(staffID));
                if (!staffObj) {
                    return res.status(404).json({ error: 'AllStaff not found' });
                }
                if (!staffObj.imgURL) {
                    return res.status(404).json({ error: 'No image found' });
                }
                if (staffObj.ctrlFlag === false) {
                    return res.status(404).json({ error: 'AllStaff Authorization is required' });
                }
                // delete the image from cloudinary
                const public_id = staffObj.imgURL.split('/')[staffObj.imgURL.split('/').length - 1].split('.')[0];
                const result = await cloudinary.uploader.destroy(public_id);
                if (result.result !== 'ok') {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                // update the staff profile
                await Staff.findOneAndUpdate(new ObjectId(staffID), { imgURL: '', ctrlFlag: false }, {
                    new: true, // return the updated object as the saved object
                    runValidators: true, // run the validators on the update operation
                    context: 'query', // allows the use of the 'where' clause
                    upsert: true, // creates the object if it doesn't exist
                });
                return res.status(201).json({
                    message: 'Profile Picture deleted successfully',
                });
            }
            // find the staff with the id and update the imgURL with the secure_url from the result object
            const staff = await Staff.findById(new ObjectId(id));
            if (!staff) {
                return res.status(404).json({ error: 'AllStaff not found' });
            }
            if (!staff.imgURL) {
                return res.status(404).json({ error: 'No image found' });
            }

            // delete the image from cloudinary
            const public_id = staff.imgURL.split('/')[staff.imgURL.split('/').length - 1].split('.')[0];
            const result = await cloudinary.uploader.destroy(public_id);
            if (result.result !== 'ok') {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // update the staff profile
            await Staff.findOneAndUpdate(new ObjectId(id), { imgURL: '' }, {
                new: true, // return the updated object as the saved object
                runValidators: true, // run the validators on the update operation
                context: 'query', // allows the use of the 'where' clause
                upsert: true, // creates the object if it doesn't exist
            });
            return res.status(201).json({
                message: 'Profile Picture deleted successfully',
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    static async dashboardData(req, res) {
        try {
            const result = await authClient.apiPreCheck(req);
            if (result instanceof Error) {
                return res.status(401).json({ error: result.message });
            }
            const { verifiedAccessToken } = result;
            const { id } = verifiedAccessToken;
            const dashboardData = await authClient.dashBoardCheck(id);
            if (dashboardData instanceof Error) {
                return res.status(400).json({ error: dashboardData.message });
            }
            return res.status(200).json({
                message: 'Dashboard data retrieved successfully',
                dashboardData,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    static async resetPasswordRequest(req, res) {
        const { email } = req.body;
        // Check if the email is provided
        if (!email) {
            return res.status(400).json({
                error: 'Missing email address',
            });
        }
        try {
            // Find staff by email
            const staff = await Staff.findOne({ email });
            if (!staff) {
                return res.status(404).json({
                    error: 'AllStaff with this email does not exist',
                });
            }

            // Generate OTP token for reset
            await staff.generateOTP();

            // Send token via email
            await MailClient.sendToken(staff);

            return res.status(200).json({
                message: 'Reset password token sent successfully',
            });
        } catch (error) {
            console.error('Error requesting password reset:', error);
            return res.status(500).json({
                error: 'Server error. Please try again later.',
            });
        }
    }

    static async setPassword(req, res) {
        const { encryptedData } = req.body;
        if (!encryptedData) {
            return res.status(400).json({ error: 'Missing data' });
        }
        try {
            const dataDecode = await authClient.setNewPasswordDecrypt(encryptedData);
            const { email, password, token, confirmPassword } = dataDecode;
            if (!email) {
                return res.status(400).json({ error: 'Missing email' });
            }
            if (!password) {
                return res.status(400).json({ error: 'Missing password' });
            }
            if (!token) {
                return res.status(400).json({ error: 'Missing token' });
            }
            if (!confirmPassword) {
                return res.status(400).json({ error: 'Missing confirm password' });
            }
            if (password !== confirmPassword) {
                return res.status(400).json({ error: 'Passwords do not match' });
            }
            // check if server is up before verifying
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({ error: 'Database connection failed' });
            }
            const existingUser = await Staff.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({ error: 'Invalid email credentials' });
            }
            // hash the password using bcrypt
            const hashedPwd = await bcrypt.hash(password, 10);
            let staff = await existingUser.validateOTP(token);
            if (staff.error) {
                return res.status(404).json({ error: staff.error });
            }
            staff = await staff.changePassword(hashedPwd);
            if (!staff) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // proceed to reset password
            return res.status(201).json({
                message: 'Password reset password successfully',
            });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: err });
        }
    }

    // while currently logged into the system
    static async changePassword(req, res) {
        const id = await authClient.fullCurrCheck(req);
        if (id.error) {
            return res.status(400).json({ error: id.error });
        }
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({ error: 'AllStaff Object not found' });
        }
        const { email, oldPassword, newPassword } = req.body;
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({
                error: 'Missing required fields',
                reqFields: ['email', 'oldPassword', 'newPassword'],
                format: 'email: string, oldPassword: string, newPassword: string',
            });
        }
        // check if server is up before verifying
        if (!(await dbClient.isAlive())) {
            return res.status(500).json({ error: 'Database connection failed' });
        }
        // compare old password to the hashed password in the database
        const isMatch = await bcrypt.compare(oldPassword, staff.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid old password' });
        }
        // hash the password using bcrypt
        const hashedPwd = await bcrypt.hash(newPassword, 10);
        try {
            const updatedUser = await staff.changePassword(hashedPwd);
            if (updatedUser.error) {
                return res.status(400).json({ error: updatedUser.error });
            }
        } catch (err) {
            return res.status(400).json({ error: err });
        }
        // generate new credential for the staff
        const newCredentials = await authClient.generateJWT(staff);
        if (newCredentials.error) {
            return res.status(400).json({ error: newCredentials.error });
        }
        if (!newCredentials) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const { accessToken, refreshToken } = newCredentials;
        // update RedisClient with the new credentials of the accessToken
        const updateRedisAccessToken = await authClient.setJWT(staff, accessToken);
        if (updateRedisAccessToken.error) {
            return res.status(400).json({ error: updateRedisAcessToken.error });
        }
        return res.status(201).json({
            message: 'Password changed successfully',
            accessToken,
            refreshToken,
        });
    }
}

module.exports = StaffController;