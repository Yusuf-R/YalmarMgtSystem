// models/Image.js
const mongoose = require('mongoose');

const image = {
    url: {type: String, required: true},
    referenceCount: {type: Number, default: 1}, // Count of how many incidents are using this image
};

const imageSchema = new mongoose.Schema(image, {timestamps: true});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
