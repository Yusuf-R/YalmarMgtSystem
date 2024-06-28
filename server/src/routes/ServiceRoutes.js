const express = require('express');
const cors = require('cors');

const servicingController = require('../controllers/ServicingController');
import SecurityConfig from "../utils/config";

const securityConfig = new SecurityConfig();
const {corsOptions} = securityConfig;

const serviceRouter = express.Router();

serviceRouter.use(cors(corsOptions));


serviceRouter.get('/all', servicingController.getAllServicingReport);
serviceRouter.post('/new', servicingController.newServicingReport);
// serviceRouter.patch('/update', servicingController.updateFuelReport);
// serviceRouter.delete('/delete', servicingController.deleteFuelReport);

module.exports = serviceRouter;