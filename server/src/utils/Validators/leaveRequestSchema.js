const Joi = require('joi');

export const leaveRequestSchemaValidator = Joi.object().keys({
    fullName: Joi.string().pattern(/^[A-Za-z\s-]+$/).required(),
    staffId: Joi.string().required(),
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
    // status: Joi.string().required().valid('Requested', 'Pending', 'Approved', 'Declined'),
    duration: Joi.number().required(),
    currentBalance: Joi.number().required(),
    newBalance: Joi.number().required(),
    saveAsDraft: Joi.boolean().required()
});