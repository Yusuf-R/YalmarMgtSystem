const Joi = require('joi');

export const newSiteSchemaValidator = Joi.object().keys({
    siteId: Joi.string().required(),
    state: Joi.string().required(),
    cluster: Joi.string().required(),
    location: Joi.string().optional().allow('').allow(null),
    type: Joi.string().required().valid('TERMINAL', 'HUB', 'MAJOR-HUB', 'MGW', 'TERMINAL-HUB', 'BSC'),
    status: Joi.string().required().valid('Active', 'Inactive', 'Deactivated'),
    longitude: Joi.number().optional().allow('').allow(null),
    latitude: Joi.number().optional().allow('').allow(null),
    img: Joi.string().optional().allow('').allow(null),
    // conditionally check if _id is present, if so run the check if not present skip it
    _id: Joi.string().optional().allow('').allow(null),
});