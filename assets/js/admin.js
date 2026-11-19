// Admin Dashboard JavaScript - Connected to Backend API

const API_BASE = 'http://localhost:5000/api';
let adminMap;
let alertChart;
let adminAlerts = [];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async function() {
    // Check admin authentication
    const userData = localStorage.getItem('dasUser');
    if (!userData) {
        window.location.href = 'login.html';
        return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'admin') {
        alert('Admin access required');
        window.location.href = 'login.html';
        return;
    }

    await loadDashboardData();
    initAdminMap();
    initChart();
    setupNavigation();
    setupMobileMenu();
    
    // Auto-refresh every 30 seconds
    setInterval(loadDashboardData, 30000);
    
    console.log('✅ Admin Dashboard Initialized');
});

// Load all dashboard data from API
async function loadDashboardData() {
    try {
        const [alertsRes, statsRes] = await Promise.all([
            fetch(`${API_BASE}/alerts`),
            fetch(`${API_BASE}/stats`)
        ]);

        const alertsData = await alertsRes.json();
        const statsData = await statsRes.json();

        if (alertsData.success) {
            adminAlerts = alertsData.data;
            loadAlerts();
            loadRecentActivity(alertsData.data);
        }

        if (statsData.success) {
            updateStats(statsData.data);
        }
    } catch (err) {
        console.error('Failed to load dashboard data:', err);
    }
}

// Load recent activity based on alerts
function loadRecentActivity(alerts) {
    const container = document.getElementById('activityList');
    if (!container) return;

    // Create activity items from recent alerts
    const activities = [];
    
    // Add alert creation activities
    alerts.slice(0, 8).forEach(alert => {
        activities.push({
            icon: 'fas fa-exclamation-triangle',
            iconColor: alert.level === 'critical' ? '#dc2626' : alert.level === 'warning' ? '#f59e0b' : '#3b82f6',
            title: `New ${alert.level} alert created`,
            description: `${alert.type} in ${alert.location}`,
            time: calculateTimeAgo(alert.createdAt)
        });
    });

    // Add some system activities
    const systemActivities = [
        {
            icon: 'fas fa-users',
            iconColor: '#10b981',
            title: 'User registrations increased',
            description: '234 new users joined this week',
            time: '2 hours ago'
        },
        {
            icon: 'fas fa-bell',
            iconColor: '#06b6d4',
            title: 'Notifications sent',
            description: '50,000 notifications delivered today',
            time: '4 hours ago'
        },
        {
            icon: 'fas fa-shield-alt',
            iconColor: '#7c3aed',
            title: 'System update completed',
            description: 'Security patches applied successfully',
            time: '1 day ago'
        }
    ];

    // Merge and limit to 10 items
    const allActivities = [...activities, ...systemActivities].slice(0, 10);

    if (allActivities.length === 0) {
        container.innerHTML = '<p style="color: #94a3b8; text-align: center; padding: 20px;">No recent activity</p>';
        return;
    }

    container.innerHTML = allActivities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon" style="background: ${activity.iconColor}20; color: ${activity.iconColor};">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-details">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <small style="color: #64748b; font-size: 0.8rem;">${activity.time}</small>
            </div>
        </div>
    `).join('');
}

// Update dashboard statistics
function updateStats(stats) {
    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    setVal('admin-total-alerts', stats.totalAlerts || 0);
    setVal('admin-critical-alerts', stats.criticalAlerts || 0);
    setVal('admin-total-users', stats.totalSubscribers || 0);
    setVal('admin-affected-people', stats.totalAffected || '0M');
}

// Load alerts
function loadAlerts() {
    const container = document.getElementById('adminAlertList');
    if (!container) return;

    if (adminAlerts.length === 0) {
        container.innerHTML = '<p style="color: #94a3b8; text-align: center; padding: 20px;">No alerts found</p>';
        return;
    }

    container.innerHTML = adminAlerts.slice(0, 5).map(alert => {
        const timeAgo = calculateTimeAgo(alert.createdAt);
        return `
            <div class="alert-item ${alert.level}">
                <div class="alert-details">
                    <h4>${alert.type} - ${alert.location}</h4>
                    <p>${timeAgo} • Status: ${alert.active ? 'active' : 'inactive'}</p>
                </div>
                <div class="alert-actions">
                    <button onclick="editAlert('${alert._id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="viewAlert('${alert._id}')" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="deleteAlert('${alert._id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Calculate time ago
function calculateTimeAgo(isoString) {
    const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
}

// Initialize admin map with real data
async function initAdminMap() {
    try {
        adminMap = L.map('admin-map', {
            center: [20, 0],
            zoom: 2,
            zoomControl: true,
            scrollWheelZoom: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(adminMap);

        // Add markers from real data
        adminAlerts.forEach(alert => {
            if (alert.coordinates && alert.coordinates.lat && alert.coordinates.lng) {
                const color = {
                    critical: '#b91c1c',
                    warning: '#f59e0b',
                    watch: '#3b82f6'
                }[alert.level] || '#6b7280';

                L.circleMarker([alert.coordinates.lat, alert.coordinates.lng], {
                    radius: 8,
                    fillColor: color,
                    color: '#fff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                }).addTo(adminMap)
                  .bindPopup(`<strong>${alert.type}</strong><br>${alert.location}<br>Severity: ${alert.level}`);
            }
        });

        console.log('✅ Admin map initialized');
    } catch (error) {
        console.error('Error initializing admin map:', error);
    }
}

// Initialize chart
function initChart() {
    const ctx = document.getElementById('alertChart');
    if (!ctx) return;

    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Critical',
                data: [3, 5, 4, 7, 6, 8, 10],
                backgroundColor: 'rgba(220, 38, 38, 0.2)',
                borderColor: '#dc2626',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: 'Warning',
                data: [5, 7, 6, 8, 7, 9, 10],
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                borderColor: '#f59e0b',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: 'Watch',
                data: [2, 3, 4, 3, 4, 3, 4],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: '#3b82f6',
                borderWidth: 2,
                tension: 0.4
            }
        ]
    };

    alertChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#cbd5e1' } }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#cbd5e1' }
                },
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#cbd5e1' }
                }
            }
        }
    });
}

