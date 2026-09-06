/* =========================================================
   BYTE THE STORM - DARK THEMED CYCLONE LEAFLET MAP
   ========================================================= */

// Prevent multiple map initialization
let cycloneMapInstance = null;

let satelliteLayerGroup = null;
let pathLayerGroup = null;
let riskZonesGroup = null;
let cycloneLayerGroup = null;


function createCycloneMap(id) {

    // ==========================================
    // PREVENT "MAP CONTAINER IS ALREADY INITIALIZED"
    // ==========================================

    if (cycloneMapInstance) {
        cycloneMapInstance.remove();
        cycloneMapInstance = null;
    }


    // ==========================================
    // CREATE MAP
    // ==========================================

    const map = L.map(id, {
        center: [19.5, 87.8],
        zoom: 5,
        minZoom: 4,
        maxZoom: 10,
        zoomControl: false
    });


    // Custom zoom control
    L.control.zoom({
        position: 'topright'
    }).addTo(map);


    // ==========================================
    // DARK CARTO MAP
    // NO API KEY REQUIRED
    // ==========================================
    const CARTO_API_KEY ="eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfd3QzNDcxYmUiLCJqdGkiOiI2NWQ1MDYxMCJ9.qL4Myd4qmq4LljOF_06UcCux1_IujuzGiZGh2n5DHKM"

    const darkTiles = L.tileLayer(
        `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${CARTO_API_KEY}`,
        {
            attribution:
                '&copy; OpenStreetMap contributors &copy; CARTO',

            subdomains: 'abcd',

            maxZoom: 19
        }
    );

    darkTiles.addTo(map);


    // ==========================================
    // CREATE LAYER GROUPS
    // ==========================================

    pathLayerGroup = L.layerGroup().addTo(map);

    satelliteLayerGroup = L.layerGroup();

    riskZonesGroup = L.layerGroup().addTo(map);

    cycloneLayerGroup = L.layerGroup().addTo(map);


    // ==========================================
    // 1. PROJECTED CYCLONE TRAJECTORY
    // ==========================================

    const historicalPath = [
        [15.2, 91.2],
        [16.4, 90.4],
        [17.6, 89.6],
        [18.8, 88.7]
    ];


    const predictedPath = [
        [18.8, 88.7],
        [19.9, 87.9],
        [20.8, 87.2],
        [21.8, 86.6],
        [22.9, 86.1]
    ];


    // Historical path
    L.polyline(historicalPath, {

        color: '#64748b',
        weight: 3,
        opacity: 0.7

    }).addTo(pathLayerGroup);


    // Predicted path
    L.polyline(predictedPath, {

        color: '#38bdf8',
        weight: 4,
        dashArray: '8, 8',
        opacity: 0.95

    }).addTo(pathLayerGroup);


    // ==========================================
    // FORECAST WAYPOINTS
    // ==========================================

    const waypoints = [

        {
            coords: [18.8, 88.7],
            label: "Current Eye",
            time: "Now",
            wind: "145 km/h"
        },

        {
            coords: [19.9, 87.9],
            label: "+12h Forecast",
            time: "Tonight",
            wind: "155 km/h"
        },

        {
            coords: [20.8, 87.2],
            label: "+24h Forecast",
            time: "Tomorrow AM",
            wind: "165 km/h"
        },

        {
            coords: [21.8, 86.6],
            label: "+36h Landfall Window",
            time: "Tomorrow PM",
            wind: "140 km/h"
        }

    ];


    waypoints.forEach(wp => {

        L.circleMarker(wp.coords, {

            radius: 5,

            fillColor: '#38bdf8',

            color: '#ffffff',

            weight: 1.5,

            fillOpacity: 1

        })
        .bindPopup(`
            <b>${wp.label}</b><br>
            Time: ${wp.time}<br>
            Sustained Wind: ${wp.wind}
        `)
        .addTo(pathLayerGroup);

    });


    // ==========================================
    // 2. CONE OF UNCERTAINTY
    // ==========================================

    const conePolygon = [

        [18.8, 88.7],

        [20.2, 86.8],

        [22.5, 85.0],

        [23.4, 87.2],

        [21.5, 88.8],

        [18.8, 88.7]

    ];


    L.polygon(conePolygon, {

        color: '#38bdf8',

        weight: 1,

        fillColor: '#0284c7',

        fillOpacity: 0.12,

        dashArray: '4, 4'

    }).addTo(pathLayerGroup);


    // ==========================================
    // 3. CYCLONE EYE
    // ==========================================

    const eyeLocation = [18.8, 88.7];


    // Outer gale radius

    L.circle(eyeLocation, {

        radius: 150000,

        color: '#ea580c',

        weight: 1.5,

        fillColor: '#ea580c',

        fillOpacity: 0.08,

        dashArray: '5, 5'

    }).addTo(cycloneLayerGroup);


    // Severe wind core

    L.circle(eyeLocation, {

        radius: 65000,

        color: '#ef4444',

        weight: 2,

        fillColor: '#dc2626',

        fillOpacity: 0.2

    }).addTo(cycloneLayerGroup);


    // Eye marker

    const eyeMarker = L.circleMarker(eyeLocation, {

        radius: 11,

        color: '#ffffff',

        fillColor: '#ef4444',

        fillOpacity: 1,

        weight: 3

    }).addTo(cycloneLayerGroup);


    eyeMarker.bindPopup(`

        <div style="
            font-family: Inter, sans-serif;
            min-width: 170px;
            color: #0f172a;
        ">

            <div style="
                font-size: 13px;
                font-weight: 800;
                color: #dc2626;
                margin-bottom: 4px;
            ">
                ⚠ Severe Cyclone
            </div>

            <div style="font-size: 11px;">
                <b>Coordinates:</b> 18.8°N, 88.7°E
            </div>

            <div style="font-size: 11px;">
                <b>Max Wind:</b> 145 km/h
            </div>

            <div style="font-size: 11px;">
                <b>Central Pressure:</b> 962 hPa
            </div>

            <div style="
                font-size: 11px;
                color: #16a34a;
                font-weight: 600;
            ">
                Status: Rapid Intensification
            </div>

        </div>

    `);


    // ==========================================
    // 4. HIGH RISK COASTAL SECTORS
    // ==========================================


    // Coastal West Bengal

    L.circle([21.6, 88.0], {

        radius: 70000,

        color: '#ef4444',

        fillColor: '#ef4444',

        fillOpacity: 0.22,

        weight: 2

    })
    .bindPopup(`
        <b>High Risk Zone: Coastal West Bengal</b><br>
        Storm Surge: 2.5 - 3.8m<br>
        Rainfall: Extreme
    `)
    .addTo(riskZonesGroup);


    // Odisha Coast

    L.circle([20.9, 86.8], {

        radius: 65000,

        color: '#f97316',

        fillColor: '#f97316',

        fillOpacity: 0.18,

        weight: 2

    })
    .bindPopup(`
        <b>High Alert: Odisha Coast</b><br>
        Gale Winds: 110-130 km/h
    `)
    .addTo(riskZonesGroup);


    // ==========================================
    // 5. SATELLITE CLOUD OVERLAY
    // ==========================================


    L.circle(eyeLocation, {

        radius: 260000,

        color: '#ffffff',

        fillColor: '#93c5fd',

        fillOpacity: 0.15,

        weight: 1

    }).addTo(satelliteLayerGroup);


    L.circle([18.2, 89.4], {

        radius: 180000,

        color: '#ffffff',

        fillColor: '#60a5fa',

        fillOpacity: 0.12,

        weight: 0.5

    }).addTo(satelliteLayerGroup);


    // ==========================================
    // SAVE MAP INSTANCE
    // ==========================================

    cycloneMapInstance = map;


    // Fix map rendering after page loads
    setTimeout(() => {
        map.invalidateSize();
    }, 200);


    return map;
}


