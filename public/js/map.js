// Initialize Map
const map = L.map('map', {
    center: [-7.370365, 112.897170], // Koordinat laut Sidoarjo
    zoom: 13,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Custom Marker Icon
const shipIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // URL gambar marker kapal
    iconSize: [40, 40], // Ukuran marker
    iconAnchor: [20, 40], // Posisi anchor marker
});

// Add Marker to Map
const shipMarker = L.marker([-7.370365, 112.897170], { icon: shipIcon }).addTo(map);

// Polyline for Tracking Path
let trackingPath = [];
let polyline = null;
let isTracking = false;

// WebSocket for Real-Time Updates
const socket = io();
socket.on('sensor-update', (data) => {
    const latLng = [data.lat, data.lng];
    shipMarker.setLatLng(latLng); // Update posisi marker

    // Update Sensor Cards
    document.getElementById('lat-value').textContent = data.lat.toFixed(6);
    document.getElementById('lng-value').textContent = data.lng.toFixed(6);
    document.getElementById('gyro-value').textContent = `X: ${data.gyroX}, Y: ${data.gyroY}, Z: ${data.gyroZ}`;
    document.getElementById('speed-value').textContent = `${data.speed || 0} knot`;

    // Tambahkan jejak ke tracking path jika tracking aktif
    if (isTracking) {
        trackingPath.push(latLng);
        if (polyline) map.removeLayer(polyline); // Hapus polyline sebelumnya
        polyline = L.polyline(trackingPath, { color: 'blue' }).addTo(map); // Tambahkan polyline baru
    }
});

// Add Custom Control for Sensor Cards (Top Left)
L.Control.SensorCards = L.Control.extend({
    onAdd(map) {
        const container = L.DomUtil.create('div', 'leaflet-control-sensor-cards');
        
        container.innerHTML = `
            <div class="card">
                <h3>Latitude</h3>
                <p id="lat-value">-</p>
            </div>
            <div class="card">
                <h3>Longitude</h3>
                <p id="lng-value">-</p>
            </div>
            <div class="card">
                <h3>Gyroscope</h3>
                <p id="gyro-value">X: -, Y: -, Z: -</p>
            </div>
            <div class="card">
                <h3>Speed</h3>
                <p id="speed-value">- knot</p>
            </div>`;
        
        return container;
    },
});

// Add Custom Control for Gyroscope Visualization (Top Right)
L.Control.GyroscopeVisualization = L.Control.extend({
    onAdd(map) {
        const container = L.DomUtil.create('div', 'leaflet-control-gyro-visualization');
        
        const gyroContainer = document.createElement('div');
        gyroContainer.id = 'gyro-container';
        container.appendChild(gyroContainer);

        return container;
    },
});

// Add Custom Control for Tracking Buttons (Bottom Left)
L.Control.TrackingButtons = L.Control.extend({
    onAdd(map) {
        const container = L.DomUtil.create('div', 'leaflet-control-tracking-buttons');
        
        container.innerHTML = `
            <button id="start-tracking" class="tracking-button">Start Tracking</button>
            <button id="stop-tracking" class="tracking-button">Stop Tracking</button>
        `;

        // Event Listeners for Buttons
        setTimeout(() => {
            document.getElementById('start-tracking').addEventListener('click', () => {
                isTracking = true;
                trackingPath = []; // Reset tracking path
                if (polyline) map.removeLayer(polyline); // Hapus jejak sebelumnya jika ada
                alert('Tracking started!');
            });

            document.getElementById('stop-tracking').addEventListener('click', () => {
                isTracking = false;
                if (polyline) map.removeLayer(polyline); // Hapus jejak saat berhenti tracking
                alert('Tracking stopped!');
            });
        }, 100);

        return container;
    },
});

// Add Controls to Map
map.addControl(new L.Control.SensorCards({ position: 'topleft' }));
map.addControl(new L.Control.GyroscopeVisualization({ position: 'topright' }));
map.addControl(new L.Control.TrackingButtons({ position: 'topright' }));
