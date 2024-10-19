const mongoose = require('mongoose');

// Base Schema Options
const baseSchemaOptions = {
    discriminatorKey: 'incidentType',
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
};

// Base Incident Schema
const baseIncidentSchema = new mongoose.Schema(
    {
        incidentDate: {type: Date, required: true, index: true},
        adminFullName: {type: String, required: true},
        adminEmail: {type: String, required: true},
        admin_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true},
        adminRole: {
            type: String,
            enum: ['Admin', 'SuperAdmin',],
            required: true,
            validate: {
                validator: (value) => {
                    return value === 'Admin' || value === 'SuperAdmin';
                },
                message: 'Invalid admin role'
            },
        },
        severity: {type: String, enum: ['Critical', 'Major', 'Minor'], required: true, default: 'Minor'},
        reportCategory: {
            type: [String],
            enum: ['Staff', 'Site', 'Fuel', 'Service', 'Others'],
            required: true,
            default: 'Others'
        },
        reportDescription: {type: String, required: true},
        images: {type: [String], default: []},
    },
    baseSchemaOptions
);

// Extendable Incident Schema
const Incident = mongoose.model('Incident', baseIncidentSchema);

// AllStaff Incident Specific Schema
const staffIncidentSchema = new mongoose.Schema({
    staffInfo: {
        staff_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true},
        fullName: {type: String, required: true},
        email: {type: String, required: true},
        role: {type: String, required: true},
    },
    staffIncidentInfo: {
        classAction: {
            type: String,
            enum: ['Employment', 'Roles', 'Violence', 'Others'],
            required: true,
        },
        category: {
            employment: {
                type: String,
                enum: ['Employed', 'Promoted', 'Demoted', 'Sacked', 'Resigned', 'Retired', 'Absconded', 'Others'],
                default: null,
            },
            role: {
                type: String,
                enum: ['Theft', 'Diversion', 'Conspiracy', 'Insubordination', 'Others'],
                default: null,
            },
            violence: {
                type: String,
                enum: ['Physical', 'Verbal', 'Sexual', 'Others'],
                default: null,
            },
            others: {type: String, default: null},
        },
    },
});
const StaffIncident = Incident.discriminator('StaffIncident', staffIncidentSchema);

// AllSite Incident Specific Schema
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
    siteIncidentInfo: {
        category: {
            type: String,
            enum: ['Shelter', 'Security', 'Others'],
            required: true,
        },
        subCategory: {
            shelter: {
                type: String,
                enum: ['Fire', 'Flooding', 'Structural-Damage', 'Others'],
                default: null,
            },
            security: {
                type: String,
                enum: ['Theft', 'Vandalism', 'Intrusion', 'Others'],
                default: null,
            },
            others: {type: String, default: null},
        },
    },
});
const SiteIncident = Incident.discriminator('SiteIncident', siteIncidentSchema);

// Fuel Incident Specific Schema
const fuelIncidentSchema = new mongoose.Schema({
    fuelSiteInfo: {type: siteInfoSchema, required: true},
    fuelIncidentInfo: {
        category: {
            type: String,
            enum: ['Theft', 'Quality', 'Consumption', 'Intervention', 'Others'],
            required: true,
        },
        subCategory: {
            theft: {
                oldQty: {type: Number, default: 0},
                newQty: {type: Number, default: 0},
                qtyStolen: {type: Number, default: 0},
            },
            quality: {
                action: {
                    type: String,
                    enum: ['Bad', 'Adulterated'],
                    default: null,
                },
            },
            intervention: {
                action: {
                    type: String,
                    enum: ['Top-up', 'Emergency', 'Routine'],
                    default: null,
                },
                oldQty: {type: Number, default: 0},
                newQty: {type: Number, default: 0},
                qtyAdded: {type: Number, default: 0},
            },
            others: {type: String, default: null},
        },
    },
});
const FuelIncident = Incident.discriminator('FuelIncident', fuelIncidentSchema);

// Service Incident Specific Schema
const serviceIncidentSchema = new mongoose.Schema({
    serviceSiteInfo: {type: siteInfoSchema, required: true},
    serviceIncidentInfo: {
        category: {
            type: String,
            enum: ['Maintenance', 'Repair', 'Overhauling', 'Replacement', 'Others'],
            required: true,
        },
        subCategory: {
            maintenance: {
                action: {
                    type: String,
                    enum: ['Routine', 'Scheduled', 'Unscheduled'],
                    default: null,
                },
            },
            repair: {
                action: {
                    type: String,
                    enum: ['Minor', 'Major'],
                    default: null,
                },
            },
            overhauling: {
                action: {
                    type: String,
                    enum: ['Partial', 'Complete'],
                    default: null,
                },
            },
            replacement: {
                action: {
                    type: String,
                    enum: ['Minor', 'Major'],
                    default: null,
                },
            },
            others: {type: String, default: null},
        },
    },
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
