import AuthController from "./AuthController";
import dbClient from "../utils/db";
import Staff from "../models/Staff";
import LeaveRequest from "../models/LeaveRequest"
import mongoose from "mongoose";
import {leaveRequestSchemaValidator} from "../utils/Validators/leaveRequestSchema";
import {newStaffSchemaValidator} from "../utils/Validators/newStaffSchema";
import dayjs from "dayjs";
import {actionLeaveRequestSchemaValidator} from "../utils/Validators/actionLeaveRequest";

const lowPrivileges = ['User', 'Accountant', 'Generator Technician', 'Procurement Officer', 'Lawyer', 'Driver', 'Field Supervisor', 'Security Officer'];
const {ObjectId} = mongoose.Types;

class LeaveRequestController {
    static async getAllLeaveRequest(req, res) {
        // this is an only Admin or SuperAdmin authorized request
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
            // ensure the requester is of Admin or SuperAdmin
            const admin = await AuthController.AdminCheck(new ObjectId(id));
            if (admin instanceof Error) {
                return res.status(400).json({error: admin.message});
            }
            // get all leave requests whose saveAsDraft is false
            const leaveReqData = await LeaveRequest.find({saveAsDraft: false}).select('-__v');
            // const leaveReqObj = await LeaveRequest.find(undefined, undefined, undefined).select('-__v');
            if (!leaveReqData) {
                return res.status(404).json({error: 'No leave request found'});
            }
            return res.status(200).json({message: 'LeaveRequest data retrieved successfully', leaveReqData});
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
    
    static async getStaffLeaveRequest(req, res) {
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
            const leaveObjData = await LeaveRequest.find({staffId: new ObjectId(id)}).select('-__v');
            if (!leaveObjData) {
                return res.status(404).json({error: 'Leave Request Data not found'});
            }
            return res.status(200).json({message: 'Leave Request data retrieved successfully', leaveObjData});
            
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
    
    static async newLeaveRequest(req, res) {
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
            // pass schema to the leaveRequestSchemaValidator
            const {error, value} = leaveRequestSchemaValidator.validate(req.body, {abortEarly: false});
            if (error) {
                // Format Joi error messages
                const formattedErrors = error.details.map(detail => {
                    // Remove slashes and display more readable messages
                    return detail.message.replace(/["\\]/g, '');
                });
                return res.status(400).json({error: formattedErrors});
            }
            // construct the full name of the staff firstName +  Optionally(middleName) + lastName
            // value.fullName = `${value.firstName} ${value.middleName ? value.middleName + ' ' : ''}${value.lastName}`;
            // remove [firesName, middleName, lastName from the req.body
            // const filterOut = ['firstName', 'middleName', 'lastName'];
            // for (const key of filterOut) {
            //     if (Object.prototype.hasOwnProperty.call(value, key)) {
            //         delete value[key];
            //     }
            // }
            // ensure startDate and endDate difference is equal to duration
            const start = dayjs(value.startDate)
            const end = dayjs(value.endDate);
            // calculate the duration of the leave
            const leaveDuration = end.diff(start, 'day', true) + 1;
            if (leaveDuration !== value.duration) {
                return res.status(400).json({error: 'Data Integrity Violation: Duration'});
            }
            if (value.currentBalance < 0) {
                return res.status(400).json({error: 'Data Integrity Violation: Leave Balance'});
            }
            //  correctly format the startDate, endDate to DD-MMM-YYYY
            value.startDate = dayjs(value.startDate).format('DD-MMM-YYYY');
            value.endDate = dayjs(value.endDate).format('DD-MMM-YYYY');
            // ensure the staffId is valid
            const staffObj = await Staff.findById(new ObjectId(value.staffId));
            if (!staffObj) {
                return res.status(404).json({error: 'Staff not found'});
            }
            if (staffObj.email !== value.email) {
                return res.status(400).json({error: 'Data Integrity Violation: Email'});
            }
            if (staffObj.leaveCredit !== value.currentBalance) {
                return res.status(400).json({error: 'Data Integrity Violation: Current Balance'});
            }
            // ensure startDate is not less than current date
            if (dayjs(value.startDate).isBefore(dayjs(), 'day')) {
                return res.status(400).json({error: 'Start Date cannot be less than current date'});
            }
            // ensure duration is a positive integer
            if (value.duration < 0) {
                return res.status(400).json({error: 'InCorrect Duration'});
            }
            const ogCurrBalance = staffObj.leaveCredit - leaveDuration;
            if (ogCurrBalance !== value.newBalance) {
                return res.status(400).json({error: 'Data Integrity Violation: New Balance'});
            }
            // ensure the id is a valid one from the Staff database
            const leaveReqObj = await LeaveRequest.create(value);
            if (!leaveReqObj) {
                return res.status(404).json({error: 'Operation Error: Leave Request not created'});
            }
            return res.status(201).json({message: 'Leave Request created successfully', leaveReqObj});
            
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
    
    static async actionLeaveRequest(req, res) {
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
            // confirm with actionLeaveRequestSchemaValidator
            const {error, value} = actionLeaveRequestSchemaValidator.validate(req.body);
            if (error) {
                // Format Joi error messages
                const formattedErrors = error.details.map(detail => {
                    // Remove slashes and display more readable messages
                    return detail.message.replace(/["\\]/g, '');
                });
                return res.status(400).json({error: formattedErrors});
            }
            // validate the _id and use the return object to verify staffId
            const leaveReqObj = await LeaveRequest.findById(new ObjectId(value._id));
            if (!leaveReqObj) {
                return res.status(404).json({error: 'Leave Request not found'});
            }
            // ensure the staffId is valid
            if (leaveReqObj.staffId.toString() !== value.staffId) {
                return res.status(400).json({error: 'Data Integrity Violation: StaffId'});
            }
            // ensure status is not Accepted or Rejected for the leaveReqObj
            if (leaveReqObj.status === 'Accepted' || leaveReqObj.status === 'Rejected') {
                return res.status(400).json({error: 'Un-Authorize Action: Leave Request already actioned'});
            }
            // prevent actioning a Requested status to the same Requested status
            if (leaveReqObj.status === value.adminAction) {
                return res.status(400).json({error: 'Circular Operation: Leave Request already in this status'});
            }
            // findAndUpdate  the leaveReqObj with the new status
            await LeaveRequest.findByIdAndUpdate(new ObjectId(value._id), {status: value.adminAction}, {
                new: true,
                runValidators: true,
                context: 'query',
            });
            // update the staff leaveCredit only if the status is Accepted
            if (value.adminAction === 'Rejected' || value.adminAction === 'Pending') {
                return res.status(201).json({message: 'Leave Request actioned successfully'});
            }
            // essentially the adminAction is Accepted
            await Staff.findByIdAndUpdate(new ObjectId(value.staffId), {leaveCredit: value.newBalance}, {
                new: true,
                runValidators: true,
                context: 'query',
            });
            return res.status(201).json({message: 'Full Leave Request actioned successfully'});
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            // unexpected error
            return res.status(500).json({error: error.message});
        }
    }
}



module.exports = LeaveRequestController;