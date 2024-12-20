const express = require('express');
const cors = require('cors');
import SecurityConfig from "../utils/config";

const securityConfig = new SecurityConfig()
const { corsOptions } = securityConfig;

const authRouter = require('./AuthRoutes');
const staffRouter = require('./StaffRoutes');
const bioUpdateRouter = require('./BioUpdateRoutes');
const leaveReqRouter = require('./LeaveRequestRoutes')
const siteRouter = require('./SiteRoutes');
const fuelRouter = require('./FuelRoutes')
const serviceRouter = require('./ServiceRoutes')
const incidentRouter = require('./IncidentRoutes')


const router = express.Router();
// middleware
router.use(cors(corsOptions));
router.options('*', cors(corsOptions));

// //  All routes
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/staff', staffRouter);
router.use('/api/v1/bio-update', bioUpdateRouter);
router.use('/api/v1/leave-request', leaveReqRouter)
router.use('/api/v1/site', siteRouter);
router.use('/api/v1/fuel', fuelRouter);
router.use('/api/v1/service', serviceRouter);
router.use('/api/v1/incident', incidentRouter);
module.exports = router;