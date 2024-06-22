import AuthController from "./AuthController";
import dbClient from "../utils/db";
import mongoose from "mongoose";
import Fuelling from "../models/Fuelling";
import {newFuellingSchemaValidator} from "../utils/Validators/newFuellingSchema";
import {editFuellingReportSchemaValidator} from "../utils/Validators/editFuelingReportSchema";

const {ObjectId} = mongoose.Types;

class FuellingController {
    static async getAllFuelReport(req, res) {
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
            const allFuelReport = await Fuelling.find({}).select('-__v');
            res.status(200).json({
                message: 'All fuel reports fetched successfully',
                allFuelReport,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
    
    static async newFuelReport(req, res) {
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
            // pass schema to the fuellingSchemaValidator
            const {error, value} = newFuellingSchemaValidator.validate(req.body, {abortEarly: false});
            if (error) {
                // Format Joi error messages
                console.log('validation error');
                const formattedErrors = error.details.map(detail => {
                    // Remove slashes and display more readable messages
                    return detail.message.replace(/["\\]/g, '');
                });
                return res.status(400).json({error: formattedErrors});
            }
            const newFuelReport = await Fuelling.create(value);
            res.status(200).json({
                message: 'New fuel report created successfully',
                newFuelReport,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
    
    static async updateFuelReport(req, res) {
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
            const {error, value} = editFuellingReportSchemaValidator.validate(req.body, {abortEarly: false});
            if (error) {
                // Format Joi error messages
                console.log('validation error');
                const formattedErrors = error.details.map(detail => {
                    // Remove slashes and display more readable messages
                    return detail.message.replace(/["\\]/g, '');
                });
                return res.status(400).json({error: formattedErrors});
            }
            const updatedFuelReport = await Fuelling.findOneAndUpdate({
                _id: new ObjectId(value._id),
                site_id: new ObjectId(value.site_id),
            }, value, {
                new: true,
                runValidators: true,
                context: 'query',
            });
            res.status(200).json({
                message: 'Fuel report updated successfully',
                updatedFuelReport,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
    
    static async deleteFuelReport(req, res) {
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
            const {email, selectedIds} = req.body;
            if (!email || !selectedIds) {
                return res.status(400).json({error: 'Missing email or staffIds'});
            }
            // Basic email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json('Invalid email address');
            }
            // vet the email belongs to a staff of superAdmin or Admin role
            if (admin.email !== email) {
                return res.status(400).json({error: 'Unauthorized access'});
            }
            if (selectedIds.length === 0) {
                return res.status(400).json({error: 'Missing fuel report ids'});
            }
            // use deleteMany to delete multiple feul reports supply
            const deletedFuelReport = await Fuelling.deleteMany({_id: {$in: selectedIds}});
            if (deletedFuelReport.deletedCount === 0) {
                return res.status(404).json({error: 'Failed to delete fuel supply report'});
            }
            res.status(200).json({
                message: 'Fuel report deleted successfully',
                deletedFuelReport,
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



module.exports = FuellingController;