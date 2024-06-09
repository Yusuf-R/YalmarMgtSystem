import Joi from "joi";

const joi = require('joi');

export const actionLeaveRequestSchemaValidator = joi.object().keys({
    status: joi.string().required().valid('Requested', 'Pending'),
    adminAction: joi.string().required().valid('Accepted', 'Rejected', 'Pending'),
    staffId: joi.string().required(),
    _id: joi.string().required(),
    fullName: Joi.string().pattern(/^[A-Za-z\s-]+$/).required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required().valid(
        'Admin',
        'SuperAdmin',
        'User',
        'Accountant',
        'Generator Technician',
        'Procurement Officer',
        'Lawyer',
        'Driver',
        'Field Supervisor',
        'Security Officer'
    ).insensitive(),
    leaveType: Joi.string().required().valid(
        "Annual",
        "Casual",
        "Compassionate",
        "Emergency",
        "Maternity",
        "Paternity",
        "Sick",
        "Study",
        "Leave without Pay",
        "Others",
    ),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    leaveReason: Joi.string().required().valid(
        "Accident",
        "Annual",
        "Appointment",
        "Bereavement",
        "Burial",
        "Emergency",
        "Family Related",
        "Personal",
        "Medical CheckUp",
        "Medical",
        "Surgery",
        "Wedding",
        "Confidential",
    ),
    duration: Joi.number().required(),
    currentBalance: Joi.number().required(),
    newBalance: Joi.number().required(),
});