// Setup navigation
function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (mobileBtn && sidebar) {
        mobileBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
}

// ── CREATE NEW ALERT ──
function showCreateAlert() {
    const modal = document.getElementById('createAlertModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Handle create alert form submission
const createAlertForm = document.getElementById('createAlertForm');
if (createAlertForm) {
    createAlertForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const token = localStorage.getItem('dasToken');
        if (!token) {
            alert('❌ Authentication required. Please login as admin.');
            window.location.href = 'login.html';
            return;
        }

        const formData = new FormData(this);
        
        // Get all form values
        const type = formData.get('type');
        const severity = formData.get('severity');
        const location = formData.get('location');
        const description = formData.get('description');
        const affected = formData.get('affected') || 'Unknown';
        
        // Validate required fields
        if (!type || !severity || !location || !description) {
            alert('❌ Please fill in all required fields:\n- Disaster Type\n- Severity Level\n- Location\n- Description');
            return;
        }
        
        // Parse coordinates if provided
        let coordinates = { lat: 0, lng: 0 };
        const coordsStr = formData.get('coordinates');
        if (coordsStr && coordsStr.includes(',')) {
            const [lat, lng] = coordsStr.split(',').map(s => parseFloat(s.trim()));
            if (!isNaN(lat) && !isNaN(lng)) {
                coordinates = { lat, lng };
            }
        }

        const alertData = {
            type: type,
            level: severity,
            location: location,
            description: description,
            affected: affected,
            icon: getIconForType(type),
            coordinates: coordinates,
            active: true
        };

        console.log('📤 Sending alert data:', alertData);

        try {
            const response = await fetch(`${API_BASE}/alerts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(alertData)
            });

            const data = await response.json();
            console.log('📥 Response:', data);
            
            if (data.success) {
                alert('✅ Alert Created Successfully!\n\nThe alert is now visible on both admin and user dashboards.');
                closeModal('createAlertModal');
                this.reset();
                await loadDashboardData();
            } else {
                alert('❌ Failed to create alert:\n\n' + (data.error || 'Unknown error') + '\n\nPlease check the console for details.');
                console.error('Backend error:', data);
            }
        } catch (err) {
            console.error('Create alert error:', err);
            alert('❌ Connection error:\n' + err.message + '\n\nMake sure:\n1. Backend is running on port 5000\n2. You are logged in as admin\n3. CORS is enabled');
        }
    });
}

// Helper function to get icon based on disaster type
function getIconForType(type) {
    const iconMap = {
        'Earthquake': 'fa-house-damage',
        'Flood Warning': 'fa-water',
        'Wildfire': 'fa-fire-alt',
        'Super Typhoon': 'fa-wind',
        'Tornado': 'fa-tornado',
        'Tsunami': 'fa-water',
        'Severe Storm': 'fa-bolt',
        'Hurricane': 'fa-wind',
        'Landslide': 'fa-mountain'
    };
    return iconMap[type] || 'fa-exclamation-triangle';
}

// ── SEND NOTIFICATION ──
function showSendNotification() {
    alert('📧 Send Notification\n\nNotifications would be sent to users based on:\n- Alert location\n- User subscription preferences\n- Severity level\n\nFeature: Integrated with email/SMS services');
}

// ── EXPORT REPORT ──
function exportReport() {
    const reportData = {
        totalAlerts: adminAlerts.length,
        criticalAlerts: adminAlerts.filter(a => a.level === 'critical').length,
        warningAlerts: adminAlerts.filter(a => a.level === 'warning').length,
        watchAlerts: adminAlerts.filter(a => a.level === 'watch').length,
        generatedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `disaster-alerts-report-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('✅ Report exported successfully!');
}

// ── REFRESH DATA ──
async function refreshDashboard() {
    alert('🔄 Refreshing dashboard data...');
    await loadDashboardData();
    if (adminMap) {
        adminMap.eachLayer(layer => {
            if (layer instanceof L.CircleMarker) {
                adminMap.removeLayer(layer);
            }
        });
        await initAdminMap();
    }
    alert('✅ Dashboard refreshed successfully!');
}

// ── ALERT ACTIONS ──
function editAlert(id) {
    const alert = adminAlerts.find(a => a._id === id);
    if (alert) {
        // Pre-fill form with alert data
        showCreateAlert();
        // In a real implementation, populate the form fields
        console.log('Edit alert:', alert);
    }
}

function viewAlert(id) {
    const alert = adminAlerts.find(a => a._id === id);
    if (alert) {
        const details = `
🚨 ALERT DETAILS

Type: ${alert.type}
Location: ${alert.location}
Severity: ${alert.level.toUpperCase()}
Description: ${alert.description}
Affected: ${alert.affected}
Status: ${alert.active ? 'ACTIVE' : 'Inactive'}
Created: ${new Date(alert.createdAt).toLocaleString()}
        `;
        alert(details);
    }
}

async function deleteAlert(id) {
    if (!confirm('⚠️ Are you sure you want to delete this alert?\n\nThis action cannot be undone.')) {
        return;
    }

    const token = localStorage.getItem('dasToken');
    if (!token) {
        alert('Authentication required');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/alerts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        
        if (data.success) {
            alert('✅ Alert deleted successfully!');
            await loadDashboardData();
        } else {
            alert('❌ Failed to delete alert: ' + (data.error || 'Unknown error'));
        }
    } catch (err) {
        alert('❌ Connection error: ' + err.message);
    }
}

// Other admin functions
function viewAllAlerts() {
    window.location.href = '#alerts';
}

function toggleFullMap() {
    const mapContainer = document.querySelector('.map-section');
    if (mapContainer) {
        mapContainer.classList.toggle('fullscreen');
        setTimeout(() => adminMap?.invalidateSize(), 100);
    }
}

function viewActivityLog() {
    alert('📜 Activity Log\n\nSystem activity:\n- All admin actions logged\n- User registrations\n- Alert creation/updates\n- API requests');
}

function manageUsers() {
    alert('👥 User Management\n\nTotal Users: Loading from API...\n\nFeatures:\n- View all users\n- Edit user details\n- Manage subscriptions\n- Send notifications');
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('dasToken');
        localStorage.removeItem('dasUser');
        window.location.href = 'login.html';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        showCreateAlert();
    }
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

console.log('🛡️ Admin Dashboard Ready');
console.log('💡 Shortcuts: Ctrl+N (New Alert), Escape (Close)');
