import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        {/* <div className="logo-icon">🌀</div> */}
        <Link to="/">
          <div>
            <span className="logo-main">BYTE</span>
            <span className="logo-storm"> THE STORM</span>
          </div>
        </Link>

      </div>

      <div className="nav-links">

      </div>

      <Link to="/dashboard">
        <button className="nav-button">
          Launch
        </button>

      </Link>


    </nav>
  );
}

export default Navbar;