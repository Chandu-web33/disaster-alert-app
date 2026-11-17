// Admin Dashboard JavaScript

let adminMap;
let alertChart;

// Sample admin alerts data
const adminAlerts = [
    { id: 1, type: 'Earthquake', location: 'Istanbul, Turkey', severity: 'critical', time: '10 min ago', status: 'active' },
    { id: 2, type: 'Typhoon', location: 'Manila, Philippines', severity: 'critical', time: '30 min ago', status: 'active' },
    { id: 3, type: 'Flooding', location: 'Kolkata, India', severity: 'critical', time: '2 hours ago', status: 'active' },
    { id: 4, type: 'Bushfire', location: 'Sydney, Australia', severity: 'critical', time: '2 hours ago', status: 'active' },
    { id: 5, type: 'Windstorm', location: 'London, UK', severity: 'warning', time: '1 hour ago', status: 'active' }
];

// Sample activity data
const recentActivity = [
    { icon: 'fa-exclamation-triangle', action: 'New critical alert created', detail: 'Istanbul Earthquake', time: '10 minutes ago' },
    { icon: 'fa-bell', action: 'Notification sent to 2M users', detail: 'Philippines Typhoon Warning', time: '30 minutes ago' },
    { icon: 'fa-user-plus', action: 'New user registered', detail: 'John Doe from New York', time: '1 hour ago' },
    { icon: 'fa-edit', action: 'Alert updated', detail: 'Sydney Bushfire status changed', time: '2 hours ago' },
    { icon: 'fa-check-circle', action: 'Alert resolved', detail: 'Mexico City Storm cleared', time: '3 hours ago' }
];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initAdminMap();
    loadAlerts();
    loadActivity();
    initChart();
    setupNavigation();
    setupMobileMenu();
    
    console.log('✅ Admin Dashboard Initialized');
});

// Initialize admin map
function initAdminMap() {
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

        // Add some sample markers
        const sampleLocations = [
            { coords: [41.0082, 28.9784], name: 'Istanbul', severity: 'critical' },
            { coords: [14.5995, 120.9842], name: 'Manila', severity: 'critical' },
            { coords: [22.5726, 88.3639], name: 'Kolkata', severity: 'critical' },
            { coords: [-33.8688, 151.2093], name: 'Sydney', severity: 'critical' },
            { coords: [51.5074, -0.1278], name: 'London', severity: 'warning' }
        ];

        sampleLocations.forEach(loc => {
            const color = loc.severity === 'critical' ? '#b91c1c' : '#f59e0b';
            L.circleMarker(loc.coords, {
                radius: 8,
                fillColor: color,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(adminMap).bindPopup(`<strong>${loc.name}</strong><br>Severity: ${loc.severity}`);
        });

        console.log('✅ Admin map initialized');
    } catch (error) {
        console.error('Error initializing admin map:', error);
    }
}

// Load alerts
function loadAlerts() {
    const container = document.getElementById('adminAlertList');
    if (!container) return;

    container.innerHTML = adminAlerts.map(alert => `
        <div class="alert-item ${alert.severity}">
            <div class="alert-details">
                <h4>${alert.type} - ${alert.location}</h4>
                <p>${alert.time} • Status: ${alert.status}</p>
            </div>
            <div class="alert-actions">
                <button onclick="editAlert(${alert.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="viewAlert(${alert.id})" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="deleteAlert(${alert.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Load activity
function loadActivity() {
    const container = document.getElementById('activityList');
    if (!container) return;

    container.innerHTML = recentActivity.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-details">
                <h4>${activity.action}</h4>
                <p>${activity.detail} • ${activity.time}</p>
            </div>
        </div>
    `).join('');
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
                legend: {
                    labels: {
                        color: '#cbd5e1'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cbd5e1'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cbd5e1'
                    }
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

// Modal functions
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

function showSendNotification() {
    alert('📧 Send Notification Feature\n\nThis would open a notification composer to send alerts to users based on:\n- Location\n- Subscription preferences\n- Severity level\n- Disaster type');
}

function exportReport() {
    alert('📊 Export Report Feature\n\nThis would generate and download reports including:\n- Alert statistics\n- User engagement\n- System performance\n- Disaster trends\n\nFormats: PDF, CSV, Excel');
}

function refreshDashboard() {
    alert('🔄 Refreshing dashboard data...');
    setTimeout(() => {
        loadAlerts();
        loadActivity();
        if (adminMap) {
            adminMap.invalidateSize();
        }
        alert('✅ Dashboard refreshed successfully!');
    }, 1000);
}

function viewAllAlerts() {
    alert('📋 View All Alerts\n\nThis would show a comprehensive list of all alerts with:\n- Filtering options\n- Search functionality\n- Bulk actions\n- Export capability');
}

function toggleFullMap() {
    alert('🗺️ Full Screen Map\n\nThis would expand the map to full screen with:\n- Enhanced controls\n- More detailed markers\n- Region filters\n- Heatmap overlay');
}

function viewActivityLog() {
    alert('📜 Activity Log\n\nDetailed system activity log showing:\n- All user actions\n- System events\n- API calls\n- Security events\n- Filter by date/type');
}

function manageUsers() {
    alert('👥 User Management\n\nAccess user management panel to:\n- View all users\n- Edit user details\n- Manage subscriptions\n- Ban/unban users\n- Send direct notifications');
}

// Alert actions
function editAlert(id) {
    alert(`✏️ Edit Alert ID: ${id}\n\nThis would open the alert editor with:\n- All alert fields\n- Location picker\n- Severity selector\n- Status updates`);
}

function viewAlert(id) {
    const alert = adminAlerts.find(a => a.id === id);
    if (alert) {
        alert(`👁️ Alert Details:\n\nType: ${alert.type}\nLocation: ${alert.location}\nSeverity: ${alert.severity.toUpperCase()}\nTime: ${alert.time}\nStatus: ${alert.status}`);
    }
}

function deleteAlert(id) {
    if (confirm('⚠️ Are you sure you want to delete this alert?\n\nThis action cannot be undone.')) {
        alert(`🗑️ Alert ID ${id} has been deleted.`);
        loadAlerts();
    }
}

// Form submission
const createAlertForm = document.getElementById('createAlertForm');
if (createAlertForm) {
    createAlertForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('✅ Alert Created Successfully!\n\nNotifications will be sent to affected users based on their location and preferences.');
        closeModal('createAlertModal');
        this.reset();
        loadAlerts();
    });
}

// Auto-refresh stats every 30 seconds
setInterval(() => {
    const stats = ['admin-total-alerts', 'admin-total-users', 'admin-notifications'];
    stats.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            // Simulate real-time updates
            console.log('📊 Updating stats...');
        }
    });
}, 30000);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + N = New Alert
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        showCreateAlert();
    }
    
    // Escape = Close Modal
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

console.log('🛡️ Admin Dashboard Ready');
console.log('💡 Keyboard Shortcuts: Ctrl+N (New Alert), Escape (Close Modal)');
