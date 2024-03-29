const express = require('express');
const cors = require('cors');

const authRouter = require('./AuthRoute');
const userRouter = require('./UsersRoutes');

const corsOptions = {
  origin: '*', // allow all origins for now
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Auth-Token', 'Authorization', 'X-Token'],
};

const router = express.Router();
// middleware
router.use(cors(corsOptions));

// //  All routes
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/users', userRouter);

module.exports = router;
