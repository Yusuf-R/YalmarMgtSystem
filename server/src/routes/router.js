const express = require('express');
const cors = require('cors');
import SecurityConfig from "../utils/config";

const securityConfig = new SecurityConfig()
const {corsOptions} = securityConfig;

const authRouter = require('./AuthRoute');
const staffRouter = require('./StaffRoutes');


const router = express.Router();
// middleware
router.use(cors(corsOptions));

// //  All routes
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/staff', staffRouter);

module.exports = router;
