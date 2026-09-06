let cycloneMapInstance = null;

const options = {
    key: "pJEeT3IzsQ4FEMpm2WHOI0zPhDRaZJEQ",

    lat: 20.5,
    lon: 84.5,
    zoom: 5,

    overlay: "wind"
};


windyInit(options, windyAPI => {

    // Get Leaflet map from Windy
    const { map } = windyAPI;

    cycloneMapInstance = map;

    // Restrict map to India and nearby cyclone area
    // const indiaBounds = L.latLngBounds(
    //     [5.0, 65.0],   // Southwest
    //     [37.5, 100.0]  // Northeast
    // );

    // map.setMaxBounds(indiaBounds);

    // map.fitBounds(indiaBounds);


    // ==========================================
    // CYCLONE LOCATION
    // ==========================================

    const eyeLocation = [18.8, 88.7];


    // ==========================================
    // CYCLONE Demo PATH
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
        color: "#64748b",
        weight: 3,
        opacity: 0.7
    }).addTo(map);


    // Predicted cyclone path
    L.polyline(predictedPath, {
        color: "#38bdf8",
        weight: 4,
        dashArray: "8, 8"
    }).addTo(map);


    // ==========================================
    // CYCLONE WIND RADIUS
    // ==========================================

    L.circle(eyeLocation, {

        radius: 150000,

        color: "#f97316",

        weight: 2,

        fillOpacity: 0.08,

        dashArray: "5, 5"

    }).addTo(map);


    // ==========================================
    // CYCLONE EYE
    // ==========================================

    L.circleMarker(eyeLocation, {

        radius: 12,

        color: "#ffffff",

        weight: 3,

        fillColor: "#ef4444",

        fillOpacity: 1

    })
        .bindPopup(`
        <b>⚠ CYCLONE DETECTED</b><br>
        Location: 18.8°N, 88.7°E<br>
        Wind: 145 km/h<br>
        Status: Rapid Intensification
    `)
        .addTo(map);


    // ==========================================
    // HIGH RISK ZONES
    // ==========================================

    L.circle([21.6, 88.0], {

        radius: 70000,

        color: "#ef4444",

        fillColor: "#ef4444",

        fillOpacity: 0.2,

        weight: 2

    })
        .bindPopup(
            "<b>HIGH RISK</b><br>Coastal West Bengal"
        )
        .addTo(map);


    L.circle([20.9, 86.8], {

        radius: 65000,

        color: "#f97316",

        fillColor: "#f97316",

        fillOpacity: 0.2,

        weight: 2

    })
        .bindPopup(
            "<b>HIGH ALERT</b><br>Odisha Coast"
        )
        .addTo(map);


    console.log("Windy map loaded successfully");

});