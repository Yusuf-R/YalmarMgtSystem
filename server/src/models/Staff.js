const mongoose = require('mongoose');
const staffMethods = require('./methods/staffMethods');

// Function to generate full name
function generateFullName(doc) {
    const {title, firstName, middleName, lastName} = doc;
    let fullName = '';

    if (title) {
        fullName += `${title} `;
    }
    if (firstName) {
        fullName += `${firstName} `;
    }
    if (middleName) {
        fullName += `${middleName} `;
    }
    if (lastName) {
        fullName += lastName;
    }

    return fullName.trim();
}

const staff = {
    title: {type: String, enum: ['Miss', 'Mr', 'Mrs'], required: true},
    // staffName: {type: String, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    middleName: {type: String},
    fullName: {type: String}, // Added fullName field
    dob: {type: String, default: Date, required: true},
    gender: {type: String, enum: ['Male', 'Female'], required: true},
    religion: {type: String, enum: ['Christianity', 'Islam', 'Others'], required: true},
    maritalStatus: {type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'], required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    status: {type: String, enum: ['Active', 'Suspended', 'Terminated', 'Deceased', 'Pending'], default: 'Pending'},
    highestDegree: {
        type: String,
        enum: [
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
        ],
        required: true
    },
    classofDegree: {
        type: String,
        enum: [
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
        ],
        required: true
    },
    institution: {type: String, required: true},
    faculty: {type: String, required: true},
    courseOfStudy: {type: String, required: true},
    graduationDate: {type: String, default: Date, required: true},
    password: {type: String, required: true},
    country: {type: String, required: true},
    address: {type: String, required: true},
    stateOfOrigin: {type: String, required: true},
    lga: {type: String, required: true},
    stateOfResidence: {type: String, required: true},
    nextOfKin: {type: String, required: true},
    nextOfKinPhone: {type: String, required: true},
    nextOfKinRelationship: {type: String, required: true},
    employmentDate: {type: String, default: Date, required: true},
    role: {
        type: String,
        enum: [
            'Admin',
            'SuperAdmin',
            'User',
            'Accountant',
            'Generator Technician',
            'Procurement Officer',
            'Lawyer',
            'Driver',
            'Field Supervisor',
            'Security Officer',
        ],
        required: true,
        validate: {
            validator: function (value) {
                if (value === 'Field Supervisor' || value === 'Generator Technician') {
                    return this.cluster && this.siteID && this.siteState;
                }
                return true;
            },
            message: 'Cluster, siteID, and siteState are required for Field Supervisor or Generator Technician roles',
        },
    },
    cluster: {
        type: String,
        required: function () {
            return this.role === 'Field Supervisor' || this.role === 'Generator Technician';
        },
    },
    siteID: {
        type: Array,
        required: function () {
            return this.role === 'Field Supervisor' || this.role === 'Generator Technician';
        },
    },
    siteState: {
        type: String,
        required: function () {
            return this.role === 'Field Supervisor' || this.role === 'Generator Technician';
        },
    },
    employmentType: {
        type: String,
        enum: [
            'FullTime',
            'Contract',
            'Trainee',
        ],
        default: 'FullTime',
        required: true,
    },
    imgURL: {type: String, default: ''},
    imgConfirmation: {type: String, enum: ['Pending', 'Requested', 'Accepted', 'Rejected'], default: 'Accepted'},
    ctrlFlag: {type: Boolean, default: false},
    leaveCredit: {type: Number, default: 25},
    resetPwd: Boolean,
    resetTTL: Date,
    resetOTP: String,
};
const staffSchema = new mongoose.Schema(staff, {timestamps: true});

// Pre-save hook to generate fullName before saving
staffSchema.pre('save', function (next) {
    this.fullName = generateFullName(this);
    next();
});

// Pre-update hook to ensure fullName is updated on relevant fields change
staffSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.title || update.firstName || update.middleName || update.lastName) {
        const newFullName = generateFullName(update);
        this.setUpdate({...update, fullName: newFullName});
    }
    next();
});

staffSchema.methods.generateOTP = staffMethods.generateOTP;
staffSchema.methods.validateOTP = staffMethods.validateOTP;
staffSchema.methods.resetPassword = staffMethods.resetPassword;
staffSchema.methods.changePassword = staffMethods.changePassword;

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
module.exports.staffSchema = staffSchema;
