import AuthController from "./AuthController";
import dbClient from "../utils/db";
import Staff from "../models/Staff";
import Site from "../models/Sites";
import mongoose from "mongoose";
import {newSiteSchemaValidator} from "../utils/Validators/newSiteSchemaValidator";

const {ObjectId} = mongoose.Types;

class SiteController {
    static async getAllSite(req, res) {
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
            // ensure this is an only admin permissible action
            const admin = await AuthController.AdminCheck(new ObjectId(id));
            if (admin instanceof Error) {
                console.log('Hi here');
                return res.status(400).json({error: admin.message});
            }
            // get all the site in db
            const allSite = await Site.find({}).select('-__v -createdAt -updatedAt');
            console.log(allSite);
            if (!allSite) {
                return res.status(404).json({error: 'No site found'});
            }
            return res.status(200).json({
                message: 'All site retrieved successfully',
                allSite
            })
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            return res.status(500).json({error: error.message});
        }
    }
    
    static async getSite(req, res) {
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
            // ensure this is an only admin permissible action
            const admin = await AuthController.AdminCheck(new ObjectId(id));
            if (admin instanceof Error) {
                return res.status(400).json({error: admin.message});
            }
            // We will check if the url contain "b-gwari" or "zaria" or "kaduna-central"
            // and return the site based on the cluster
            const ogURL = req.originalUrl
            console.log({ogURL});
            const allowedULR = ['/birnin-gwari', '/kaduna-central', '/zaria'];
            if (!allowedULR.includes(ogURL)) {
                return res.status(404).json({error: 'Forbidden Operation'});
            }
            const cluster = ogURL.split('/')[2].toUpperCase();
            const site = await Site.find({cluster}).select('-__v -createdAt -updatedAt');
            if (!site) {
                return res.status(404).json({error: 'No site found'});
            }
            return res.status(200).json({
                message: 'Site retrieved successfully',
                site
            })
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            return res.status(500).json({error: error.message});
        }
    }
    
    static async newSite(req, res) {
        console.log('Mew Site');
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
            // ensure this is an only admin permissible action
            const admin = await AuthController.AdminCheck(new ObjectId(id));
            if (admin instanceof Error) {
                return res.status(400).json({error: admin.message});
            }
            const {error, value} = newSiteSchemaValidator.validate(req.body, {abortEarly: false});
            if (error) {
                console.log('Error in schema');
                // Format Joi error messages
                const formattedErrors = error.details.map(detail => {
                    // Remove slashes and display more readable messages
                    return detail.message.replace(/["\\]/g, '');
                });
                return res.status(400).json({error: formattedErrors});
            }
            // create a new entry into the db
            const newSite = await Site.create(value);
            if (!newSite) {
                res.status(400).json({error: 'Operation Error: Site not created'})
            }
            return res.status(201).json({message: 'New Site created successfully', newSite});
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            return res.status(500).json({error: error.message});
        }
    }
    
    static async superAdminCreation(req, res) {
        try {
            // creating multiple sites at once
            const sites = req.body;
            if (!sites) {
                return res.status(400).json({error: 'Missing sites'});
            }
            // check DB connection
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({error: 'Database connection failed'});
            }
            // create multiple sites at once and return new entry into the db
            await Site.insertMany(sites);
            return res.status(201).json({message: 'All Sites created successfully'});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
    
    static async updateSite(req, res) {
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
            // ensure this is an only admin permissible action
            const admin = await AuthController.AdminCheck(new ObjectId(id));
            if (admin instanceof Error) {
                return res.status(400).json({error: admin.message});
            }
            const {error, value} = newSiteSchemaValidator.validate(req.body, {abortEarly: false});
            if (error) {
                console.log('Error in schema');
                // Format Joi error messages
                const formattedErrors = error.details.map(detail => {
                    // Remove slashes and display more readable messages
                    return detail.message.replace(/["\\]/g, '');
                });
                return res.status(400).json({error: formattedErrors});
            }
            const {_id} = value;
            if (!_id) {
                return res.status(400).json({error: 'Missing required attribute: _id'});
            }
            // delete the _id from the value object
            delete value._id;
            // update the site by using findByIdAndUpdate
            const updatedSite = await Site.findByIdAndUpdate(new ObjectId(_id), value, {
                new: true,
                useFindAndModify: false,
                runValidators: true,
                context: 'query'
            });
            if (!updatedSite) {
                res.status(400).json({error: 'Operation Error: Site not updated'})
            }
            return res.status(201).json({message: 'Site updated successfully', updatedSite});
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            return res.status(500).json({error: error.message});
        }
    }
    
    static async deleteSite(req, res) {
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
            // ensure this is an only admin permissible action
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
            // validates the email is indeed a staff and this staff is an admin or superAdmin
            const staff = await Staff.findOne({email});
            if (!staff) {
                return res.status(400).json({error: 'Invalid email credentials'});
            }
            if (staff.role !== 'Admin' && staff.role !== 'SuperAdmin') {
                return res.status(400).json({error: 'You are not authorized to delete staff'});
            }
            if (admin.email !== staff.email) {
                return res.status(400).json({error: 'You are not authorized to delete staff'});
            }
            // validates the staffIds in the array, array must not be empty
            if (selectedIds.length === 0) {
                return res.status(400).json({error: 'Missing staffIds'});
            }
            // use deleteMany to delete multiple site members
            const deletedSite = await Site.deleteMany({_id: {$in: selectedIds}});
            if (!deletedSite) {
                res.status(400).json({error: 'Operation Error: Site not deleted'})
            }
            if (deletedSite.deletedCount === 0) {
                return res.status(400).json({error: 'Failed to delete staff'});
            }
            return res.status(201).json({message: 'Site deleted successfully', deletedSite});
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = SiteController;