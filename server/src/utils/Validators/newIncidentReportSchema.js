const Joi = require('joi');

// Base Incident Validation Schema
const baseIncidentSchema = Joi.object({
    incidentDate: Joi.date().iso().required(),
    adminFullName: Joi.string().required(),
    adminEmail: Joi.string().email().required(),
    admin_id: Joi.string().required(),
    adminRole: Joi.string().valid('Admin', 'SuperAdmin').required(),
    severity: Joi.string().valid('Critical', 'Major', 'Minor').required(),
    reportCategory: Joi.array().items(Joi.string().valid('Staff', 'Site', 'Fuel', 'Service', 'Others')).required(),
    reportDescription: Joi.string().required(),
    images: Joi.array().items(Joi.string()).default([]),
});

// AllStaff Incident Validation Schema
const staffIncidentSchema = Joi.object({
    staffInfo: Joi.object({
        staff_id: Joi.string().required(),
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.string().required(),
    }).required(),
    staffIncidentInfo: Joi.object({
        classAction: Joi.string().valid('Employment', 'Roles', 'Violence', 'Others').required(),
        category: Joi.object({
            employment: Joi.string().valid('Employed', 'Promoted', 'Demoted', 'Sacked', 'Resigned', 'Retired', 'Absconded', 'Others').allow(null),
            role: Joi.string().valid('Theft', 'Diversion', 'Conspiracy', 'Insubordination', 'Others').allow(null),
            violence: Joi.string().valid('Physical', 'Verbal', 'Sexual', 'Others').allow(null),
            others: Joi.string().allow(null),
        }).required(),
    }).required(),
});

// AllSite Incident Validation Schema
const siteIncidentSchema = Joi.object({
    siteInfo: Joi.object({
        site_id: Joi.string().required(),
        siteId: Joi.string().required(),
        state: Joi.string().valid('KADUNA').default('KADUNA'),
        cluster: Joi.string().valid('BIRNIN-GWARI', 'KADUNA-CENTRAL', 'ZARIA').required(),
        location: Joi.string().allow(null),
        type: Joi.string().valid('TERMINAL', 'HUB', 'MAJOR-HUB', 'MGW', 'TERMINAL-HUB', 'BSC').default('HUB'),
    }).required(),
    siteIncidentInfo: Joi.object({
        category: Joi.string().valid('Shelter', 'Security', 'Others').required(),
        subCategory: Joi.object({
            shelter: Joi.string().valid('Fire', 'Flooding', 'Structural-Damage', 'Others').allow(null),
            security: Joi.string().valid('Theft', 'Vandalism', 'Intrusion', 'Others').allow(null),
            others: Joi.string().allow(null),
        }).required(),
    }).required(),
});

// Fuel Incident Validation Schema
const fuelIncidentSchema = Joi.object({
    fuelSiteInfo: siteIncidentSchema.extract('siteInfo'), // Reuse the siteInfo schema
    fuelIncidentInfo: Joi.object({
        category: Joi.string().valid('Theft', 'Quality', 'Consumption', 'Intervention', 'Others').required(),
        subCategory: Joi.object({
            theft: Joi.object({
                oldQty: Joi.number().default(0),
                newQty: Joi.number().default(0),
                qtyStolen: Joi.number().default(0),
            }).allow(null),
            quality: Joi.object({
                action: Joi.string().valid('Bad', 'Adulterated').allow(null),
            }).allow(null),
            intervention: Joi.object({
                action: Joi.string().valid('Top-up', 'Emergency', 'Routine').allow(null),
                oldQty: Joi.number().default(0),
                newQty: Joi.number().default(0),
                qtyAdded: Joi.number().default(0),
            }).allow(null),
            others: Joi.string().allow(null),
        }).required(),
    }).required(),
});

// Service Incident Validation Schema
const serviceIncidentSchema = Joi.object({
    serviceSiteInfo: siteIncidentSchema.extract('siteInfo'), // Reuse the siteInfo schema
    serviceIncidentInfo: Joi.object({
        category: Joi.string().valid('Maintenance', 'Repair', 'Overhauling', 'Replacement', 'Others').required(),
        subCategory: Joi.object({
            maintenance: Joi.object({
                action: Joi.string().valid('Routine', 'Scheduled', 'Unscheduled').allow(null),
            }).allow(null),
            repair: Joi.object({
                action: Joi.string().valid('Minor', 'Major').allow(null),
            }).allow(null),
            overhauling: Joi.object({
                action: Joi.string().valid('Partial', 'Complete').allow(null),
            }).allow(null),
            replacement: Joi.object({
                action: Joi.string().valid('Minor', 'Major').allow(null),
            }).allow(null),
            others: Joi.string().allow(null),
        }).required(),
    }).required(),
});

// Validation function based on reportCategory
function validateIncident(data) {
    const {reportCategory} = data;
    let schema = baseIncidentSchema;

    if (reportCategory.includes('Staff')) {
        schema = schema.concat(staffIncidentSchema);
    }
    if (reportCategory.includes('Fuel')) {
        schema = schema.concat(fuelIncidentSchema);
    }
    if (reportCategory.includes('Service')) {
        schema = schema.concat(serviceIncidentSchema);
    }
    if (reportCategory.includes('Site')) {
        schema = schema.concat(siteIncidentSchema);
    }
    return schema.validate(data, {abortEarly: false});
}

module.exports = {
    validateIncident
};
