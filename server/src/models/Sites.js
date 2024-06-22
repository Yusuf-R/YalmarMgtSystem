const mongoose = require('mongoose');


const site = {
    siteId: {type: String, required: true, unique: true},
    state: {type: String, required: true, default: 'KADUNA'},
    cluster: {type: String, enum: ['BIRNIN-GWARI', 'KADUNA-CENTRAL', 'ZARIA'], required: true},
    location: {type: String},
    type: {
        type: String, enum: ['TERMINAL', 'HUB', 'MAJOR-HUB', 'MGW', 'TERMINAL-HUB', 'BSC'],
        required: true,
        default: 'HUB'
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Deactivated'],
        default: 'Active',
        required: true
    },
    longitude: {type: Number, default: 0.00},
    latitude: {type: Number, default: 0.00},
    img: String,
}

const siteSchema = new mongoose.Schema(site, {timestamps: true});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;