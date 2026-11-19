// Disaster Alert Application - JavaScript
// Talks to the Node.js backend API at http://localhost:5000/api/*

const API_BASE = 'http://localhost:5000/api';

// ── Mobile menu ───────────────────────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
}

// ── Smooth scrolling ──────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ── Render helpers ────────────────────────────────────────────────────────────
function renderAlerts(alerts) {
    const container        = document.getElementById('alerts-container');
    const noAlertsMessage  = document.getElementById('no-alerts-message');
    if (!container) return;

    if (!alerts || alerts.length === 0) {
        container.innerHTML = '';
        if (noAlertsMessage) { container.appendChild(noAlertsMessage); noAlertsMessage.style.display = 'block'; }
        return;
    }

    if (noAlertsMessage) noAlertsMessage.style.display = 'none';

    // Calculate time-ago from ISO timestamp
    function timeAgo(iso) {
        const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
        if (diff < 60)  return `${diff} seconds ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        return `${Math.floor(diff / 3600)} hours ago`;
    }

    container.innerHTML = alerts.map(alert => `
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
                <span><i class="fas fa-clock"></i> ${timeAgo(alert.createdAt)}</span>
                <span><i class="fas fa-users"></i> ${alert.affected} affected</span>
            </div>
        </div>
    `).join('');

    // Scroll animation
    document.querySelectorAll('.alert-card').forEach(card => observer.observe(card));
}

function updateStats(stats) {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('active-alerts-count', stats.totalAlerts);
    set('total-alerts',        stats.totalAlerts);
    set('critical-alerts',     stats.criticalAlerts);
    set('affected-people',     stats.totalAffected);
    set('affected-regions',    stats.affectedRegions + '+');
}

// ── Fetch from API ────────────────────────────────────────────────────────────
let allAlerts = [];

async function loadAlerts(level = 'all') {
    try {
        const url  = level === 'all' ? `${API_BASE}/alerts` : `${API_BASE}/alerts?level=${level}`;
        const resp = await fetch(url);
        const json = await resp.json();
        if (json.success) {
            allAlerts = json.data;
            renderAlerts(allAlerts);
        }
    } catch (err) {
        console.error('Failed to load alerts from API:', err);
        // Fallback: render nothing (or you could keep old static data here)
    }
}

async function loadStats() {
    try {
        const resp = await fetch(`${API_BASE}/stats`);
        const json = await resp.json();
        if (json.success) updateStats(json.data);
    } catch (err) {
        console.error('Failed to load stats from API:', err);
    }
}

// ── Filter buttons ────────────────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        loadAlerts(filter);
    });
});

// ── Subscribe form ────────────────────────────────────────────────────────────
const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const payload = {
            name:               document.getElementById('sub-name').value,
            email:              document.getElementById('sub-email').value,
            phone:              document.getElementById('sub-phone').value,
            location:           document.getElementById('sub-location').value,
            alertTypes:         [...document.querySelectorAll('.checkbox-group input:checked')].map(c => c.value),
            notificationMethod: document.querySelector('input[name="notification"]:checked').value
        };

        try {
            const resp = await fetch(`${API_BASE}/subscriptions`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(payload)
            });
            const json = await resp.json();

            if (json.success) {
                alert(`🔔 Subscription Successful!\n\nWelcome, ${payload.name}!\nYou will receive alerts via ${payload.notificationMethod}.\n📧 ${payload.email}\n📱 ${payload.phone}\n📍 ${payload.location}`);
                subscribeForm.reset();
            } else {
                alert(`⚠️ ${json.error || 'Subscription failed. Please try again.'}`);
            }
        } catch (err) {
            alert('⚠️ Could not connect to server. Please try again later.');
        }
    });
}

// ── Scroll animation observer ─────────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '0';
            entry.target.style.transform = 'translateY(20px)';
            setTimeout(() => {
                entry.target.style.transition = 'all 0.5s ease';
                entry.target.style.opacity    = '1';
                entry.target.style.transform  = 'translateY(0)';
            }, 100);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

// ── Polling (refresh every 30 s) ──────────────────────────────────────────────
function startPolling() {
    setInterval(() => {
        loadAlerts();
        loadStats();
    }, 30000);
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([loadAlerts(), loadStats()]);
    startPolling();
    console.log('🚨 Disaster Alert System Initialized — connected to API');
});

// ── Service Worker ────────────────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('✅ Service Worker registered'))
            .catch(() => console.log('❌ Service Worker registration failed'));
    });
}
