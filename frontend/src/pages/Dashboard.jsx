import { useEffect, useState } from 'react'

import StatCard from "../components/SmartCard/SmartCard";
import CycloneMap from "../components/CycloneMap/CycloneMap";
import SlideBar from '../components/SlideBar/SlideBar'

import API from "../services/api";

import "./Dashboard.css"
import SmartCard from '../components/SmartCard/SmartCard';

function Dashboard() {

    const [data, setData] = useState(null);
    const lat = 15;
    const lon = 88

    useEffect(() => {

        API.get(`/api/weather/get-live?lat=${lat}&lon=${lon}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Dashboard API error:", error);
            });

    }, []);

    if (!data) {
        return <div>Loading dashboard...</div>;
    }

    return (
        <div className="dashboard-layout">

            <SlideBar />

            <main className="dashboard-content">

                <div className="dashboard-header">

                    <div>
                        <span className="dashboard-label">
                            LIVE CYCLONE MONITORING
                        </span>
                    </div>



                    <div className="system-online">
                        ● SYSTEM ONLINE
                    </div>

                </div>
                <div className="smart-card-grid">
                    <StatCard
                        title="SEA SURFACE TEMP"
                        value={data.sea_surface_temperature}
                        unit="°C"
                    />
                    <SmartCard
                        title="Humidity" 
                        value={data.humidity}
                        unit="%"
                    />
                    <SmartCard
                        title="Atmospheric Pressure"
                        value={data.pressure}
                        unit="hPa"
                    />
                     <SmartCard
                        title="Wind Speed"
                        value={data.wind_speed}
                        unit="km/h"
                    />
                     <SmartCard
                        title="Wind Direction"
                        value={data.wind_direction}
                        unit="°"
                    />
                     <SmartCard
                        title="Wind Gusts"
                        value={data.wind_gusts}
                        unit="km/h"
                    />  
                     <SmartCard
                        title="Cloud Cover"
                        value={data.cloud_cover}
                        unit="%"
                    />  
                    <SmartCard
                        title="Precipitation"
                        value = {data.precipitation}
                        unit="mm"
                    />
                </div>


                <CycloneMap />

            </main>

        </div>
    )

}

export default Dashboard;