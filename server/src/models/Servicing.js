const mongoose = require('mongoose');
const {Schema} = mongoose;

const opt1 = ['OK', "NOT OK", 'NOT APPLICABLE'];
const opt2 = ['YES', "NO", 'NOT APPLICABLE'];
const opt3 = ['WORKING', "NOT-WORKING", 'NOT APPLICABLE'];

const hrOptions = ['Enter Value', 'FAULTY TELLYS', 'NOT APPLICABLE'];

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
    fullName: {type: String, ref: 'Staff', required: true},
    email: {type: String, ref: 'Staff', required: true},
    role: {type: String, ref: 'Staff', required: true},
    
    // admin info
    admin_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true},
    adminFullName: {type: String, ref: 'Staff', required: true},
    adminEmail: {type: String, ref: 'Staff', required: true},
    adminRole: {type: String, ref: 'Staff', required: true},
    
    // site info
    site_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true},
    siteId: {type: String, required: true},
    state: {type: String, required: true, default: 'KADUNA'},
    cluster: {type: String, enum: ['BIRNIN-GWARI', 'KADUNA-CENTRAL', 'ZARIA'], required: true},
    location: {type: String},
    siteGenModes: {
        type: String,
        enum: ['GEN-1', 'GEN-1 and GEN-2'],
        default: 'GEN-1',
        required: true,
    },
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
    pmInstance: {
        type: String,
        enum: ['PM1', 'PM2'],
        required: true,
    },
    
    // service info
    serviceDate: {type: String, default: Date, required: true},
    nextServiceDate: {type: String, default: Date, required: true},
    
    // gen PM
    generatorPM: {
        defaultOperation: {type: String, enum: ['Gen1', "Gen2"], required: true, default: 'Gen1'},
        
        // gen1 info
        gen1Type: {
            type: String,
            enum: [
                'CAT',
                'MANTRAC',
                'LISTA-PETER',
                'FG-WILSON',
                'JUBALI-BROS',
                'MIKANO',
                'YOUNES',
                'PERKINGS',
                'SDMO',
                'OTHERS',
                'NOT-APPLICABLE',
            ],
            required: true,
        },
        gen1Display: {type: String, enum: ['OK', "NOT OK", 'NOT APPLICABLE']},
        gen1Hr: {
            type: Schema.Types.Mixed,
            validate: {
                validator: function (value) {
                    return typeof value === 'number' || hrOptions.includes(value);
                },
                message: props => `Invalid gen1Hr value: ${props.value}`
            }
        },
        gen1OperatingVoltage: {
            type: Number,
            required: true,
        },
        gen1OperatingFrequency: {
            type: Number,
            required: true,
        },
        gen1WorkingStatus: {type: String, enum: ['OK', "NOT OK", 'WEAK GEN', 'NOT APPLICABLE']},
        
        // gen2 info
        gen2Type: {
            type: String,
            enum: [
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
            required: function () {
                return this.siteGenModes === 'GEN-1 and GEN-2';
            },
            default: 'CAT'
        },
        gen2Display: {
            type: String,
            enum: ['OK', "NOT OK", 'NOT APPLICABLE'],
            required: function () {
                return this.siteGenModes === 'GEN-1 and GEN-2';
            }
        },
        gen2Hr: {
            type: Schema.Types.Mixed,
            validate: {
                validator: function (value) {
                    return typeof value === 'number' || hrOptions.includes(value);
                },
                message: props => `Invalid gen2Hr value: ${props.value}`
            },
            required: function () {
                return this.siteGenModes === 'GEN-1 and GEN-2';
            }
        },
        gen2OperatingVoltage: {
            type: Number,
            required: function () {
                return this.siteGenModes === 'GEN-1 and GEN-2';
            },
        },
        gen2OperatingFrequency: {
            type: Number,
            required: function () {
                return this.siteGenModes === 'GEN-1 and GEN-2';
            },
        },
        gen2WorkingStatus: {
            type: String,
            enum: ['OK', "NOT OK", 'WEAK GEN', 'NOT APPLICABLE'],
            required: function () {
                return this.siteGenModes === 'GEN-1 and GEN-2';
            }
        },
    },
    
    // ac PM
    airconPM: {
        acInstalled: {type: String, enum: opt2},
        noOfACInstalled: {
            type: Number,
            required: function () {
                return this.airconPM.acInstalled === 'YES';
            }
        },
        ac1Status: {
            type: String,
            enum: opt1,
            required: function () {
                return this.airconPM.acInstalled === 'YES';
            }
        },
        ac2Status: {
            type: String,
            enum: opt1,
            required: function () {
                return this.airconPM.acInstalled === 'YES';
            }
        }
    },
    
    // shelter PM
    shelterPM: {
        shelterCleaningStatus: {type: String, enum: opt1},
        siteCleaningStatus: {type: String, enum: opt1},
    },
    
    lightningPM: {
        awl: {type: String, enum: opt3},
        securityLightAvailability: {
            type: String,
            enum: opt2
        },
        securityLightStatus: {
            type: String,
            enum: opt3,
            require: function () {
                return this.securityLightAvailability === 'YES';
            },
            default: null,
        },
        floodLightAvailability: {
            type: String,
            enum: opt2,
        },
        floodLightStatus: {
            type: String,
            enum: opt3,
            require: function () {
                return this.floodLightAvailability === 'YES';
            },
            // allow empty string
            default: null,
        }
    },
    
    dcSystem: {
        // voltageReading: {
        //     type: Number,
        //     required: true,
        // },
        backUpBatteries: {
            type: String,
            enum: ['YES', 'NO', 'NOT APPLICABLE'],
            required: true,
        },
        // count: number and only required when backUpBatteries is YES
        count: {
            type: Number,
            required: function () {
                return this.dcSystem.backUpBatteries === 'YES';
            },
            // values are [4, 8, 12, 16, 24, 32, 48]
            enum: [0, 4, 8, 12, 16, 24, 32, 48],
            validate: {
                validator: function (value) {
                    return [0, 4, 8, 12, 16, 24, 32, 48].includes(value);
                },
                message: props => `Invalid count value: ${props.value}`
            },
            default: 0,
        },
        //status : OK, NOT OK, NOT APPLICABLE, only required if backUpBatteries is YES
        status: {
            type: String,
            enum: ['OK', 'NOT OK', 'NOT APPLICABLE'],
            required: function () {
                return this.dcSystem.backUpBatteries === 'YES';
            },
        },
        rectifierStatus: {
            type: String,
            enum: ['OK', 'NOT OK', 'NOT APPLICABLE'],
            required: true,
        },
    },
    
    otherPM: {
        feederCableStatus: {
            type: String,
            enum: ['OK', 'NOT OK', 'NOT APPLICABLE'],
            required: true,
        },
        changeOverSwitchStatus: {
            type: String,
            enum: ['OK', 'NOT OK', 'NOT APPLICABLE'],
            required: true,
        },
        earthingCableStatus: {
            type: String,
            enum: ['OK', 'NOT OK', 'NOT APPLICABLE'],
            required: true,
        },
        earthingStatus: {
            type: String,
            enum: ['OK', 'NOT OK', 'NOT APPLICABLE'],
            required: true,
        },
        fireExtinguisherStatus: {
            type: String,
            enum: ['OK', 'NOT OK', 'NOT APPLICABLE'],
            required: true,
        },
        
    },
    
    securityPM: {
        securityStatus: {type: String, enum: ['AVAILABLE', "NOT-AVAILABLE", 'NOT APPLICABLE']},
        siteAccess: {type: String, enum: ['LOCKED', "ACCESS-GRANTED", 'UN-AVAILABLE', 'NOT APPLICABLE']},
    },
    
    summary: {type: String, required: true},
};

const serviceOpsSchema = new mongoose.Schema(serviceOps, {timestamps: true});

const Servicing = mongoose.model('Servicing', serviceOpsSchema);

module.exports = Servicing;
