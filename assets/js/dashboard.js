// User Dashboard JavaScript

let userMap;

// Sample user alerts
const userAlerts = [
    {
        type: 'Earthquake',
        icon: 'fa-house-damage',
        level: 'warning',
        location: 'Your Area',
        description: 'Minor tremors detected in your region. No immediate action required but stay alert.',
        time: '2 hours ago',
        distance: '15 km away'
    },
    {
        type: 'Flood Warning',
        icon: 'fa-water',
        level: 'watch',
        location: 'Nearby Region',
        description: 'Heavy rainfall expected in the next 24 hours. Monitor local weather updates.',
        time: '4 hours ago',
        distance: '30 km away'
    },
    {
        type: 'Storm Alert',
        icon: 'fa-wind',
        level: 'critical',
        location: 'Your City',
        description: 'Severe thunderstorm approaching your area. Seek indoor shelter immediately.',
        time: '30 minutes ago',
        distance: '5 km away'
    }
];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadUserInfo();
    loadUserAlerts();
    initUserMap();
    setupNavigation();
    
    console.log('✅ User Dashboard Initialized');
});

// Load user information
function loadUserInfo() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = user.name || user.email || 'User';
    
    document.getElementById('userName').textContent = userName.split(' ')[0];
    document.getElementById('userGreeting').textContent = userName.split(' ')[0];
}

// Load user alerts
function loadUserAlerts() {
    const container = document.getElementById('userAlertsList');
    if (!container) return;

    if (userAlerts.length === 0) {
        container.innerHTML = `
            <div class="no-alerts">
                <i class="fas fa-check-circle"></i>
                <p>No active alerts in your area. Stay safe!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = userAlerts.map(alert => `
        <div class="user-alert-card ${alert.level}">
            <div class="alert-header">
                <div class="alert-type">
                    <i class="fas ${alert.icon}"></i>
                    <h3>${alert.type}</h3>
                </div>
                <span class="alert-level ${alert.level}">${alert.level}</span>
            </div>
            <div class="alert-body">
                <p>${alert.description}</p>
            </div>
            <div class="alert-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${alert.distance}</span>
                <span><i class="fas fa-clock"></i> ${alert.time}</span>
            </div>
        </div>
    `).join('');
}

// Initialize user map
function initUserMap() {
    try {
        // Default to a central location (user's approximate location)
        userMap = L.map('user-map', {
            center: [40.7128, -74.0060], // New York as default
            zoom: 10,
            zoomControl: true,
            scrollWheelZoom: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(userMap);

        // Add user location marker
        L.marker([40.7128, -74.0060], {
            icon: L.divIcon({
                className: 'user-location-marker',
                html: '<i class="fas fa-user-circle"></i>',
                iconSize: [30, 30]
            })
        }).addTo(userMap).bindPopup('<strong>Your Location</strong>');

        // Add nearby alert markers
        const nearbyAlerts = [
            { coords: [40.7580, -73.9855], name: 'Storm Alert', severity: 'critical' },
            { coords: [40.6782, -73.9442], name: 'Earthquake Warning', severity: 'warning' },
            { coords: [40.7489, -74.0018], name: 'Flood Watch', severity: 'watch' }
        ];

        nearbyAlerts.forEach(alert => {
            const color = {
                critical: '#b91c1c',
                warning: '#f59e0b',
                watch: '#3b82f6'
            }[alert.severity];

            L.circleMarker(alert.coords, {
                radius: 10,
                fillColor: color,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(userMap).bindPopup(`<strong>${alert.name}</strong><br>Severity: ${alert.severity}`);
        });

        console.log('✅ User map initialized');
    } catch (error) {
        console.error('Error initializing user map:', error);
    }
}

// Setup navigation
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const target = this.getAttribute('href').substring(1);
            const element = document.getElementById(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Toggle profile menu
function toggleProfileMenu() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const profile = document.querySelector('.user-profile');
    const dropdown = document.getElementById('profileDropdown');
    
    if (dropdown && !profile.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Edit preferences
function editPreferences() {
    alert('📝 Edit Alert Preferences\n\nThis would open a settings panel where you can:\n\n' +
          '✓ Choose disaster types to monitor\n' +
          '✓ Set notification methods (SMS, Email, Push)\n' +
          '✓ Configure alert radius\n' +
          '✓ Set quiet hours\n' +
          '✓ Manage contact information');
}

// View history
function viewHistory() {
    alert('📜 Alert History\n\nThis would show:\n\n' +
          '✓ Past alerts you received\n' +
          '✓ Actions you took\n' +
          '✓ Alert statistics\n' +
          '✓ Download history report');
}

// Logout
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Check if user is logged in
const user = localStorage.getItem('user');
if (!user) {
    window.location.href = 'login.html';
}

console.log('👤 User Dashboard Ready');
