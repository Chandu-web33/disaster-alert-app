// Disaster Alert Map Implementation

let map;
let markers = [];
let markerLayer;

// Global Disaster data with real coordinates - Worldwide Coverage
const disasterLocations = [
    // NORTH AMERICA
    {
        id: 1,
        type: 'earthquake',
        coords: [37.7749, -122.4194], // San Francisco, USA
        location: 'San Francisco, USA',
        country: 'United States',
        continent: 'North America',
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
        coords: [29.7604, -95.3698], // Houston, USA
        location: 'Houston, USA',
        country: 'United States',
        continent: 'North America',
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
        coords: [34.0522, -118.2437], // Los Angeles, USA
        location: 'Los Angeles, USA',
        country: 'United States',
        continent: 'North America',
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
        coords: [19.4326, -99.1332], // Mexico City, Mexico
        location: 'Mexico City, Mexico',
        country: 'Mexico',
        continent: 'North America',
        severity: 'watch',
        magnitude: 'Tropical Storm',
        description: 'Tropical storm developing. Heavy rain expected in next 24 hours.',
        time: '1 hour ago',
        affected: '800K',
        icon: 'fa-wind'
    },
    
    // SOUTH AMERICA
    {
        id: 5,
        type: 'earthquake',
        coords: [-33.4489, -70.6693], // Santiago, Chile
        location: 'Santiago, Chile',
        country: 'Chile',
        continent: 'South America',
        severity: 'warning',
        magnitude: 5.8,
        description: 'Magnitude 5.8 earthquake along the Ring of Fire. Monitor for aftershocks.',
        time: '20 min ago',
        affected: '1.2M',
        icon: 'fa-house-damage'
    },
    {
        id: 6,
        type: 'flood',
        coords: [-3.4653, -62.2159], // Manaus, Brazil
        location: 'Manaus, Brazil',
        country: 'Brazil',
        continent: 'South America',
        severity: 'critical',
        magnitude: 'Historic',
        description: 'Amazon River flooding reaching historic levels. Multiple communities at risk.',
        time: '3 hours ago',
        affected: '600K',
        icon: 'fa-water'
    },
    {
        id: 7,
        type: 'fire',
        coords: [-23.5505, -46.6333], // São Paulo, Brazil
        location: 'São Paulo, Brazil',
        country: 'Brazil',
        continent: 'South America',
        severity: 'warning',
        magnitude: 'Moderate',
        description: 'Forest fires spreading due to drought conditions.',
        time: '5 hours ago',
        affected: '150K',
        icon: 'fa-fire-alt'
    },
    
    // EUROPE
    {
        id: 8,
        type: 'flood',
        coords: [48.8566, 2.3522], // Paris, France
        location: 'Paris, France',
        country: 'France',
        continent: 'Europe',
        severity: 'watch',
        magnitude: 'Moderate',
        description: 'Seine River levels rising. Low-lying areas under watch.',
        time: '2 hours ago',
        affected: '200K',
        icon: 'fa-water'
    },
    {
        id: 9,
        type: 'storm',
        coords: [51.5074, -0.1278], // London, UK
        location: 'London, UK',
        country: 'United Kingdom',
        continent: 'Europe',
        severity: 'warning',
        magnitude: 'Severe',
        description: 'Severe windstorm approaching. Wind speeds up to 100 km/h expected.',
        time: '1 hour ago',
        affected: '3M',
        icon: 'fa-wind'
    },
    {
        id: 10,
        type: 'fire',
        coords: [40.4168, -3.7038], // Madrid, Spain
        location: 'Madrid, Spain',
        country: 'Spain',
        continent: 'Europe',
        severity: 'critical',
        magnitude: 'Large',
        description: 'Multiple wildfires burning due to heatwave. Evacuation orders issued.',
        time: '4 hours ago',
        affected: '50K',
        icon: 'fa-fire-alt'
    },
    {
        id: 11,
        type: 'earthquake',
        coords: [41.0082, 28.9784], // Istanbul, Turkey
        location: 'Istanbul, Turkey',
        country: 'Turkey',
        continent: 'Europe/Asia',
        severity: 'critical',
        magnitude: 6.5,
        description: 'Major earthquake on North Anatolian Fault. Immediate emergency response.',
        time: '10 min ago',
        affected: '2M',
        icon: 'fa-house-damage'
    },
    
    // AFRICA
    {
        id: 12,
        type: 'flood',
        coords: [30.0444, 31.2357], // Cairo, Egypt
        location: 'Cairo, Egypt',
        country: 'Egypt',
        continent: 'Africa',
        severity: 'watch',
        magnitude: 'Moderate',
        description: 'Nile River flood season monitoring. Some areas at risk.',
        time: '6 hours ago',
        affected: '400K',
        icon: 'fa-water'
    },
    {
        id: 13,
        type: 'storm',
        coords: [-33.9249, 18.4241], // Cape Town, South Africa
        location: 'Cape Town, South Africa',
        country: 'South Africa',
        continent: 'Africa',
        severity: 'warning',
        magnitude: 'Severe',
        description: 'Severe coastal storm with heavy rain and strong winds.',
        time: '3 hours ago',
        affected: '1M',
        icon: 'fa-wind'
    },
    {
        id: 14,
        type: 'flood',
        coords: [6.5244, 3.3792], // Lagos, Nigeria
        location: 'Lagos, Nigeria',
        country: 'Nigeria',
        continent: 'Africa',
        severity: 'critical',
        magnitude: 'Severe',
        description: 'Coastal flooding affecting multiple neighborhoods. Emergency evacuations.',
        time: '1 hour ago',
        affected: '700K',
        icon: 'fa-water'
    },
    
    // ASIA
    {
        id: 15,
        type: 'earthquake',
        coords: [35.6762, 139.6503], // Tokyo, Japan
        location: 'Tokyo, Japan',
        country: 'Japan',
        continent: 'Asia',
        severity: 'warning',
        magnitude: 6.0,
        description: 'Magnitude 6.0 earthquake detected. Tsunami warning cancelled.',
        time: '25 min ago',
        affected: '5M',
        icon: 'fa-house-damage'
    },
    {
        id: 16,
        type: 'flood',
        coords: [22.5726, 88.3639], // Kolkata, India
        location: 'Kolkata, India',
        country: 'India',
        continent: 'Asia',
        severity: 'critical',
        magnitude: 'Monsoon',
        description: 'Monsoon flooding causing widespread damage. Multiple areas submerged.',
        time: '2 hours ago',
        affected: '2.5M',
        icon: 'fa-water'
    },
    {
        id: 17,
        type: 'storm',
        coords: [14.5995, 120.9842], // Manila, Philippines
        location: 'Manila, Philippines',
        country: 'Philippines',
        continent: 'Asia',
        severity: 'critical',
        magnitude: 'Typhoon Cat 4',
        description: 'Super Typhoon approaching. Mandatory evacuations in coastal areas.',
        time: '30 min ago',
        affected: '3M',
        icon: 'fa-wind'
    },
    {
        id: 18,
        type: 'earthquake',
        coords: [39.9042, 116.4074], // Beijing, China
        location: 'Beijing, China',
        country: 'China',
        continent: 'Asia',
        severity: 'watch',
        magnitude: 5.2,
        description: 'Moderate earthquake felt in metropolitan area. No major damage reported.',
        time: '4 hours ago',
        affected: '8M',
        icon: 'fa-house-damage'
    },
    {
        id: 19,
        type: 'fire',
        coords: [-6.2088, 106.8456], // Jakarta, Indonesia
        location: 'Jakarta, Indonesia',
        country: 'Indonesia',
        continent: 'Asia',
        severity: 'warning',
        magnitude: 'Multiple',
        description: 'Forest fires caused by slash-and-burn agriculture. Air quality hazardous.',
        time: '8 hours ago',
        affected: '1M',
        icon: 'fa-fire-alt'
    },
    {
        id: 20,
        type: 'flood',
        coords: [25.2048, 55.2708], // Dubai, UAE
        location: 'Dubai, UAE',
        country: 'United Arab Emirates',
        continent: 'Asia',
        severity: 'watch',
        magnitude: 'Flash Flood',
        description: 'Rare heavy rainfall causing flash flooding in desert region.',
        time: '5 hours ago',
        affected: '100K',
        icon: 'fa-water'
    },
    
    // OCEANIA
    {
        id: 21,
        type: 'fire',
        coords: [-33.8688, 151.2093], // Sydney, Australia
        location: 'Sydney, Australia',
        country: 'Australia',
        continent: 'Oceania',
        severity: 'critical',
        magnitude: 'Extreme',
        description: 'Bushfires burning out of control. Total fire ban in effect.',
        time: '2 hours ago',
        affected: '500K',
        icon: 'fa-fire-alt'
    },
    {
        id: 22,
        type: 'earthquake',
        coords: [-41.2865, 174.7762], // Wellington, New Zealand
        location: 'Wellington, New Zealand',
        country: 'New Zealand',
        continent: 'Oceania',
        severity: 'warning',
        magnitude: 5.5,
        description: 'Moderate earthquake on major fault line. Residents advised to prepare.',
        time: '1 hour ago',
        affected: '400K',
        icon: 'fa-house-damage'
    },
    {
        id: 23,
        type: 'storm',
        coords: [-17.7134, 178.0650], // Suva, Fiji
        location: 'Suva, Fiji',
        country: 'Fiji',
        continent: 'Oceania',
        severity: 'critical',
        magnitude: 'Cyclone Cat 3',
        description: 'Tropical Cyclone making landfall. Storm surge and heavy rain expected.',
        time: '40 min ago',
        affected: '200K',
        icon: 'fa-wind'
    },
    
    // MIDDLE EAST
    {
        id: 24,
        type: 'storm',
        coords: [33.3152, 44.3661], // Baghdad, Iraq
        location: 'Baghdad, Iraq',
        country: 'Iraq',
        continent: 'Middle East',
        severity: 'warning',
        magnitude: 'Dust Storm',
        description: 'Major dust storm reducing visibility. Health warnings issued.',
        time: '3 hours ago',
        affected: '2M',
        icon: 'fa-wind'
    }
];

