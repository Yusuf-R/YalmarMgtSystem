import SecurityConfig from "../utils/config";

const express = require('express');
const cors = require('cors');
const leaveReqController = require('../controllers/LeaveRequestController');
const securityConfig = new SecurityConfig();
const { corsOptions } = securityConfig;
const leaveReqRouter = express.Router();

leaveReqRouter.use(cors(corsOptions));
leaveReqRouter.options('*', cors(corsOptions));

// api routes for leaveReqController
leaveReqRouter.get('/all', leaveReqController.getAllLeaveRequest);
leaveReqRouter.get('/staff', leaveReqController.getStaffLeaveRequest);
leaveReqRouter.post('/new', leaveReqController.newLeaveRequest);
leaveReqRouter.patch('/action', leaveReqController.actionLeaveRequest);
leaveReqRouter.patch('/update', leaveReqController.editLeaveRequest);
leaveReqRouter.delete('/delete', leaveReqController.deleteLeaveRequest);

module.exports = leaveReqRouter;