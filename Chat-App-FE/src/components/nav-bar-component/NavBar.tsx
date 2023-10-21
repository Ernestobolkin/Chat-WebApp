import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.style.css";


const NavBar: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location)
  }, [location])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Blog-Platform</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/register" ? "active" : ""}`} to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;