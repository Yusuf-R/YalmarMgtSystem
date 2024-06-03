/* eslint-disable import/no-unresolved */
/* eslint-disable jest/require-hook */
const express = require('express');
const multer = require('multer')
const staffController = require('../controllers/StaffController');
const imageController = require('../controllers/ImageController');

const staffRouter = express.Router();
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({
    storage,
    limits: {
        fileSize: 25 * 1024 * 1024, // Limit file size to 25MB
        fieldSize: 25 * 1024 * 1024, // Limit field size to 25MB
    },
});

staffRouter.post('/login', staffController.login);
staffRouter.post('/logout', staffController.logout);
staffRouter.post('/new', staffController.createNew);
staffRouter.get('/profile', staffController.getStaffData);
staffRouter.get('/all', staffController.getAllStaff);
staffRouter.delete('/delete', staffController.deleteStaff);
staffRouter.get('/dashboard', staffController.dashboardData);
staffRouter.put('/update', staffController.updateStaff);
staffRouter.post('/avatar', upload.single('avatar'), staffController.setAvatar);

staffRouter.post('/resetpassword', staffController.resetPassword);
staffRouter.put('/newpassword', staffController.newPassword);
staffRouter.put('/changepassword', staffController.changePassword);
staffRouter.post('/uploadimage', imageController.uploadNewImage);
staffRouter.get('/signature', imageController.getSignature);

// staffRouter.patch('/profile', staffController.updateProfile);

// staffRouter.delete('/profile', staffController.deleteProfile);

// staffRouter.patch('/password', staffController.updatePassword);



module.exports = staffRouter;
