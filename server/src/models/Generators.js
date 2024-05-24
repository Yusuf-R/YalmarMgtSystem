const mongoose = require('mongoose');

const generators = {
    type: {type: String, required: true},
    capacity: {type: Number, required: true},
    location: {type: String, required: true},
    status: {type: String, required: true},
    siteId: {type: mongoose.Schema.Types.ObjectId, required: true},
    img: String,
};

const generatorSchema = new mongoose.Schema(generators, {timestamps: true});

const Generator = mongoose.model('Generator', generatorSchema);

module.exports = Generator;
