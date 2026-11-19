const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ success: false, error: 'Not authorized, no token' });

    try {
        const token   = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user      = await User.findById(decoded.id).select('-password');
        if (!req.user)
            return res.status(401).json({ success: false, error: 'User not found' });
        next();
    } catch (err) {
        res.status(401).json({ success: false, error: 'Token invalid or expired' });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') return next();
    res.status(403).json({ success: false, error: 'Admin access required' });
};

module.exports = { protect, adminOnly };