// Initialize map
function initMap() {
    try {
        // Create map centered on world view
        map = L.map('disaster-map', {
            center: [20, 0], // Center of world
            zoom: 2, // World view
            zoomControl: true,
            scrollWheelZoom: true,
            minZoom: 2,
            maxZoom: 18
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

        console.log('✅ Global map initialized with ' + disasterLocations.length + ' disaster locations');
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
            <p class="popup-country"><i class="fas fa-flag"></i> ${disaster.country} | ${disaster.continent}</p>
            <p class="popup-magnitude"><strong>Magnitude:</strong> ${disaster.magnitude}</p>
            <p class="popup-description">${disaster.description}</p>
            <div class="popup-stats">
                <span><i class="fas fa-users"></i> ${disaster.affected} affected</span>
            </div>
            <button class="popup-btn" onclick="viewAlertDetails(${disaster.id})">
                View Full Details <i class="fas fa-arrow-right"></i>
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
        alert(`🚨 DISASTER ALERT DETAILS\n\n` +
              `━━━━━━━━━━━━━━━━━━━━━━\n` +
              `📍 Location: ${disaster.location}\n` +
              `🌍 Country: ${disaster.country}\n` +
              `🗺️ Continent: ${disaster.continent}\n` +
              `━━━━━━━━━━━━━━━━━━━━━━\n` +
              `⚠️ Type: ${disaster.type.toUpperCase()}\n` +
              `🔴 Severity: ${disaster.severity.toUpperCase()}\n` +
              `📊 Magnitude: ${disaster.magnitude}\n` +
              `━━━━━━━━━━━━━━━━━━━━━━\n` +
              `📝 Description:\n${disaster.description}\n` +
              `━━━━━━━━━━━━━━━━━━━━━━\n` +
              `👥 People Affected: ${disaster.affected}\n` +
              `⏰ Time: ${disaster.time}\n` +
              `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
              `Stay safe and follow local emergency instructions.`);
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
    const countries = new Set(disasters.map(d => d.country)).size;
    const continents = new Set(disasters.map(d => d.continent)).size;
    
    let totalAffected = 0;
    disasters.forEach(d => {
        const numStr = d.affected.replace('K', '').replace('M', '');
        const num = parseFloat(numStr);
        if (d.affected.includes('M')) {
            totalAffected += num;
        } else if (d.affected.includes('K')) {
            totalAffected += num / 1000;
        }
    });

    document.getElementById('map-total-events').textContent = disasters.length;
    document.getElementById('map-countries').textContent = countries + ' Countries';
    document.getElementById('map-population').textContent = totalAffected.toFixed(1) + 'M';
    document.getElementById('active-markers').textContent = `${disasters.length} Active Events Worldwide`;
    
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
