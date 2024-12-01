/* eslint-disable no-unused-vars */
/* eslint-disable jest/require-hook */
import SecurityConfig from "../utils/config";

const express = require('express');
const cors = require('cors');
const authController = require('../controllers/AuthController');


const securityConfig = new SecurityConfig();
const { corsOptions } = securityConfig;

const authRouter = express.Router();

authRouter.use(cors(corsOptions));
authRouter.options('*', cors(corsOptions));

// authRouter.post('/register', authController.register);
authRouter.get('/health', authController.isHealth);
authRouter.get('/verify', authController.verify);
authRouter.post('/refresh', authController.refreshJWT);
authRouter.get('/test', authController.checkConn);

module.exports = authRouter;