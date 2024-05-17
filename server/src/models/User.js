const mongoose = require('mongoose');
const userMethods = require('./methods/userMethods');

const user = {
    title: {type: String, enum: ['Miss', 'Mr', 'Mrs'], required: true},
    userName: {type: String, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    middleName: {type: String},
    dob: {type: Date, required: true},
    gender: {type: String, enum: ['Male', 'Female'], required: true},
    religion: {type: String, enum: ['Christianity', 'Islam', 'Others'], required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    // password: {type: String, required: true, unique: true},
    country: {type: String},
    address: {type: String},
    stateOfOrigin: {type: String},
    lga: {type: String},
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
const userSchema = new mongoose.Schema(user, {timestamps: true});

userSchema.statics.createUser = userMethods.createUser; // static, cos we're creating a new instance of a class object
userSchema.methods.generateOTP = userMethods.generateOTP;
userSchema.methods.validateOTP = userMethods.validateOTP;
userSchema.methods.resetPassword = userMethods.resetPassword;
userSchema.methods.changePassword = userMethods.changePassword;
userSchema.methods.updateProfile = userMethods.updateProfile;

const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.userSchema = userSchema;
