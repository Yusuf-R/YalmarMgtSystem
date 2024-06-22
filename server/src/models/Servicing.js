const mongoose = require('mongoose');
const {Schema} = require("mongoose");

// Custom validation for genHr fields
const validateGenHr = {
    validator: function (value) {
        return typeof value === 'number' || ["FAULTY TELLYS", 'NOT APPLICABLE'].includes(value);
    },
    message: props => `${props.value} is not a valid value for genHr.`
};

const serviceOps = {
    // staff info
    staff_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true},
    email: {type: String, ref: 'Staff', required: true},
    role: {type: String, ref: 'Staff', required: true},
    // site info
    site_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true},
    siteId: {type: String, required: true},
    state: {type: String, required: true, default: 'KADUNA'},
    cluster: {type: String, enum: ['BIRNIN-GWARI', 'KADUNA-CENTRAL', 'ZARIA'], required: true},
    location: {type: String},
    siteType: {
        type: String,
        enum: ['TERMINAL', 'HUB', 'MAJOR-HUB', 'MGW', 'TERMINAL-HUB', 'BSC'],
        required: true,
        default: 'HUB'
    },
    shelterType: {
        type: String,
        enum: ['Containerized', 'Open'],
        required: true,
        default: 'Containerized'
    },
    pmType: {
        type: String,
        enum: ['PM1', 'PM2',],
        required: true,
    },
    // service info
    serviceDate: {type: String, default: Date, required: true},
    nextServiceDate: {type: String, default: Date, required: true},
    generatorPM: {
        defaultOperation: {type: String, enum: ['Gen1', "Gen2"], required: true, default: 'Gen1'},
        // gen1 info
        gen1Type: {
            type: String, enum: [
                'CAT',
                'Mantrac',
                'Lista-Peter',
                'FG-Wilson',
                'Jubali-Bros',
                'Mikano',
                'Younes',
                'Perkins',
                'SDMO',
                'Others',
            ],
            required: true,
            default: 'CAT'
        },
        gen1Display: {type: String, enum: ['OK', "NOT OK", 'NOT APPLICABLE']},
        gen1Hr: {type: Schema.Types.Mixed, validate: validateGenHr},
        gen1WorkingStatus: {type: String, enum: ['OK', "NOT OK", 'WEAK GEN', 'NOT APPLICABLE']},
        
        // gen2 info
        gen2Type: {
            type: String, enum: [
                'CAT',
                'Mantrac',
                'Lista-Peter',
                'FG-Wilson',
                'Jubali-Bros',
                'Mikano',
                'Younes',
                'Perkins',
                'SDMO',
                'Others',
            ],
            required: true,
            default: 'CAT'
        },
        gen2Display: {type: String, enum: ['OK', "NOT OK", 'NOT APPLICABLE']},
        gen2Hr: {type: Schema.Types.Mixed, validate: validateGenHr},
        gen2WorkingStatus: {type: String, enum: ['OK', "NOT OK", 'WEAK GEN', 'NOT APPLICABLE']},
    },
    airconPM: {
        ac1Status: {type: String, enum: ['OK', "NOT OK", 'NOT APPLICABLE']},
        ac2Status: {type: String, enum: ['OK', "NOT OK", 'NOT APPLICABLE']}
    },
    shelterPM: {
        cleaningStatus: {type: String, enum: ['OK', "NOT OK", 'NOT APPLICABLE']},
        securityLight: {type: String, enum: ['OK', "NOT OK", 'NOT APPLICABLE']},
        externalSecurityLight: {type: String, enum: ['OK', "NOT OK", 'NOT APPLICABLE']},
        floodLightAvailability: {type: String, enum: ['YES', "NO", 'NOT APPLICABLE']},
        floodLightStatus: {type: String, enum: ['WORKING', "NOT-WORKING", 'NOT APPLICABLE']}
    },
    lightingPM: {
        awl: {type: String, enum: ['OK', "NOT OK", 'NOT APPLICABLE']}
    },
    securityPM: {
        securityStatus: {type: String, enum: ['AVAILABLE', "NOT-AVAILABLE", 'NOT APPLICABLE']},
        siteAccess: {type: String, enum: ['LOCKED', "ACCESS-GRANTED", 'UN-AVAILABLE', 'NOT APPLICABLE']},
    }
};

const serviceOpsSchema = new mongoose.Schema(serviceOps, {timestamps: true});

const Servicing = mongoose.model('Servicing', serviceOpsSchema);

module.exports = Servicing;
