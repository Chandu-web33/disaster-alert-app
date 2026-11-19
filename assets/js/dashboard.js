// User Dashboard JavaScript - Connected to Backend API

const API_BASE = 'http://localhost:5000/api';
let userMap;
let userAlerts = [];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async function() {
    // Check authentication first
    const userData = localStorage.getItem('dasUser');
    if (!userData) {
        window.location.href = 'login.html';
        return;
    }

    loadUserInfo();
    await loadUserAlerts();
    await loadDashboardStats();
    initUserMap();
    setupNavigation();
    
    console.log('✅ User Dashboard Initialized');
});

// Load user information
function loadUserInfo() {
    const user = JSON.parse(localStorage.getItem('dasUser') || '{}');
    const userName = user.name || user.email || 'User';
    
    const userNameEl = document.getElementById('userName');
    const userGreetingEl = document.getElementById('userGreeting');
    
    if (userNameEl) userNameEl.textContent = userName.split(' ')[0];
    if (userGreetingEl) userGreetingEl.textContent = userName.split(' ')[0];
    
    // Update avatar
    const avatar = document.querySelector('.user-profile img');
    if (avatar) {
        avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=dc2626&color=fff&bold=true`;
    }
}

// Load dashboard stats from API
async function loadDashboardStats() {
    try {
        const response = await fetch(`${API_BASE}/stats`);
        const data = await response.json();
        
        if (data.success) {
            // Update quick stats
            const stats = data.data;
            const criticalEl = document.getElementById('criticalCount');
            const totalEl = document.getElementById('totalCount');
            
            if (criticalEl) criticalEl.textContent = stats.criticalAlerts || 0;
            if (totalEl) totalEl.textContent = stats.totalAlerts || 0;
        }
    } catch (err) {
        console.error('Failed to load stats:', err);
    }
}

// Load user alerts from API
async function loadUserAlerts() {
    const container = document.getElementById('userAlertsList');
    if (!container) return;

    try {
        const response = await fetch(`${API_BASE}/alerts?level=critical`);
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
            userAlerts = data.data.slice(0, 5); // Show first 5 alerts
            
            container.innerHTML = userAlerts.map(alert => {
                const timeAgo = calculateTimeAgo(alert.createdAt);
                return `
                    <div class="user-alert-card ${alert.level}">
                        <div class="alert-header">
                            <div class="alert-type">
                                <i class="fas ${alert.icon}"></i>
                                <h3>${alert.type}</h3>
                            </div>
                            <span class="alert-level ${alert.level}">${alert.level}</span>
                        </div>
                        <div class="alert-body">
                            <p><i class="fas fa-map-marker-alt"></i> <strong>${alert.location}</strong></p>
                            <p>${alert.description}</p>
                        </div>
                        <div class="alert-meta">
                            <span><i class="fas fa-users"></i> ${alert.affected} affected</span>
                            <span><i class="fas fa-clock"></i> ${timeAgo}</span>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            container.innerHTML = `
                <div class="no-alerts">
                    <i class="fas fa-check-circle"></i>
                    <p>No active critical alerts at this time. Stay safe!</p>
                </div>
            `;
        }
    } catch (err) {
        console.error('Failed to load alerts:', err);
        container.innerHTML = `
            <div class="no-alerts">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Unable to load alerts. Please check your connection.</p>
            </div>
        `;
    }
}

// Calculate time ago from ISO timestamp
function calculateTimeAgo(isoString) {
    const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
}

