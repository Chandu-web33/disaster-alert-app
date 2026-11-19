const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Earthquake', 'Flood Warning', 'Wildfire', 'Super Typhoon',
               'Severe Flooding', 'Tropical Cyclone', 'Severe Storm',
               'Amazon Flooding', 'Landslide', 'Hurricane', 'Tornado']
    },
    icon: { type: String, default: 'fa-exclamation-triangle' },
    level: {
        type: String,
        required: true,
        enum: ['critical', 'warning', 'watch'],
        default: 'warning'
    },
    location: { type: String, required: true },
    description: { type: String, required: true },
    affected: { type: String, default: 'Unknown' },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    },
    active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
