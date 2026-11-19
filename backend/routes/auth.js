const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { protect } = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ success: false, error: 'All fields are required' });

        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ success: false, error: 'Email already registered' });

        const user  = await User.create({ name, email, password });
        const token = jwt.sign({ id: user._id, role: user.role },
                                process.env.JWT_SECRET || 'secret',
                                { expiresIn: '7d' });

        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ success: false, error: 'Email and password required' });

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password)))
            return res.status(401).json({ success: false, error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role },
                                process.env.JWT_SECRET || 'secret',
                                { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/auth/me — current user
router.get('/me', protect, async (req, res) => {
    res.json({ success: true, user: req.user });
});

module.exports = router;
