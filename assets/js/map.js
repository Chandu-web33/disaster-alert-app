// Disaster Alert Map Implementation

let map;
let markers = [];
let markerLayer;

// Disaster data with real coordinates
const disasterLocations = [
    {
        id: 1,
        type: 'earthquake',
        coords: [37.7749, -122.4194], // San Francisco
        location: 'San Francisco, CA',
        severity: 'critical',
        magnitude: 6.2,
        description: 'Magnitude 6.2 earthquake detected. Aftershocks expected.',
        time: '2 min ago',
        affected: '500K',
        icon: 'fa-house-damage'
    },
    {
        id: 2,
        type: 'flood',
        coords: [29.7604, -95.3698], // Houston
        location: 'Houston, TX',
        severity: 'warning',
        magnitude: 'Severe',
        description: 'Heavy rainfall causing flash flooding in low-lying areas.',
        time: '15 min ago',
        affected: '250K',
        icon: 'fa-water'
    },
    {
        id: 3,
        type: 'fire',
        coords: [34.0522, -118.2437], // Los Angeles
        location: 'Los Angeles, CA',
        severity: 'critical',
        magnitude: 'Fast-moving',
        description: 'Wildfire spreading rapidly. Mandatory evacuation order.',
        time: '30 min ago',
        affected: '100K',
        icon: 'fa-fire-alt'
    },
    {
        id: 4,
        type: 'storm',
        coords: [25.7617, -80.1918], // Miami
        location: 'Miami, FL',
        severity: 'watch',
        magnitude: 'Category 3',
        description: 'Hurricane approaching. Monitor updates and prepare.',
        time: '1 hour ago',
        affected: '1.2M',
        icon: 'fa-wind'
    },
    {
        id: 5,
        type: 'storm',
        coords: [41.8781, -87.6298], // Chicago
        location: 'Chicago, IL',
        severity: 'warning',
        magnitude: 'Severe',
        description: 'Severe thunderstorms with hail and damaging winds.',
        time: '45 min ago',
        affected: '300K',
        icon: 'fa-bolt'
    },
    {
        id: 6,
        type: 'storm',
        coords: [35.4676, -97.5164], // Oklahoma City
        location: 'Oklahoma City, OK',
        severity: 'critical',
        magnitude: 'EF3',
        description: 'Tornado spotted on ground. Seek shelter immediately.',
        time: '5 min ago',
        affected: '150K',
        icon: 'fa-tornado'
    }
];

// Initialize map
function initMap() {
    try {
        // Create map centered on USA
        map = L.map('disaster-map', {
            center: [39.8283, -98.5795],
            zoom: 4,
            zoomControl: true,
            scrollWheelZoom: true
        });

        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        // Create marker layer group
        markerLayer = L.layerGroup().addTo(map);

        // Hide loader
        setTimeout(() => {
            document.getElementById('mapLoader').style.display = 'none';
        }, 1000);

        // Add all markers
        addMarkersToMap(disasterLocations);

        console.log('Map initialized successfully');
    } catch (error) {
        console.error('Error initializing map:', error);
        showMapError();
    }
}

// Create custom icon based on severity
function createCustomIcon(disaster) {
    const colors = {
        critical: '#b91c1c',
        warning: '#f59e0b',
        watch: '#3b82f6'
    };

    const color = colors[disaster.severity] || '#6b7280';
    
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="marker-pin ${disaster.severity}" style="background-color: ${color}">
                <i class="fas ${disaster.icon}"></i>
            </div>
            <div class="marker-pulse ${disaster.severity}"></div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
}

// Add markers to map
function addMarkersToMap(disasters) {
    // Clear existing markers
    markerLayer.clearLayers();
    markers = [];

    disasters.forEach(disaster => {
        const icon = createCustomIcon(disaster);
        
        const marker = L.marker(disaster.coords, { icon: icon })
            .bindPopup(createPopupContent(disaster))
            .addTo(markerLayer);

        marker.disasterData = disaster;
        markers.push(marker);

        // Add click event
        marker.on('click', function() {
            showDisasterDetails(disaster);
        });
    });

    // Update stats
    updateMapStats(disasters);
}

// Create popup content
function createPopupContent(disaster) {
    const severityClass = disaster.severity;
    return `
        <div class="map-popup ${severityClass}">
            <div class="popup-header">
                <span class="popup-badge ${severityClass}">${disaster.severity.toUpperCase()}</span>
                <span class="popup-time"><i class="fas fa-clock"></i> ${disaster.time}</span>
            </div>
            <h3><i class="fas ${disaster.icon}"></i> ${disaster.location}</h3>
            <p class="popup-magnitude"><strong>Magnitude:</strong> ${disaster.magnitude}</p>
            <p class="popup-description">${disaster.description}</p>
            <div class="popup-stats">
                <span><i class="fas fa-users"></i> ${disaster.affected} affected</span>
            </div>
            <button class="popup-btn" onclick="viewAlertDetails(${disaster.id})">
                View Details <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
}

// Show disaster details
function showDisasterDetails(disaster) {
    console.log('Showing details for:', disaster.location);
    // Zoom to location
    map.setView(disaster.coords, 10, {
        animate: true,
        duration: 1
    });
}

// View alert details
function viewAlertDetails(id) {
    const disaster = disasterLocations.find(d => d.id === id);
    if (disaster) {
        alert(`Disaster Alert Details:\n\n` +
              `Location: ${disaster.location}\n` +
              `Type: ${disaster.type.toUpperCase()}\n` +
              `Severity: ${disaster.severity.toUpperCase()}\n` +
              `Description: ${disaster.description}\n` +
              `Affected: ${disaster.affected} people\n` +
              `Time: ${disaster.time}`);
    }
}

// Filter disasters by type
function filterDisasters(type) {
    let filtered = disasterLocations;
    
    if (type !== 'all') {
        filtered = disasterLocations.filter(d => d.type === type);
    }
    
    addMarkersToMap(filtered);
    
    // Update active button
    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${type}"]`).classList.add('active');
}

// Update map statistics
function updateMapStats(disasters) {
    const countries = new Set(disasters.map(d => d.location.split(',')[1])).size;
    const totalAffected = disasters.reduce((sum, d) => {
        const num = parseFloat(d.affected);
        return sum + num;
    }, 0);

    document.getElementById('map-total-events').textContent = disasters.length;
    document.getElementById('map-countries').textContent = countries;
    document.getElementById('map-population').textContent = totalAffected.toFixed(1) + 'M';
    document.getElementById('active-markers').textContent = `${disasters.length} Active Events`;
    
    // Update last updated time
    updateLastUpdated();
}

// Update last updated timestamp
function updateLastUpdated() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    document.getElementById('map-updated').textContent = timeStr;
}

// Show map error
function showMapError() {
    document.getElementById('mapLoader').innerHTML = `
        <div class="map-error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Unable to load map. Please refresh the page.</p>
        </div>
    `;
}

// Map control buttons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !map) {
                initMap();
                observer.disconnect();
            }
        });
    });

    const mapSection = document.getElementById('disaster-map');
    if (mapSection) {
        observer.observe(mapSection);
    }

    // Add filter button listeners
    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterDisasters(filter);
        });
    });

    // Update timestamp every minute
    setInterval(updateLastUpdated, 60000);
});

// Auto-refresh disasters every 30 seconds (simulate real-time)
setInterval(() => {
    if (map) {
        console.log('Refreshing disaster data...');
        // In production, this would fetch new data from API
        updateMapStats(disasterLocations);
    }
}, 30000);
