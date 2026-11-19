const express = require('express');
const router  = express.Router();
const Alert   = require('../models/Alert');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/alerts — list all active alerts (optional ?level=critical|warning|watch)
router.get('/', async (req, res) => {
    try {
        const filter = { active: true };
        if (req.query.level) filter.level = req.query.level;

        const alerts = await Alert.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, count: alerts.length, data: alerts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/alerts/:id — single alert
router.get('/:id', async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id);
        if (!alert) return res.status(404).json({ success: false, error: 'Alert not found' });
        res.json({ success: true, data: alert });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/alerts — create new alert (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
    try {
        const alert = await Alert.create(req.body);
        res.status(201).json({ success: true, data: alert });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// PUT /api/alerts/:id — update alert (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!alert) return res.status(404).json({ success: false, error: 'Alert not found' });
        res.json({ success: true, data: alert });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// DELETE /api/alerts/:id — soft-delete (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const alert = await Alert.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
        if (!alert) return res.status(404).json({ success: false, error: 'Alert not found' });
        res.json({ success: true, message: 'Alert deactivated' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
