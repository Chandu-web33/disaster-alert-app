const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const alertRoutes      = require('./routes/alerts');
const authRoutes       = require('./routes/auth');
const subscribeRoutes  = require('./routes/subscriptions');
const statsRoutes      = require('./routes/stats');
const userRoutes       = require('./routes/users');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Security & middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global rate-limiter (100 req / 15 min per IP)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// ── Database ───────────────────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/disasteralert';

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✅ MongoDB connected');
        // Seed sample data on first run
        const { seedDatabase } = require('./utils/seed');
        await seedDatabase();
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));

// ── Routes ─────────────────────────────────────────────────────────────────────
app.use('/api/alerts',        alertRoutes);
app.use('/api/auth',          authRoutes);
app.use('/api/subscriptions', subscribeRoutes);
app.use('/api/stats',         statsRoutes);
app.use('/api/users',         userRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'disaster-alert-api',
        timestamp: new Date().toISOString(),
        db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Disaster Alert API running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});
