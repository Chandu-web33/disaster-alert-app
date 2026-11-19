const Alert = require('../models/Alert');
const User  = require('../models/User');

const sampleAlerts = [
    {
        type: 'Earthquake', icon: 'fa-house-damage', level: 'critical',
        location: 'Istanbul, Turkey',
        description: 'Magnitude 6.5 earthquake on North Anatolian Fault. Immediate emergency response activated.',
        affected: '2M', coordinates: { lat: 41.0082, lng: 28.9784 }
    },
    {
        type: 'Flood Warning', icon: 'fa-water', level: 'critical',
        location: 'Kolkata, India',
        description: 'Monsoon flooding causing widespread damage. Multiple areas submerged.',
        affected: '2.5M', coordinates: { lat: 22.5726, lng: 88.3639 }
    },
    {
        type: 'Wildfire', icon: 'fa-fire-alt', level: 'critical',
        location: 'Sydney, Australia',
        description: 'Bushfires burning out of control. Total fire ban in effect. Evacuations ongoing.',
        affected: '500K', coordinates: { lat: -33.8688, lng: 151.2093 }
    },
    {
        type: 'Super Typhoon', icon: 'fa-wind', level: 'critical',
        location: 'Manila, Philippines',
        description: 'Category 4 Super Typhoon approaching. Mandatory evacuations in coastal areas.',
        affected: '3M', coordinates: { lat: 14.5995, lng: 120.9842 }
    },
    {
        type: 'Severe Flooding', icon: 'fa-water', level: 'critical',
        location: 'Lagos, Nigeria',
        description: 'Coastal flooding affecting multiple neighborhoods. Emergency evacuations in progress.',
        affected: '700K', coordinates: { lat: 6.5244, lng: 3.3792 }
    },
    {
        type: 'Tropical Cyclone', icon: 'fa-tornado', level: 'critical',
        location: 'Suva, Fiji',
        description: 'Category 3 Cyclone making landfall. Storm surge and heavy rain expected.',
        affected: '200K', coordinates: { lat: -18.1416, lng: 178.4419 }
    },
    {
        type: 'Earthquake', icon: 'fa-house-damage', level: 'warning',
        location: 'Tokyo, Japan',
        description: 'Magnitude 6.0 earthquake detected. Tsunami warning cancelled. Aftershocks possible.',
        affected: '5M', coordinates: { lat: 35.6762, lng: 139.6503 }
    },
    {
        type: 'Wildfire', icon: 'fa-fire-alt', level: 'critical',
        location: 'Madrid, Spain',
        description: 'Multiple wildfires burning due to extreme heatwave. Evacuation orders issued.',
        affected: '50K', coordinates: { lat: 40.4168, lng: -3.7038 }
    },
    {
        type: 'Severe Storm', icon: 'fa-bolt', level: 'warning',
        location: 'London, UK',
        description: 'Severe windstorm approaching. Wind speeds up to 100 km/h expected.',
        affected: '3M', coordinates: { lat: 51.5074, lng: -0.1278 }
    },
    {
        type: 'Amazon Flooding', icon: 'fa-water', level: 'critical',
        location: 'Manaus, Brazil',
        description: 'Amazon River reaching historic flood levels. Multiple communities at risk.',
        affected: '600K', coordinates: { lat: -3.1190, lng: -60.0217 }
    }
];

async function seedDatabase() {
    try {
        const alertCount = await Alert.countDocuments();
        if (alertCount === 0) {
            await Alert.insertMany(sampleAlerts);
            console.log(`🌱 Seeded ${sampleAlerts.length} sample alerts`);
        }

        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            await User.create({
                name:     'Admin',
                email:    'admin@disasteralert.com',
                password: 'admin123',
                role:     'admin'
            });
            console.log('🌱 Seeded default admin user (admin@disasteralert.com / admin123)');
        }
    } catch (err) {
        console.error('Seed error:', err.message);
    }
}

module.exports = { seedDatabase };
