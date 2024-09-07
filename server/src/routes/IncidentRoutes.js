const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const incidentController = require('../controllers/IncidentController');
import SecurityConfig from "../utils/config"

const multer = require('multer');
const securityConfig = new SecurityConfig();
const {corsOptions} = securityConfig;
const incidentRouter = express.Router();

incidentRouter.use(cors(corsOptions));

// we will be using disk storage since render hosting service will give us 16 gb of storage
// we will store the images in a folder called tempIncidentReportImages
// create this folder if not exiting

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '../utils/Tmp/incidentReportImages');
        // Create the directory if it doesn't exist
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true});
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
        }
    },
    limits: {
        fileSize: 200 * 1024 * 1024, // Limit file size to 200Mb
        fieldSize: 200 * 1024 * 1024, // Limit field size to 200Mb
    },
});

incidentRouter.get('/all', incidentController.getAllIncidentReport);
incidentRouter.post('/new', upload.array('images', 30), incidentController.newIncidentReport);
module.exports = incidentRouter;