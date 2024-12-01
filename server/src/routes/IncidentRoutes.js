import SecurityConfig from '../utils/config';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const incidentController = require('../controllers/IncidentController');

const securityConfig = new SecurityConfig();
const { corsOptions } = securityConfig;
const incidentRouter = express.Router();

incidentRouter.use(cors(corsOptions));
incidentRouter.options('*', cors(corsOptions));

// we will be using disk storage since render hosting service will give us 16 gb of storage
// we will store the images in a folder called tempIncidentReportImages
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

incidentRouter.get('/all', incidentController.getAllIncidentReport);
incidentRouter.post('/new', upload.array('images', 30), incidentController.newIncidentReport);
incidentRouter.delete('/delete', incidentController.deleteIncidentReport);
module.exports = incidentRouter;