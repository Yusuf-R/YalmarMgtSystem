const mongoose = require('mongoose');
const userMethods = require('./methods/userMethods');

const user = {
  username: { type: String, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String },
  stateOfOrigin: { type: String },
  lga: { type: String },
  stateOfResidence: { type: String },
  phoneNo: { type: String },
  isAdmin: { type: Boolean, default: false },
  isSuperAdmin: { type: Boolean, default: false },
  ninID: { type: String },
  img: String,
  resetPwd: Boolean,
  resetTTL: Date,
  resetOTP: String,
};
const userSchema = new mongoose.Schema(user, { timestamps: true });

userSchema.statics.createUser = userMethods.createUser;
userSchema.methods.generateOTP = userMethods.generateOTP;
userSchema.methods.validateOTP = userMethods.validateOTP;
userSchema.methods.resetPassword = userMethods.resetPassword;
userSchema.methods.changePassword = userMethods.changePassword;
userSchema.methods.updateProfile = userMethods.updateProfile;

const User = mongoose.model('User', userSchema);

module.exports = User;
