const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const servicingController = require('../controllers/ServicingController');
import SecurityConfig from "../utils/config"

const multer = require('multer');
const securityConfig = new SecurityConfig();
const { corsOptions } = securityConfig;
const serviceRouter = express.Router();

serviceRouter.use(cors(corsOptions));
serviceRouter.options('*', cors(corsOptions));

// multer will be needed for newServicingReport as it will contain images and actual data
// we will be using disk storage since render hosting service will give us 16 gb of storage
// we will store the images in a folder called tempServicingReports
// create this folder if not exiting

// Use memory storage with Multer for in-memory storage of files
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg formats are allowed!'));
        }
    },
    limits: {
        fileSize: 25 * 1024 * 1024, // Limit file size to 25MB per image
        fieldSize: 25 * 1024 * 1024, // Limit field size to 25MB
    }
});
// serviceRouter.post('/new', servicingController.newServicingReport);
// the images could be one or more, upload.array instead of upload.single
// the max count will be 10
// the second parameter will be the max count

serviceRouter.get('/all', servicingController.getAllServicingReport);
serviceRouter.post('/new', upload.array('images', 10), servicingController.newServicingReport);
serviceRouter.post('/get', servicingController.getServicingReport);
// serviceRouter.patch('/update', servicingController.updateFuelReport);
serviceRouter.delete('/delete', servicingController.deleteServiceReport);

module.exports = serviceRouter;