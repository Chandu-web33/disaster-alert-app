// Disaster Alert Application - JavaScript

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Sample disaster alerts data - Global Coverage
const disasterAlerts = [
    {
        id: 1,
        type: 'Earthquake',
        icon: 'fa-house-damage',
        level: 'critical',
        location: 'Istanbul, Turkey',
        description: 'Magnitude 6.5 earthquake on North Anatolian Fault. Immediate emergency response activated.',
        time: '10 minutes ago',
        affected: '2M'
    },
    {
        id: 2,
        type: 'Flood Warning',
        icon: 'fa-water',
        level: 'critical',
        location: 'Kolkata, India',
        description: 'Monsoon flooding causing widespread damage. Multiple areas submerged.',
        time: '2 hours ago',
        affected: '2.5M'
    },
    {
        id: 3,
        type: 'Wildfire',
        icon: 'fa-fire-alt',
        level: 'critical',
        location: 'Sydney, Australia',
        description: 'Bushfires burning out of control. Total fire ban in effect. Evacuations ongoing.',
        time: '2 hours ago',
        affected: '500K'
    },
    {
        id: 4,
        type: 'Super Typhoon',
        icon: 'fa-wind',
        level: 'critical',
        location: 'Manila, Philippines',
        description: 'Category 4 Super Typhoon approaching. Mandatory evacuations in coastal areas.',
        time: '30 minutes ago',
        affected: '3M'
    },
    {
        id: 5,
        type: 'Severe Flooding',
        icon: 'fa-water',
        level: 'critical',
        location: 'Lagos, Nigeria',
        description: 'Coastal flooding affecting multiple neighborhoods. Emergency evacuations in progress.',
        time: '1 hour ago',
        affected: '700K'
    },
    {
        id: 6,
        type: 'Tropical Cyclone',
        icon: 'fa-tornado',
        level: 'critical',
        location: 'Suva, Fiji',
        description: 'Category 3 Cyclone making landfall. Storm surge and heavy rain expected.',
        time: '40 minutes ago',
        affected: '200K'
    },
    {
        id: 7,
        type: 'Earthquake',
        icon: 'fa-house-damage',
        level: 'warning',
        location: 'Tokyo, Japan',
        description: 'Magnitude 6.0 earthquake detected. Tsunami warning cancelled. Aftershocks possible.',
        time: '25 minutes ago',
        affected: '5M'
    },
    {
        id: 8,
        type: 'Wildfire',
        icon: 'fa-fire-alt',
        level: 'critical',
        location: 'Madrid, Spain',
        description: 'Multiple wildfires burning due to extreme heatwave. Evacuation orders issued.',
        time: '4 hours ago',
        affected: '50K'
    },
    {
        id: 9,
        type: 'Severe Storm',
        icon: 'fa-bolt',
        level: 'warning',
        location: 'London, UK',
        description: 'Severe windstorm approaching. Wind speeds up to 100 km/h expected.',
        time: '1 hour ago',
        affected: '3M'
    },
    {
        id: 10,
        type: 'Amazon Flooding',
        icon: 'fa-water',
        level: 'critical',
        location: 'Manaus, Brazil',
        description: 'Amazon River reaching historic flood levels. Multiple communities at risk.',
        time: '3 hours ago',
        affected: '600K'
    }
];

// Update statistics
function updateStats() {
    const totalAlerts = disasterAlerts.length;
    const criticalAlerts = disasterAlerts.filter(alert => alert.level === 'critical').length;
    
    let totalAffected = 0;
    disasterAlerts.forEach(alert => {
        const numStr = alert.affected.replace('K', '').replace('M', '');
        const num = parseFloat(numStr);
        if (alert.affected.includes('M')) {
            totalAffected += num;
        } else if (alert.affected.includes('K')) {
            totalAffected += num / 1000;
        }
    });
    
    const affectedRegions = new Set(disasterAlerts.map(alert => alert.location.split(',')[0])).size;

    document.getElementById('active-alerts-count').textContent = totalAlerts;
    document.getElementById('total-alerts').textContent = totalAlerts;
    document.getElementById('critical-alerts').textContent = criticalAlerts;
    document.getElementById('affected-people').textContent = totalAffected.toFixed(1) + 'M';
    document.getElementById('affected-regions').textContent = affectedRegions + '+';
}

// Render alerts
function renderAlerts(filter = 'all') {
    const container = document.getElementById('alerts-container');
    const noAlertsMessage = document.getElementById('no-alerts-message');
    
    let filteredAlerts = disasterAlerts;
    
    if (filter !== 'all') {
        filteredAlerts = disasterAlerts.filter(alert => alert.level === filter);
    }
    
    if (filteredAlerts.length === 0) {
        container.innerHTML = '';
        container.appendChild(noAlertsMessage);
        noAlertsMessage.style.display = 'block';
        return;
    }
    
    noAlertsMessage.style.display = 'none';
    
    container.innerHTML = filteredAlerts.map(alert => `
        <div class="alert-card ${alert.level}" data-level="${alert.level}">
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
                <span><i class="fas fa-clock"></i> ${alert.time}</span>
                <span><i class="fas fa-users"></i> ${alert.affected} affected</span>
            </div>
        </div>
    `).join('');
}

// Filter alerts
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        renderAlerts(filter);
    });
});

// Subscribe form handling
const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('sub-name').value;
        const email = document.getElementById('sub-email').value;
        const phone = document.getElementById('sub-phone').value;
        const location = document.getElementById('sub-location').value;
        
        // Get selected alert types
        const alertTypes = [];
        document.querySelectorAll('.checkbox-group input:checked').forEach(checkbox => {
            alertTypes.push(checkbox.value);
        });
        
        // Get notification method
        const notificationMethod = document.querySelector('input[name="notification"]:checked').value;
        
        // Simulate subscription
        alert(`🔔 Subscription Successful!

Welcome, ${name}!

You will receive ${alertTypes.length} types of disaster alerts via ${notificationMethod}.
Alerts will be sent to:
📧 ${email}
📱 ${phone}
📍 Location: ${location}

Stay safe! You can unsubscribe anytime.`);
        
        subscribeForm.reset();
    });
}

// Simulate real-time alert updates
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Randomly update some statistics to show real-time behavior
        const currentCount = parseInt(document.getElementById('active-alerts-count').textContent);
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = Math.max(0, currentCount + change);
        
        document.getElementById('active-alerts-count').textContent = newCount;
    }, 10000); // Update every 10 seconds
}

// Add alert card animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.5s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    renderAlerts();
    simulateRealTimeUpdates();
    
    // Observe alert cards for animation
    setTimeout(() => {
        document.querySelectorAll('.alert-card').forEach(card => {
            observer.observe(card);
        });
    }, 500);
    
    console.log('🚨 Disaster Alert System Initialized');
    console.log(`📊 Monitoring ${disasterAlerts.length} active alerts`);
});

// Service Worker Registration (PWA Support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('✅ Service Worker registered'))
            .catch(err => console.log('❌ Service Worker registration failed'));
    });
}
