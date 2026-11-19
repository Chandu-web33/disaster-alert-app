const express = require('express');
const router  = express.Router();
const Alert   = require('../models/Alert');
const Subscription = require('../models/Subscription');

// GET /api/stats — dashboard statistics
router.get('/', async (req, res) => {
    try {
        const [totalAlerts, criticalAlerts, warningAlerts, watchAlerts,
               totalSubscribers, alerts] = await Promise.all([
            Alert.countDocuments({ active: true }),
            Alert.countDocuments({ active: true, level: 'critical' }),
            Alert.countDocuments({ active: true, level: 'warning' }),
            Alert.countDocuments({ active: true, level: 'watch' }),
            Subscription.countDocuments({ active: true }),
            Alert.find({ active: true }, 'affected location')
        ]);

        // Sum up affected people
        let totalAffected = 0;
        alerts.forEach(a => {
            if (!a.affected || a.affected === 'Unknown') return;
            const str = a.affected.replace('K', '').replace('M', '');
            const num = parseFloat(str);
            if (a.affected.includes('M')) totalAffected += num;
            else if (a.affected.includes('K')) totalAffected += num / 1000;
        });

        const affectedRegions = new Set(alerts.map(a => a.location.split(',')[0])).size;

        res.json({
            success: true,
            data: {
                totalAlerts,
                criticalAlerts,
                warningAlerts,
                watchAlerts,
                totalAffected: totalAffected.toFixed(1) + 'M',
                affectedRegions,
                totalSubscribers
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
