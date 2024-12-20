/* eslint-disable import/no-unresolved */
/* eslint-disable jest/require-hook */
import SecurityConfig from "../utils/config";

const express = require('express');
const cors = require('cors');
const multer = require('multer')
const staffController = require('../controllers/StaffController');

const securityConfig = new SecurityConfig();
const { corsOptions } = securityConfig;

const staffRouter = express.Router();
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({
    storage,
    limits: {
        fileSize: 25 * 1024 * 1024, // Limit file size to 25MB
        fieldSize: 25 * 1024 * 1024, // Limit field size to 25MB
    },
});

staffRouter.use(cors(corsOptions));
staffRouter.options('*', cors(corsOptions));

staffRouter.post('/login', staffController.login);
staffRouter.post('/logout', staffController.logout);
staffRouter.post('/new', staffController.createNew);
staffRouter.post('/reset-password', staffController.resetPasswordRequest);
staffRouter.post('/set-password', staffController.setPassword);
staffRouter.get('/profile', staffController.getStaffData);
staffRouter.get('/all', staffController.getAllStaff);
staffRouter.delete('/delete', staffController.deleteStaff);
staffRouter.get('/dashboard', staffController.dashboardData);
staffRouter.put('/update', staffController.updateStaff);
staffRouter.post('/avatar', upload.single('avatar'), staffController.setAvatar);

module.exports = staffRouter;