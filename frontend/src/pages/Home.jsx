import { Link } from "react-router-dom";

function Home() {
    return (

        <div className="home-page">


            <main id="home">

                <section className="hero">

                    <div className="hero-content">

                        <div className="status-badge">
                            <span className="status-dot"></span>
                            AI-POWERED CYCLONE INTELLIGENCE
                        </div>

                        <h1>
                            Predict the Storm.
                            <br />
                            <span>Protect the Coast.</span>
                        </h1>

                        <p className="hero-description">
                            An intelligent cyclone monitoring platform that combines
                            satellite imagery, weather data and AI models to detect,
                            predict and assess cyclone risks before they become disasters.
                        </p>

                        <div className="hero-buttons">

                            <Link to="/dashboard">
                                <button className="primary-button">
                                    Launch Monitoring
                                </button>
                            </Link>

                            <button className="secondary-button">
                                Explore Technology
                            </button>
                        </div>

                        

                    </div>




                </section>







                {/* CTA */}
                <section className="cta-section">

                    <div>
                        <span className="section-tag">READY TO MONITOR</span>

                        <h2>
                            See the storm before
                            <br />
                            it reaches the coast.
                        </h2>
                    </div>

                    <button className="primary-button large">
                        Open Monitoring Dashboard →
                    </button>

                </section>

            </main>
        </div>


    );
}

export default Home