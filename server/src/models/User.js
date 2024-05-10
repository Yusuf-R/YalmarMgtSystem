const mongoose = require('mongoose');
const userMethods = require('./methods/userMethods');

const user = {
    username: {type: String, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    middleName: {type: String},
    sex: {type: String, enum: ['Male', 'Female'], required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    country: {type: String},
    address: {type: String},
    stateOfOrigin: {type: String},
    lga: {type: String},
    stateOfResidence: {type: String},
    siteDesignation: {type: String},
    phoneNo: {type: String},
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
        default: 'User',
    },
    employment: {
        type: String,
        enum: [
            'FullTime',
            'Contract',
            'Trainee',
        ],
        default: 'FullTime',
    },
    img: String,
    resetPwd: Boolean,
    resetTTL: Date,
    resetOTP: String,
};
const userSchema = new mongoose.Schema(user, {timestamps: true});

userSchema.statics.createUser = userMethods.createUser;
userSchema.methods.generateOTP = userMethods.generateOTP;
userSchema.methods.validateOTP = userMethods.validateOTP;
userSchema.methods.resetPassword = userMethods.resetPassword;
userSchema.methods.changePassword = userMethods.changePassword;
userSchema.methods.updateProfile = userMethods.updateProfile;

const User = mongoose.model('User', userSchema);

module.exports = User;