/* =========================================================
   MAP CONTROLS
   ========================================================= */


window.toggleSatelliteLayer = function () {

    if (!cycloneMapInstance || !satelliteLayerGroup) return;

    const btn =
        document.getElementById('btn-satellite-toggle');


    if (cycloneMapInstance.hasLayer(satelliteLayerGroup)) {

        cycloneMapInstance.removeLayer(
            satelliteLayerGroup
        );

        if (btn) {
            btn.classList.remove('active');
        }

        showToast("Satellite Cloud Feed Disabled");

    } else {

        satelliteLayerGroup.addTo(
            cycloneMapInstance
        );

        if (btn) {
            btn.classList.add('active');
        }

        showToast("Satellite Cloud Layer Activated");

    }

};


window.togglePathForecast = function () {

    if (!cycloneMapInstance || !pathLayerGroup) return;

    const btn =
        document.getElementById('btn-path-toggle');


    if (cycloneMapInstance.hasLayer(pathLayerGroup)) {

        cycloneMapInstance.removeLayer(
            pathLayerGroup
        );

        if (btn) {
            btn.classList.remove('active');
        }

        showToast("Projected Path Hidden");

    } else {

        pathLayerGroup.addTo(
            cycloneMapInstance
        );

        if (btn) {
            btn.classList.add('active');
        }

        showToast("48-Hour Predicted Path Displayed");

    }

};


window.toggleRiskZones = function () {

    if (!cycloneMapInstance || !riskZonesGroup) return;

    const btn =
        document.getElementById('btn-risk-toggle');


    if (cycloneMapInstance.hasLayer(riskZonesGroup)) {

        cycloneMapInstance.removeLayer(
            riskZonesGroup
        );

        if (btn) {
            btn.classList.remove('active');
        }

        showToast("Risk Zones Hidden");

    } else {

        riskZonesGroup.addTo(
            cycloneMapInstance
        );

        if (btn) {
            btn.classList.add('active');
        }

        showToast("High Risk Zones Highlighted");

    }

};


/* =========================================================
   MODALS
   ========================================================= */


window.openAlertSystemModal = function () {

    const modal =
        document.getElementById('alert-system-modal');

    if (modal) {
        modal.classList.add('active');
    }

};


window.closeAlertSystemModal = function () {

    const modal =
        document.getElementById('alert-system-modal');

    if (modal) {
        modal.classList.remove('active');
    }

};


window.openRecommendationModal = function () {

    const modal =
        document.getElementById('recommendation-modal');

    if (modal) {
        modal.classList.add('active');
    }

};


window.closeRecommendationModal = function () {

    const modal =
        document.getElementById('recommendation-modal');

    if (modal) {
        modal.classList.remove('active');
    }

};


/* =========================================================
   TOAST NOTIFICATION
   ========================================================= */


function showToast(message) {

    let toast =
        document.getElementById('dashboard-toast');


    if (!toast) {

        toast =
            document.createElement('div');

        toast.id =
            'dashboard-toast';

        toast.className =
            'dashboard-toast';

        document.body.appendChild(toast);

    }


    toast.textContent = message;

    toast.classList.add('show');


    setTimeout(() => {

        toast.classList.remove('show');

    }, 2800);

}