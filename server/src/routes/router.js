const express = require('express');
const cors = require('cors');
import SecurityConfig from "../utils/config";

const securityConfig = new SecurityConfig()
const {corsOptions} = securityConfig;

const authRouter = require('./AuthRoutes');
const staffRouter = require('./StaffRoutes');
const bioUpdateRouter = require('./BioUpdateRoutes');


const router = express.Router();
// middleware
router.use(cors(corsOptions));

// //  All routes
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/staff', staffRouter);
router.use('api/v1/bio-update', bioUpdateRouter);

module.exports = router;
