/* eslint-disable jest/require-hook */
const mongoose = require('mongoose');
// EXP = 30days
const EXP = 60 * 60 * 24 * 30; // 30days

const refreshToken = {
    staffId: {type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true, unique: true},
    token: {type: String, required: true, unique: true},
};

const refreshSchema = new mongoose.Schema(refreshToken, {timestamps: true});
refreshSchema.index({createdAt: 1}, {expireAfterSeconds: EXP});

const RefreshToken = mongoose.model('RefreshToken', refreshSchema);

module.exports = RefreshToken;
