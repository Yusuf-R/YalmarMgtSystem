/* eslint-disable no-unused-vars */
/* eslint-disable jest/require-hook */
import SecurityConfig from '../utils/config';

const express = require('express');
const cors = require('cors');

const bioUpdateController = require('../controllers/BioUpdateController');

const securityConfig = new SecurityConfig();
const { corsOptions } = securityConfig;

const bioUpdateRouter = express.Router();

bioUpdateRouter.use(cors(corsOptions));
bioUpdateRouter.options('*', cors(corsOptions));

bioUpdateRouter.get('/all', bioUpdateController.getAllBioUpdateRequest);
bioUpdateRouter.get('/staff', bioUpdateController.getStaffBioUpdateRequest);
bioUpdateRouter.post('/new', bioUpdateController.newBioUpdateRequest);
bioUpdateRouter.patch('/update', bioUpdateController.updateBioRequest);
bioUpdateRouter.delete('/delete', bioUpdateController.deleteBioUpdateRequest);

module.exports = bioUpdateRouter;