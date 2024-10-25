const Joi = require('joi');

export const editFuellingReportSchemaValidator = Joi.object().keys({
    _id: Joi.string().required(),
    site_id: Joi.string().required(),
    qtyInitial: Joi.number().required(),
    qtySupplied: Joi.number().required(),
    qtyNew: Joi.number().required(),
    dateSupplied: Joi.string().required(),
    nextDueDate: Joi.string().required(),
    duration: Joi.number().required(),
    siteId: Joi.string().required(),
    state: Joi.string().required(),
    cluster: Joi.string().required(),
    location: Joi.string().optional().allow('').allow(null),
    type: Joi.string().required().valid('TERMINAL', 'HUB', 'MAJOR-HUB', 'MGW', 'TERMINAL-HUB', 'BSC'),
    cpd: Joi.number().required(),
});