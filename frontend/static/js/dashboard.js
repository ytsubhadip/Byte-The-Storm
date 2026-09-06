document.addEventListener("DOMContentLoaded", () => {
    // Initialize the dark-mode cyclone Leaflet map
    if (document.getElementById("map")) {
        createCycloneMap("map");
    }


    // collect user live location

    function getUserLocation() {

        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            successLocation,
            errorLocation
        );
    }


    function successLocation(position) {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log("User Latitude:", lat);
        console.log("User Longitude:", lon);

        // Get weather using user's location
         loadCycloneData(lat, lon);
    }


    function errorLocation(error) {

        console.error("Location error:", error.message);

        alert("Please allow location access to get local weather data.");
    }


    getUserLocation();

    // fetch currect weather data endpoint
    async function loadCycloneData(lat, lon) {
        const tempLable = document.querySelector("#tempValue");
        const rainLabel = document.querySelector("#rainProbability");
        const windLabel = document.querySelector("#WindSpeed");
        const pressureLabel = document.querySelector("#central_pressure");

        try {
            const response = await fetch(`/api/weather/get-live?lat=${lat}&lon=${lon}`);
            const data = await response.json()

            console.log("Cyclone data: ", data)

            tempLable.innerText = `${data.temperature || 0}°C`;
            rainLabel.innerText = `${data.rain_probability || 0}%`;
            windLabel.innerText = `${data.wind_speed || 0} km/h`;
            pressureLabel.innerText = `${data.pressure || 0} hPa`;



        }
        catch (error) {
            console.error("Failed to load cyclone data: ", error)
        }
    }


    // Initialize the AI wind forecast Chart.js instance
    const chartCanvas = document.getElementById("chart");
    if (chartCanvas) {
        new Chart(chartCanvas, {
            type: "line",
            data: {
                labels: ["Now", "+6h", "+12h", "+24h", "+36h", "+48h"],
                datasets: [
                    {
                        label: "Wind Speed (km/h)",
                        data: [145, 150, 155, 165, 140, 95],
                        borderColor: "#dc2626",
                        backgroundColor: "rgba(220, 38, 38, 0.12)",
                        borderWidth: 2.5,
                        fill: true,
                        tension: 0.35,
                        pointBackgroundColor: "#dc2626",
                        pointBorderColor: "#ffffff",
                        pointBorderWidth: 1.5,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.parsed.y + " km/h (Sustained)";
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 10, family: "Inter" }, color: "#64748b" },
                    },
                    y: {
                        grid: { color: "#e2e8f0" },
                        ticks: { font: { size: 10, family: "Inter" }, color: "#64748b" },
                        suggestedMin: 80,
                        suggestedMax: 180,
                    },
                },
            },
        });
    }








});


