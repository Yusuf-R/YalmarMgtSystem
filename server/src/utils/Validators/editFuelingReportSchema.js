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
    cpd: Joi.number().required(),
});