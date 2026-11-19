const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/users — list all users (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, count: users.length, data: users });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/users/public — public stats (no auth required)
router.get('/public', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const adminCount = await User.countDocuments({ role: 'admin' });
        const activeUsers = await User.countDocuments({ active: true });
        
        res.json({ 
            success: true, 
            data: {
                totalUsers,
                adminCount,
                regularUsers: totalUsers - adminCount,
                activeUsers
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
