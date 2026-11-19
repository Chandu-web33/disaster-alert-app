const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name:               { type: String, required: true },
    email:              { type: String, required: true },
    phone:              { type: String, required: true },
    location:           { type: String, required: true },
    alertTypes:         { type: [String], default: ['earthquake', 'flood', 'hurricane', 'wildfire', 'severe-weather'] },
    notificationMethod: { type: String, enum: ['all', 'sms', 'email'], default: 'all' },
    active:             { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
