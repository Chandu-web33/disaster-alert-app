const express      = require('express');
const router       = express.Router();
const Subscription = require('../models/Subscription');
const { protect, adminOnly } = require('../middleware/auth');

// POST /api/subscriptions — subscribe to alerts
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, location, alertTypes, notificationMethod } = req.body;
        if (!name || !email || !phone || !location)
            return res.status(400).json({ success: false, error: 'name, email, phone and location are required' });

        // Upsert by email so a user can update preferences
        const sub = await Subscription.findOneAndUpdate(
            { email },
            { name, phone, location, alertTypes, notificationMethod, active: true },
            { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
        );

        res.status(201).json({ success: true, message: 'Subscribed successfully!', data: sub });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// GET /api/subscriptions — list all (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
    try {
        const subs = await Subscription.find({ active: true }).sort({ createdAt: -1 });
        res.json({ success: true, count: subs.length, data: subs });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE /api/subscriptions/:email — unsubscribe
router.delete('/:email', async (req, res) => {
    try {
        await Subscription.findOneAndUpdate({ email: req.params.email }, { active: false });
        res.json({ success: true, message: 'Unsubscribed successfully' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