// Initialize user map with real data
async function initUserMap() {
    try {
        // Default to a central location
        const defaultLat = 40.7128;
        const defaultLng = -74.0060;
        
        userMap = L.map('user-map', {
            center: [defaultLat, defaultLng],
            zoom: 4,
            zoomControl: true,
            scrollWheelZoom: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(userMap);

        // Add user location marker
        L.marker([defaultLat, defaultLng], {
            icon: L.divIcon({
                className: 'user-location-marker',
                html: '<i class="fas fa-user-circle" style="color: #0066ff; font-size: 30px;"></i>',
                iconSize: [30, 30]
            })
        }).addTo(userMap).bindPopup('<strong>Your Location</strong><br>New York, USA');

        // Fetch and display alerts on map
        const response = await fetch(`${API_BASE}/alerts`);
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
            data.data.forEach(alert => {
                if (alert.coordinates && alert.coordinates.lat && alert.coordinates.lng) {
                    const color = {
                        critical: '#dc2626',
                        warning: '#f59e0b',
                        watch: '#3b82f6'
                    }[alert.level] || '#6b7280';

                    // Get icon based on disaster type
                    const getDisasterIcon = (type) => {
                        const iconMap = {
                            'Wildfire': 'fa-fire',
                            'Wildfire Warning': 'fa-fire',
                            'Flood': 'fa-water',
                            'Flood Warning': 'fa-water',
                            'Amazon Flooding': 'fa-water',
                            'Severe Flooding': 'fa-water',
                            'Earthquake': 'fa-house-damage',
                            'Tsunami': 'fa-waves',
                            'Hurricane': 'fa-wind',
                            'Tropical Cyclone': 'fa-wind',
                            'Super Typhoon': 'fa-wind',
                            'Tornado': 'fa-tornado',
                            'Storm': 'fa-bolt',
                            'Severe Weather': 'fa-cloud-bolt',
                            'Landslide': 'fa-mountain',
                            'Volcanic Eruption': 'fa-volcano',
                            'Heatwave': 'fa-temperature-high',
                            'Blizzard': 'fa-snowflake',
                            'Drought': 'fa-sun'
                        };
                        
                        // Find matching icon
                        for (const [key, icon] of Object.entries(iconMap)) {
                            if (type.includes(key)) return icon;
                        }
                        return 'fa-exclamation-triangle'; // Default icon
                    };

                    const iconClass = getDisasterIcon(alert.type);

                    // Create custom HTML icon marker
                    const customIcon = L.divIcon({
                        className: 'custom-disaster-marker',
                        html: `
                            <div class="marker-container" style="position: relative;">
                                <div class="marker-icon" style="
                                    background: ${color};
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 50%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    border: 3px solid white;
                                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                                    animation: ${alert.level === 'critical' ? 'markerPulse 2s ease-in-out infinite' : 'none'};
                                ">
                                    <i class="fas ${iconClass}" style="
                                        color: white;
                                        font-size: 20px;
                                    "></i>
                                </div>
                            </div>
                        `,
                        iconSize: [40, 40],
                        iconAnchor: [20, 20],
                        popupAnchor: [0, -20]
                    });

                    // Create custom popup content with detailed information
                    const popupContent = `
                        <div style="min-width: 250px; font-family: 'Segoe UI', sans-serif;">
                            <div style="border-bottom: 2px solid ${color}; padding-bottom: 10px; margin-bottom: 10px;">
                                <h3 style="margin: 0; color: ${color}; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                                    <i class="fas ${iconClass}"></i>
                                    ${alert.type}
                                </h3>
                                <div style="background: ${color}; color: white; display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; margin-top: 5px;">
                                    ${alert.level.toUpperCase()}
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 12px;">
                                <p style="margin: 5px 0; display: flex; align-items: center; gap: 8px; color: #1e293b;">
                                    <i class="fas fa-map-marker-alt" style="color: ${color}; width: 16px;"></i>
                                    <strong>${alert.location}</strong>
                                </p>
                                <p style="margin: 8px 0 8px 24px; color: #64748b; font-size: 0.9rem; line-height: 1.4;">
                                    ${alert.description}
                                </p>
                            </div>

                            <div style="background: #f1f5f9; padding: 10px; border-radius: 8px; margin: 10px 0;">
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                    <div>
                                        <p style="margin: 0; font-size: 0.8rem; color: #64748b;">
                                            <i class="fas fa-users" style="color: ${color};"></i> Affected
                                        </p>
                                        <p style="margin: 3px 0 0 0; font-weight: bold; color: #1e293b;">
                                            ${alert.affected || 'Unknown'}
                                        </p>
                                    </div>
                                    <div>
                                        <p style="margin: 0; font-size: 0.8rem; color: #64748b;">
                                            <i class="fas fa-crosshairs" style="color: ${color};"></i> Range
                                        </p>
                                        <p style="margin: 3px 0 0 0; font-weight: bold; color: #1e293b;">
                                            ${alert.magnitude || alert.intensity || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div style="border-top: 1px solid #e2e8f0; padding-top: 8px; margin-top: 8px;">
                                <p style="margin: 3px 0; font-size: 0.85rem; color: #64748b; display: flex; align-items: center; gap: 6px;">
                                    <i class="fas fa-clock" style="color: ${color};"></i>
                                    ${calculateTimeAgo(alert.createdAt)}
                                </p>
                                ${alert.coordinates ? `
                                <p style="margin: 3px 0; font-size: 0.85rem; color: #64748b; display: flex; align-items: center; gap: 6px;">
                                    <i class="fas fa-map" style="color: ${color};"></i>
                                    ${alert.coordinates.lat.toFixed(4)}°N, ${alert.coordinates.lng.toFixed(4)}°E
                                </p>
                                ` : ''}
                            </div>

                            ${alert.active ? `
                            <div style="margin-top: 10px; padding: 8px; background: ${color}15; border-left: 3px solid ${color}; border-radius: 4px;">
                                <p style="margin: 0; font-size: 0.85rem; color: ${color}; font-weight: 600;">
                                    <i class="fas fa-exclamation-circle"></i> Active Alert
                                </p>
                            </div>
                            ` : ''}
                        </div>
                    `;

                    // Create marker with custom icon
                    const marker = L.marker([alert.coordinates.lat, alert.coordinates.lng], {
                        icon: customIcon
                    }).addTo(userMap);

                    // Bind detailed popup
                    marker.bindPopup(popupContent, {
                        maxWidth: 300,
                        className: 'custom-popup'
                    });
                }
            });
        }

        console.log('✅ User map initialized with real data');
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
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                if (section.className.includes(target) || section.id === target) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });
}

// Toggle profile menu
function toggleProfileMenu() {
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) dropdown.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const profile = document.querySelector('.user-profile');
    const dropdown = document.getElementById('profileDropdown');
    
    if (dropdown && profile && !profile.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Edit preferences
function editPreferences() {
    alert('📝 Edit Alert Preferences\n\n' +
          'Configure your notification settings:\n\n' +
          '✓ Select disaster types to monitor\n' +
          '✓ Set notification methods (SMS, Email, Push)\n' +
          '✓ Configure alert radius around your location\n' +
          '✓ Set quiet hours\n' +
          '✓ Update contact information\n\n' +
          'Feature coming soon!');
}

// View history
function viewHistory() {
    alert('📜 Alert History\n\n' +
          'View your notification history:\n\n' +
          '✓ Past alerts you received\n' +
          '✓ Your responses and actions\n' +
          '✓ Monthly statistics\n' +
          '✓ Download reports\n\n' +
          'Feature coming soon!');
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('dasToken');
        localStorage.removeItem('dasUser');
        window.location.href = 'login.html';
    }
}

// Refresh data every 30 seconds
setInterval(() => {
    loadUserAlerts();
    loadDashboardStats();
}, 30000);

console.log('👤 User Dashboard Ready - Connected to API');
