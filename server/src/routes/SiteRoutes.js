import SecurityConfig from "../utils/config";

const express = require('express');
const cors = require('cors');
const siteController = require('../controllers/SiteController');

const securityConfig = new SecurityConfig();
const {corsOptions} = securityConfig;

const siteRouter = express.Router();

siteRouter.use(cors(corsOptions));

// api routes CRUD

siteRouter.get('/all', siteController.getAllSite);
siteRouter.get('/birnin-gwari', siteController.getSite);
siteRouter.get('/kaduna-central', siteController.getSite);
siteRouter.get('/zaria', siteController.getSite);
siteRouter.post('/new', siteController.newSite);
siteRouter.patch('/update', siteController.updateSite);
siteRouter.delete('/delete', siteController.deleteSite);


module.exports = siteRouter;
