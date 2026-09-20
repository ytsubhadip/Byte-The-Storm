import { useEffect, useState } from 'react'

import StatCard from "../components/SmartCard/SmartCard";
import CycloneMap from "../components/CycloneMap/CycloneMap";
import SlideBar from '../components/SlideBar/SlideBar'

import API from "../services/api";

import "./Dashboard.css"

function Dashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {

        API.get("/api/dashboard")
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

                        title="SEA SURFACE TEMP."
                        value={data.sst}
                        unit="°C"
                        description="Favorable for development"
                        icon="🌊"
                    />
                    <StatCard
                        title="PRESSURE"
                        value={data.pressure}
                        unit="hPa"
                        description="Falling pressure"
                        icon="◉"
                    />

                    <StatCard
                        title="HUMIDITY"
                        value={data.humidity}
                        unit="%"
                        description="High moisture"
                        icon="💧"
                    />

                    <StatCard
                        title="WIND SHEAR"
                        value={data.wind_shear}
                        unit="kt"
                        description="Moderate shear"
                        icon="💨"
                    />
                </div>


                <CycloneMap />

            </main>

        </div>
    )

}

export default Dashboard;