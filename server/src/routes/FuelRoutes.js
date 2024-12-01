/* eslint-disable no-unused-vars */
/* eslint-disable jest/require-hook */
const express = require('express');
const cors = require('cors');

const fuelController = require('../controllers/FuellingController');
import SecurityConfig from "../utils/config";

const securityConfig = new SecurityConfig();
const { corsOptions } = securityConfig;

const fuelRouter = express.Router();

fuelRouter.use(cors(corsOptions));
fuelRouter.options('*', cors(corsOptions));


fuelRouter.get('/all', fuelController.getAllFuelReport);
// fuelRouter.get('/territory', fuelController.getFuelReportByTerritory);
fuelRouter.post('/new', fuelController.newFuelReport);
fuelRouter.patch('/update', fuelController.updateFuelReport);
fuelRouter.delete('/delete', fuelController.deleteFuelReport);

module.exports = fuelRouter;