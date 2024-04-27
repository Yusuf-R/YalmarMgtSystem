/* eslint-disable no-unused-vars */
/* eslint-disable jest/require-hook */
const express = require('express');

const cors = require('cors');

const authController = require('../controllers/AuthController');
import SecurityConfig from "../utils/config";

const securityConfig = new SecurityConfig();
const {corsOptions} = securityConfig;

const authRouter = express.Router();

authRouter.use(cors(corsOptions));

// authRouter.post('/register', authController.register);
authRouter.get('/health', authController.isHealth);
authRouter.get('/verify', authController.verify);

module.exports = authRouter;
