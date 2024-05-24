const mongoose = require('mongoose');

const site = {
    siteId: {type: String, required: true},
    state: {type: String, required: true},
    cluster: {type: String, required: true},
    location: {type: String, required: true},
    type: {
        type: String, enum: ['BackBone', 'Hub'],
        required: true,
        default: 'Hub'
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
        required: true
    },
    longitude: {type: Number},
    latitude: {type: Number},
    img: String,
}


const siteSchema = new mongoose.Schema(site, {timestamps: true});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;