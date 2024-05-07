const express = require('express');
const cors = require('cors');
import SecurityConfig from "../utils/config";

const securityConfig = new SecurityConfig()
const {corsOptions} = securityConfig;

const authRouter = require('./AuthRoute');
const userRouter = require('./UsersRoutes');


const router = express.Router();
// middleware
router.use(cors(corsOptions));

// //  All routes
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/user', userRouter);

module.exports = router;
