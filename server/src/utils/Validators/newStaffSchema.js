const Joi = require('joi');
import {stateAndLGA, institutions} from "../data";

const validState = Object.keys(stateAndLGA);
const normalizedStateAndLGA = Object.fromEntries(
    Object.entries(stateAndLGA).map(([states, lgas]) => [states.toLowerCase(), lgas])
);
// console.log({validState, normalizedStateAndLGA});

export const newStaffSchemaValidator = Joi.object().keys({
    title: Joi.string().required(),
    firstName: Joi.string().pattern(/^[A-Za-z\s-]+$/).required(),
    middleName: Joi.string().pattern(/^[A-Za-z\s-]+$/).optional().allow('').allow(null),
    lastName: Joi.string().pattern(/^[A-Za-z\s-]+$/).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .min(11)
        .max(11)
        .required(),
    dob: Joi.date().required(),
    status: Joi.string().required().valid('Active', 'Suspended', 'Terminated', 'Deceased', 'Pending'),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{6,30}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters'
        }),
    gender: Joi.string().required().valid('Male', 'Female'),
    maritalStatus: Joi.string().required().valid('Single', 'Married', 'Divorced', 'Widowed'),
    religion: Joi.string().required().valid('Christianity', 'Islam', 'Others'),
    country: Joi.string().required(),
    // ensure stateOfOrigin is valid state in nigeria as per in the stateAndLGA data
    stateOfOrigin: Joi.string().required().valid(...validState).insensitive(),
    // ensure lga is a valid local government area in the selected stateOfOrigin
    lga: Joi.string().required().custom((value, helpers) => {
        const {stateOfOrigin} = helpers.state.ancestors[0];
        if (!stateOfOrigin) {
            return helpers.error('any.invalid'); // State must be validated before LGA
        }
        // Use normalized keys for lookup
        const validLGA = normalizedStateAndLGA[stateOfOrigin.toLowerCase()];
        if (!validLGA) {
            return helpers.error('any.invalid', {value: `State '${stateOfOrigin}' is not recognized`});
        }
        if (!validLGA.map(lga => lga.toLowerCase()).includes(value.toLowerCase())) {
            return helpers.error('any.invalid', {value});
        }
        return value; // Everything is fine
    }, 'LGA validation').insensitive(),
    // other fields...
    nextOfKin: Joi.string().pattern(/^[A-Za-z\s-]+$/).required(),
    nextOfKinPhone: Joi.string()
        .min(11)
        .max(11)
        .required(),
    nextOfKinRelationship: Joi.string().required().valid(
        'Father',
        'Mother',
        'Brother',
        'Sister',
        'Son',
        'Daughter',
        'Spouse',
        'Wife',
        'Husband',
        'Uncle',
        'Aunt',
        'Cousin',
        'Nephew',
        'Niece',
        'Grandfather',
        'Grandmother',
        'Others',
    ).insensitive(),
    address: Joi.string().required(),
    stateOfResidence: Joi.string().required(),
    highestDegree: Joi.string().required().valid(
        'SSCE',
        'NCE',
        'ND',
        'OND',
        'HND',
        'BSc',
        'MSc',
        'PgD',
        'PhD',
        'Others',
    ).insensitive(),
    institution: Joi.string().required().valid(...institutions).insensitive(),
    courseOfStudy: Joi.string().required(),
    classofDegree: Joi.string().required().valid(
        'Distinction',
        'First Class',
        'Second Class Upper',
        'Second Class Lower',
        'Third Class',
        'Pass',
        'Merit',
        'Upper Credit',
        'Lower Credit',
        'Credit',
        'Others',
    ).insensitive(),
    faculty: Joi.string().required(),
    graduationDate: Joi.date().required(),
    employmentDate: Joi.date().required(),
    employmentType: Joi.string().required().valid('FullTime', 'Contract', 'Trainee').insensitive(),
    role: Joi.string().required().valid('Admin', 'SuperAdmin', 'User', 'Accountant', 'Generator Technician', 'Procurement Officer', 'Lawyer', 'Driver', 'Field Supervisor', 'Security Officer').insensitive(),
    // siteState: Joi.string().allow('', null).when('role', {
    //     is: Joi.string().valid('Field Supervisor', 'Generator Technician'),
    //     then: Joi.string().required(),
    //     otherwise: Joi.string().optional().allow('', null),
    // }),
    siteState: Joi.string().when('role', {
        is: Joi.string().valid('Field Supervisor', 'Generator Technician').insensitive(),
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow('', null),
    }),
    cluster: Joi.string().when('role', {
        is: Joi.string().valid('Field Supervisor', 'Generator Technician').insensitive(),
        then: Joi.string().required(),
        otherwise: Joi.string().optional().allow('', null),
    }),
    siteID: Joi.array().items(Joi.string()).when('role', {
        is: Joi.string().valid('Field Supervisor', 'Generator Technician').insensitive(),
        then: Joi.array().min(1).required(),
        otherwise: Joi.array().optional().allow('', null),
    }),
});