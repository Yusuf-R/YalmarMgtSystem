const Joi = require('joi');

// Define a custom validation for gen1Hr to accept either a valid string or a positive number including zero
const genHrSchema = Joi.alternatives().try(
    Joi.string().valid('Enter Value', 'FAULTY-TELLYS', 'NOT-APPLICABLE'),
    Joi.number().min(0)
);

export const newServiceReportSchemaValidator = Joi.object({
    // Staff info
    fullName: Joi.string().required().messages({
        'string.empty': 'Staff full-name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email',
        'string.empty': 'Email is required'
    }),
    role: Joi.string().required().messages({
        'string.empty': 'Role is required'
    }),
    
    // Site info
    siteId: Joi.string().required().messages({
        'string.empty': 'Site ID is required'
    }),
    state: Joi.string().default('KADUNA').required().messages({
        'string.empty': 'State is required'
    }),
    cluster: Joi.string().valid('BIRNIN-GWARI', 'KADUNA-CENTRAL', 'ZARIA').required().messages({
        'any.only': 'Invalid cluster',
        'string.empty': 'Cluster is required'
    }),
    location: Joi.string().allow(''),
    siteType: Joi.string().valid('TERMINAL', 'HUB', 'MAJOR-HUB', 'MGW', 'TERMINAL-HUB', 'BSC').default('HUB').required().messages({
        'any.only': 'Invalid site type',
        'string.empty': 'Site type is required'
    }),
    shelterType: Joi.string().valid('Containerized', 'Open').required().messages({
        'any.only': 'Invalid shelter type',
        'string.empty': 'Shelter type is required'
    }),
    pmInstance: Joi.string().valid('PM1', 'PM2').required().messages({
        'any.only': 'Invalid PM instance',
        'string.empty': 'PM instance is required'
    }),
    
    // Service info
    servicingDate: Joi.date().required().messages({
        'date.base': 'Service date is required',
        'any.required': 'Service date is required'
    }),
    nextServiceDate: Joi.string().required().messages({
        'string.empty': 'Next service date is required'
    }),
    
    // siteGenModes
    siteGenModes: Joi.string().valid('GEN-1', 'GEN-1 and GEN-2').required().messages({
        'any.only': 'Invalid site gen modes',
        'string.empty': 'Site gen modes is required'
    }),
    
    generatorPM: Joi.object({
        defaultOperation: Joi.string().valid('Gen1', 'Gen2').required().messages({
            'any.only': 'Invalid default operation',
            'string.empty': 'Default operation is required'
        }),
        gen1Type: Joi.string().valid('CAT',
            'MANTRAC',
            'LISTA-PETER',
            'FG-WILSON',
            'JUBALI-BROS',
            'MIKANO',
            'YOUNES',
            'PERKINGS',
            'SDMO',
            'OTHERS',
            'NOT-APPLICABLE',).required().messages({
            'any.only': 'Invalid gen1 type',
            'string.empty': 'Gen1 type is required'
        }),
        gen1Display: Joi.string().valid('OK', 'NOT-OK', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid gen1 display status',
            'string.empty': 'Gen1 display status is required'
        }),
        gen1Hr: genHrSchema.required(),
        gen1OperatingVoltage: Joi.number().min(0).required().messages({
            'number.base': 'Gen1 operating voltage is required',
            'number.min': 'Must be zero or a positive number',
            'any.required': 'Gen1 operating voltage is required'
        }),
        gen1OperatingFrequency: Joi.number().min(0).required().messages({
            'number.base': 'Gen1 operating frequency is required',
            'number.min': 'Must be zero or a positive number',
            'any.required': 'Gen1 operating frequency is required'
        }),
        gen1WorkingStatus: Joi.string().valid('OK', 'NOT-OK', 'WEAK-GEN', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid gen1 working status',
            'string.empty': 'Gen1 working status is required'
        }),
        gen2Type: Joi.string().valid('CAT',
            'MANTRAC',
            'LISTA-PETER',
            'FG-WILSON',
            'JUBALI-BROS',
            'MIKANO',
            'YOUNES',
            'PERKINGS',
            'SDMO',
            'OTHERS',
            'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid gen2 type',
            'string.empty': 'Gen2 type is required'
        }),
        gen2Display: Joi.string().valid('OK', 'NOT-OK', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid gen2 display status',
            'string.empty': 'Gen2 display status is required'
        }),
        gen2Hr: genHrSchema.required(),
        gen2OperatingVoltage: Joi.number().min(0).required().messages({
            'number.base': 'Gen1 operating voltage is required',
            'number.min': 'Must be zero or a positive number',
            'any.required': 'Gen1 operating voltage is required'
        }),
        gen2OperatingFrequency: Joi.number().min(0).required().messages({
            'number.base': 'Gen1 operating frequency is required',
            'number.min': 'Must be zero or a positive number',
            'any.required': 'Gen1 operating frequency is required'
        }),
        gen2WorkingStatus: Joi.string().valid('OK', 'NOT-OK', 'WEAK-GEN', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid gen2 working status',
            'string.empty': 'Gen2 working status is required'
        }),
    }),
    
    airconPM: Joi.object({
        acInstalled: Joi.string().valid('YES', 'NO', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid AC installed status',
            'string.empty': 'AC installed status is required'
        }),
        noOfACInstalled: Joi.number().min(0).required().messages({
            'number.base': 'Number of AC is required',
            'number.min': 'Must be zero or a positive number',
            'any.required': 'Number of AC installed is required'
        }),
        ac1Status: Joi.string().valid('OK', 'NOT-OK', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid AC1 status',
            'string.empty': 'AC1 status is required'
        }),
        ac2Status: Joi.string().valid('OK', 'NOT-OK', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid AC2 status',
            'string.empty': 'AC2 status is required'
        }),
    }),
    
    shelterPM: Joi.object({
        siteCleaningStatus: Joi.string().valid('OK', 'NOT-OK', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid cleaning status',
            'string.empty': 'Site cleaning status is required'
        }),
        shelterCleaningStatus: Joi.string().valid('OK', 'NOT-OK', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid cleaning status',
            'string.empty': 'Shelter cleaning status is required'
        }),
    }),
    
    lightningPM: Joi.object({
        securityLightAvailability: Joi.string().valid('YES', 'NO', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid security light status',
            'string.empty': 'Security light availability is required'
        }),
        //  securityLightStatus should only required when securityLightAvailability is YES
        securityLightStatus: Joi.string().when('securityLightAvailability', {
            is: 'YES',
            then: Joi.string().valid('WORKING', 'NOT-WORKING', 'NOT-APPLICABLE').required().messages({
                'any.only': 'Invalid security light status',
                'string.empty': 'Security light status is required'
            }),
            otherwise: Joi.string().allow(null).allow('')
        }),
        
        floodLightAvailability: Joi.string().valid('YES', 'NO', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid flood light availability',
            'string.empty': 'Flood light availability is required'
        }),
        // floodLightStatus should only be required when floodLightAvailability is YES
        floodLightStatus: Joi.string().when('floodLightAvailability', {
            is: 'YES',
            then: Joi.string().valid('WORKING', 'NOT-WORKING', 'NOT-APPLICABLE').required().messages({
                'any.only': 'Invalid flood light status',
                'string.empty': 'Flood light status is required'
            }),
            // otherwise allow null or empty string
            otherwise: Joi.string().allow(null).allow('')
        }),
        
        awl: Joi.string().valid('WORKING', 'NOT-WORKING', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid AWL status',
            'string.empty': 'AWL status is required'
        }),
    }),
    
    securityPM: Joi.object({
        securityStatus: Joi.string().valid('AVAILABLE', 'NOT-AVAILABLE', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid security status',
            'string.empty': 'Security status is required'
        }),
        siteAccess: Joi.string().valid('LOCKED', 'ACCESS-GRANTED', 'UN-AVAILABLE', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid site access status',
            'string.empty': 'Site access status is required'
        }),
    }),
    
    dcSystem: Joi.object({
        // maybe in the future they'll want to add voltage reading
        // voltageReading: Joi.number().positive().required().messages({
        //     'number.base': 'Voltage reading is required',
        //     'number.positive': 'Must be a positive number',
        //     'any.required': 'Voltage reading is required'
        // }),
        backUpBatteries: Joi.string().valid('YES', 'NO', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid backup battery status',
            'string.empty': 'Backup battery status is required'
        }),
        batteryCount: Joi.number().valid(0, 4, 8, 12, 16, 24, 32, 48,).positive().min(0).required().messages({
            'number.base': 'Backup battery count is required',
            'number.positive': 'Must be a positive number',
            'any.required': 'Backup battery count is required'
        }),
        batteryStatus: Joi.string().valid('OK', 'NOT-OK', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid battery status',
            'string.empty': 'Battery status is required'
        }),
        rectifierStatus: Joi.string().valid('OK', 'NOT-OK', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid rectifier status',
            'string.empty': 'Rectifier status is required'
        }),
    }),
    
    otherPM: Joi.object({
        feederCableStatus: Joi.string().valid('OK', 'NOT-OK', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid feeder cable status',
            'string.empty': 'Feeder cable status is required'
        }),
        changeOverSwitchStatus: Joi.string().valid('OK', 'NOT-OK', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid changeover switch status',
            'string.empty': 'Changeover switch status is required'
        }),
        fireExtinguisherStatus: Joi.string().valid('OK', 'NOT-OK', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid fire extinguisher status',
            'string.empty': 'Fire extinguisher status is required'
        }),
        earthingStatus: Joi.string().valid('OK', 'NOT-OK', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid earthing status',
            'string.empty': 'Earthing status is required'
        }),
        earthingCableStatus: Joi.string().valid('OK', 'NOT-OK', 'NOT-APPLICABLE').required().messages({
            'any.only': 'Invalid earthing cable status',
            'string.empty': 'Earthing cable status is required'
        }),
    }),
    
    // summary info
    summary: Joi.string().required().messages({
        'string.empty': 'Summary description is required'
    }),
    
    // Admin Info
    adminFullName: Joi.string().required().messages({
        'string.empty': 'Staff full-name is required'
    }),
    adminEmail: Joi.string().email().required().messages({
        'string.email': 'Invalid email',
        'string.empty': 'Email is required'
    }),
    adminRole: Joi.string().required().messages({
        'string.empty': 'Role is required'
    }),
    
    site_id: Joi.string().required().messages({
        'string.empty': 'Site ID is required'
    }),
    
    staff_id: Joi.string().required().messages({
        'string.empty': 'Staff ID is required'
    }),
    
    admin_id: Joi.string().required().messages({
        'string.empty': 'Staff ID is required'
    }),
    imageCredential: Joi.string().required().messages({
        'string.empty': 'Image credential is required'
    }),
    
});

