/* eslint-disable no-unused-vars */
/* eslint-disable jest/require-hook */
const express = require('express');

const cors = require('cors');

const authController = require('../controllers/AuthController');

const corsOptions = {
  origin: '*', // allow all origins for now
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Auth-Token', 'Authorization', 'X-Token'],
};

const authRouter = express.Router();

authRouter.use(cors(corsOptions));

// authRouter.post('/register', authController.register);
authRouter.get('/health', authController.isHealth);

module.exports = authRouter;
