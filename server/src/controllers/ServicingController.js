import AuthController from "./AuthController";
import dbClient from "../utils/db";
import mongoose from "mongoose";
import Servicing from "../models/Servicing";
import {newServiceReportSchemaValidator} from "../utils/Validators/newServiceReportSchema";

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
            const {error, value} = newServiceReportSchemaValidator.validate(req.body, {abortEarly: false});
            if (error) {
                // Format Joi error messages
                console.log('validation error');
                console.log(error);
                const formattedErrors = error.details.map(detail => {
                    // Remove slashes and display more readable messages
                    return detail.message.replace(/["\\]/g, '');
                });
                return res.status(400).json({error: formattedErrors});
            }
            console.log('BackEnd Verification Passed');
            console.log({value});
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