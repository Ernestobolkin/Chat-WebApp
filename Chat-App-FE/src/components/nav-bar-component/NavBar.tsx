import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { generalRequest } from "../../service/api-service";
import "./NavBar.style.css";
import SuccessButton from "../Reusable/button";


const NavBar: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location)
  }, [location])

  const testUrl = async()=>{
    const response = await generalRequest('test', 'GET')
    console.log(response);
  }


  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg ">
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
          <SuccessButton onClick={testUrl} className="btn btn-success login">
            test
          </SuccessButton>
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