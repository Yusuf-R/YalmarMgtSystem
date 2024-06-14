const mongoose = require('mongoose');

const fuelOps = {
    site_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true},
    siteId: {type: String, required: true},
    state: {type: String, required: true, default: 'KADUNA'},
    cluster: {type: String, enum: ['BIRNIN-GWARI', 'KADUNA-CENTRAL', 'ZARIA'], required: true},
    location: {type: String},
    type: {
        type: String, enum: ['TERMINAL', 'HUB', 'MAJOR-HUB', 'MGW', 'TERMINAL-HUB', 'BSC'],
        required: true,
        default: 'HUB'
    },
    qtyInitial: {type: Number, required: true, default: 0},
    qtySupplied: {type: Number, required: true},
    qtyNew: {type: Number, required: true},
    dateSupplied: {type: String, required: true, default: Date},
    nextDueDate: {type: String, required: true, default: Date},
    duration: {type: Number, required: true, default: 0},
    cpd: {type: Number, required: true, default: 50},
};

const fuelOpsSchema = new mongoose.Schema(fuelOps, {timestamps: true});

const Fuelling = mongoose.model('Fuelling', fuelOpsSchema);

module.exports = Fuelling;
