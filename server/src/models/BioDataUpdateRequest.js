const mongoose = require('mongoose');

const changeSchema = new mongoose.Schema({
    old: {type: mongoose.Schema.Types.Mixed, required: true},
    new: {type: mongoose.Schema.Types.Mixed, required: true}
});

const bioUpdateObject = {
    staffID: {type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true},
    email: {type: String, ref: 'Staff', required: true},
    changes: {
        type: Map,
        of: changeSchema,
        required: true
    },
    category: {type: String, enum: ['MyBioData-Update', 'Avatar-Confirmation'], default: 'MyBioData-Update'},
    status: {type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Requested'], default: 'Requested'},
    saveAsDraft: {type: Boolean, default: false},
}

const bioDataUpdateRequestSchema = new mongoose.Schema(bioUpdateObject, {timestamps: true});

const BioDataUpdateRequest = mongoose.model('BioDataUpdateRequest', bioDataUpdateRequestSchema);

module.exports = BioDataUpdateRequest;
