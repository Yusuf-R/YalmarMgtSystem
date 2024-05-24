const mongoose = require('mongoose');
const staffMethods = require('./methods/staffMethods');

const staff = {
    title: {type: String, enum: ['Miss', 'Mr', 'Mrs'], required: true},
    // staffName: {type: String, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    middleName: {type: String},
    dob: {type: String, default: Date, required: true},
    gender: {type: String, enum: ['Male', 'Female'], required: true},
    religion: {type: String, enum: ['Christianity', 'Islam', 'Others'], required: true},
    maritalStatus: {type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'], required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    country: {type: String, required: true},
    address: {type: String, required: true},
    stateOfOrigin: {type: String, required: true},
    lga: {type: String, required: true},
    stateOfResidence: {type: String, required: true},
    nextOfKin: {type: String, required: true},
    nextOfKinPhone: {type: String, required: true},
    nextOfKinRelationship: {type: String, required: true},
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
    employment: {
        type: String,
        enum: [
            'FullTime',
            'Contract',
            'Trainee',
        ],
        default: 'FullTime',
        required: true,
    },
    img: String,
    resetPwd: Boolean,
    resetTTL: Date,
    resetOTP: String,
};
const staffSchema = new mongoose.Schema(staff, {timestamps: true});

staffSchema.methods.generateOTP = staffMethods.generateOTP;
staffSchema.methods.validateOTP = staffMethods.validateOTP;
staffSchema.methods.resetPassword = staffMethods.resetPassword;
staffSchema.methods.changePassword = staffMethods.changePassword;
staffSchema.methods.updateProfile = staffMethods.updateProfile;

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
module.exports.staffSchema = staffSchema;
