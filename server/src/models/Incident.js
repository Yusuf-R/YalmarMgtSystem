const mongoose = require('mongoose');

// Base Schema Options
const baseSchemaOptions = {
    discriminatorKey: 'incidentType',
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
};

// Base Incident Schema
const baseIncidentSchema = new mongoose.Schema(
    {
        reportTime: {type: Date, required: true, default: Date.now, index: true},
        recordBy: {type: String, default: null},
        severity: {type: String, enum: ['Critical', 'Major', 'Minor'], required: true, default: 'Minor'},
        reportCategory: {
            type: String,
            enum: ['Staff', 'Site', 'Fuel', 'Service', 'Others'],
            required: true,
            default: 'Others'
        },
        reportDescription: {type: String, required: true},
        reportImage: {type: [String], default: []},
    },
    baseSchemaOptions
);

// Extendable Incident Schema
const Incident = mongoose.model('Incident', baseIncidentSchema);

// Staff Incident Specific Schema
const staffIncidentSchema = new mongoose.Schema({
    staff_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true},
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, required: true},
    classAction: {
        type: String,
        enum: ['Employment', 'Roles', 'Violence', 'Others'],
        required: true,
    },
    categoryEmployment: {
        type: String,
        enum: ['Employed', 'Promoted', 'Demoted', 'Sacked', 'Resigned', 'Retired', 'Absconded', 'Others'],
        default: null,
    },
    categoryRole: {
        type: String,
        enum: ['Theft', 'Diversion', 'Conspiracy', 'Insubordination', 'Others'],
        default: null,
    },
    categoryViolence: {
        type: String,
        enum: ['Physical', 'Verbal', 'Sexual', 'Others'],
        default: null,
    },
    categoryStaffOthers: {type: String, default: null},
});
const StaffIncident = Incident.discriminator('StaffIncident', staffIncidentSchema);

// Site Incident Specific Schema
const siteInfoSchema = new mongoose.Schema({
    site_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true},
    siteId: {type: String, required: true},
    state: {type: String, required: true, default: 'KADUNA'},
    cluster: {type: String, enum: ['BIRNIN-GWARI', 'KADUNA-CENTRAL', 'ZARIA'], required: true},
    location: {type: String},
    type: {
        type: String,
        enum: ['TERMINAL', 'HUB', 'MAJOR-HUB', 'MGW', 'TERMINAL-HUB', 'BSC'],
        required: true,
        default: 'HUB',
    },
});

const siteIncidentSchema = new mongoose.Schema({
    siteInfo: {type: siteInfoSchema, required: true},
    categorySite: {
        type: String,
        enum: ['Shelter', 'Security', 'Others'],
        required: true,
    },
    categorySecurity: {
        type: String,
        enum: ['Theft', 'Vandalism', 'Intrusion', 'Others'],
        default: null,
    },
    categoryShelter: {
        type: String,
        enum: ['Fire', 'Flooding', 'Structural-Damage', 'Others'],
        default: null,
    },
    categorySiteOthers: {type: String, default: null},
});
const SiteIncident = Incident.discriminator('SiteIncident', siteIncidentSchema);

// Fuel Incident Specific Schema
const fuelIncidentSchema = new mongoose.Schema({
    fuelSiteInfo: {type: siteInfoSchema, required: true},
    categoryFuel: {
        type: String,
        enum: ['Theft', 'Quality', 'Consumption', 'Intervention', 'Others'],
        required: true,
    },
    categoryTheft: {
        oldQty: {type: Number, default: 0},
        newQty: {type: Number, default: 0},
        qtyStolen: {type: Number, default: 0},
    },
    categoryQuality: {
        quality: {
            type: String,
            enum: ['Bad', 'Adulterated'],
            default: null,
        },
    },
    categoryIntervention: {
        action: {
            type: String,
            enum: ['Top-up', 'Emergency', 'Routine'],
            default: null,
        },
        oldQty: {type: Number, default: 0},
        newQty: {type: Number, default: 0},
        qtyAdded: {type: Number, default: 0},
    },
    categoryFuelOthers: {type: String, default: null},
});
const FuelIncident = Incident.discriminator('FuelIncident', fuelIncidentSchema);

// Service Incident Specific Schema
const serviceIncidentSchema = new mongoose.Schema({
    serviceSiteInfo: {type: siteInfoSchema, required: true},
    categoryService: {
        type: String,
        enum: ['Maintenance', 'Repair', 'Overhauling', 'Replacement', 'Others'],
        required: true,
    },
    categoryMaintenance: {
        action: {
            type: String,
            enum: ['Routine', 'Scheduled', 'Unscheduled'],
            default: null,
        },
    },
    categoryRepair: {
        action: {
            type: String,
            enum: ['Minor', 'Major'],
            default: null,
        },
    },
    categoryOverhauling: {
        action: {
            type: String,
            enum: ['Partial', 'Complete'],
            default: null,
        },
    },
    categoryReplacement: {
        action: {
            type: String,
            enum: ['Minor', 'Major'],
            default: null,
        },
    },
    categoryServiceOthers: {type: String, default: null},
});
const ServiceIncident = Incident.discriminator('ServiceIncident', serviceIncidentSchema);

// Others Incident Specific Schema
const othersRelatedSchema = new mongoose.Schema({});
const OthersIncident = Incident.discriminator('OthersIncident', othersRelatedSchema);

module.exports = {
    Incident,
    StaffIncident,
    SiteIncident,
    FuelIncident,
    ServiceIncident,
    OthersIncident,
};
