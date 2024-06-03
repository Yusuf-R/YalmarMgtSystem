import AuthController from "./AuthController";
import dbClient from "../utils/db";
import Staff from "../models/Staff";
import BioDataUpdateRequest from "../models/BioDataUpdateRequest";

const lowPrivileges = ['User', 'Accountant', 'Generator Technician', 'Procurement Officer', 'Lawyer', 'Driver', 'Field Supervisor', 'Security Officer'];

class BioUpdateController {
    static async getAllBioUpdateRequest(req, res) {
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
            const admin = await AuthController.AdminCheck(id);
            if (admin instanceof Error) {
                return res.status(400).json({error: admin.message});
            }
            const bioUpdateData = await BioDataUpdateRequest.find(undefined, undefined, undefined).select('-__v');
            if (!bioUpdateData) {
                return res.status(404).json({error: 'BioUpdate not found'});
            }
            return res.status(200).json({message: 'BioUpdate data retrieved successfully', bioUpdateData});
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
    
    static async getStaffBioUpdateRequest(req, res) {
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
            const {staffID} = req.body
            if (!staffID) {
                return res.status(400).json({error: 'StaffId not found: include <staffID> in your request'});
            }
            const bioUpdateData = await BioDataUpdateRequest.findById(staffID).select('-__v');
            if (!bioUpdateData) {
                return res.status(404).json({error: 'BioUpdate not found'});
            }
            return res.status(200).json({message: 'BioUpdate data retrieved successfully', bioUpdateData});
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
    
    static async newBioUpdateRequest(req, res) {
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
            // this accessToken id must be tied to a staff with lowPrivileges
            const staffObj = await Staff.findById(id);
            if (!staffObj) {
                return res.status(404).json({error: 'Staff not found'});
            }
            if (!lowPrivileges.includes(staffObj.role)) {
                return res.status(403).json({error: 'Unauthorized Access'});
            }
            const {staffID, email} = req.body;
            if (!staffID) {
                return res.status(400).json({error: 'StaffId not found: include <staffID> in your request'});
            }
            if (!email) {
                return res.status(400).json({error: 'Email not found: include <email> in your request'});
            }
            // ensure the id is a valid one from the Staff database
            const bioUpdateObj = await BioDataUpdateRequest.create(req.body);
            if (!bioUpdateObj) {
                return res.status(404).json({error: 'BioUpdate not found'});
            }
            return res.status(201).json({message: 'BioUpdate data created successfully', bioUpdateObj});
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
    
    static async updateBioRequest(req, res) {
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
            // Admin Only Operation
            // Change the status to [Accepted, Rejected]
            
            // Check if this operation is an Admin only operation
            try {
                const {_id, staffID, email} = req.body;
                if (!_id) {
                    return res.status(400).json({error: 'Id not found: include <_id> in your request'});
                }
                if (!staffID) {
                    return res.status(400).json({error: 'StaffId not found: include <staffID> in your request'});
                }
                if (!email) {
                    return res.status(400).json({error: 'Email not found: include <email> in your request'});
                }
                const staffObj = await Staff.findById(staffID);
                if (!staffObj) {
                    return new Error('Unauthorized Access');
                }
                const bioObject = await BioDataUpdateRequest.findById(_id);
                if (!bioObject) {
                    return res.status(404).json({error: 'BioUpdate not found'});
                }
                const {role} = staffObj;
                // if the role is an Admin or SuperAdmin
                if ((role === 'Admin' || role === 'SuperAdmin') && req.body.status === 'Pending') {
                    return res.status(400).json({error: 'You can only change the status to Accepted or Rejected'});
                }
                // if the role is an Admin or SuperAdmin
                if ((role === 'Admin' || role === 'SuperAdmin') && req.status !== 'Pending') {
                    // then we update the status and send an email + json response
                    // email implementation wll be old off for now
                    // update the staff profile
                    const value = {status: req.body.status};
                    const updatedBioRequest = await BioDataUpdateRequest.findByIdAndUpdate(_id, value, {
                        new: true,
                        runValidators: true,
                        context: 'query',
                    });
                    return res.status(201).json({message: 'Staff profile updated successfully', updatedBioRequest});
                }
                // Staff only operation
                // Update the bioUpdate Request form
                // Forbids the status to be changed to Accepted or Rejected
                
                // ensure the role is one of the lowPrivileges
                if (!lowPrivileges.includes(role)) {
                    return new Error('Unauthorized Access');
                }
                if (req.body.status !== 'Pending') {
                    return res.status(400).json({error: 'Current status can only be Pending'});
                }
                // update the bioUpdate Request attributes
                const value = {status: req.body.status};
                if (!value) {
                    return res.status(400).json({error: 'Missing status field: <status>'});
                }
                
                const bioUpdate = await BioDataUpdateRequest.findByIdAndUpdate(_id, value, {
                    new: true,
                    runValidators: true,
                    context: 'query',
                });
                if (!bioUpdate) {
                    return res.status(400).json({error: 'Failed to update BioData Request'});
                }
                return res.status(201).json({message: 'BioData updated successfully', bioUpdate});
            } catch (err) {
                return res.status(400).json({error: err.message});
            }
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
    
    static async deleteBioUpdateRequest(req, res) {
        try {
            const verifiedJwt = await AuthController.currPreCheck(req);
            if (verifiedJwt instanceof Error) {
                return res.status(400).json({error: verifiedJwt.message});
            }
            const {id} = verifiedJwt;
            if (!id) {
                return res.status(400).json({error: 'Invalid token'});
            }
            // ensure the id is a valid one from the Staff database
            const staffObj = await Staff.findById(id);
            if (!staffObj) {
                return res.status(404).json({error: 'Staff not found'});
            }
            // check DB connection
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({error: 'Database connection failed'});
            }
            const bioUpdateData = await BioDataUpdateRequest.findByIdAndDelete(req.body._id);
            if (!bioUpdateData) {
                return res.status(404).json({error: 'BioUpdate not found'});
            }
            return res.status(200).json({message: 'BioUpdate data deleted successfully'});
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = BioUpdateController