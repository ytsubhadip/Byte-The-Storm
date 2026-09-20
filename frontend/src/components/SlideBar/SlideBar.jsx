import { Link } from "react-router-dom";
import "./SlideBar.css";

function SlideBar() {
  return (
    <aside className="dashboard-sidebar">

      {/* Logo */}

      <div className="sidebar-logo">
        <div className="logo-icon">
          🌪
        </div>

        <div>
          <h2>BYTE</h2>
          <span>THE STORM</span>
        </div>
      </div>


      {/* Menu */}

      <nav className="sidebar-menu">

        <Link to="/dashboard" className="sidebar-item active">
          <span className="sidebar-icon">⌂</span>
          <span>Dashboard</span>
        </Link>


        <Link to="/detection" className="sidebar-item">
          <span className="sidebar-icon">◉</span>
          <span>Detection</span>
        </Link>


        <Link to="/prediction" className="sidebar-item">
          <span className="sidebar-icon">↗</span>
          <span>Prediction</span>
        </Link>


        <Link to="/risk" className="sidebar-item">
          <span className="sidebar-icon">⚠</span>
          <span>Risk Map</span>
        </Link>


        <Link to="/alerts" className="sidebar-item">
          <span className="sidebar-icon">🔔</span>
          <span>Alerts</span>
        </Link>


        <Link to="/sos" className="sidebar-item">
          <span className="sidebar-icon">🆘</span>
          <span>SOS</span>
        </Link>

      </nav>


      {/* Bottom */}

      <div className="sidebar-bottom">

        <div className="system-status">
          <span className="status-dot"></span>

          <div>
            <strong>System Online</strong>
            <small>Live monitoring</small>
          </div>
        </div>

      </div>

    </aside>
  );
}

export default SlideBar;