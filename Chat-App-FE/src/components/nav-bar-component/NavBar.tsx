import React from "react";
import { Link, NavLink } from "react-router-dom";
import { generalRequest } from "../../service/api-service";
import "./NavBar.style.css";
import SuccessButton from "../Reusable/button";
import useAuthStore from "../../stores/authStore";


const NavBar: React.FC = () => {

  const { isSignedIn, signIn } = useAuthStore();

  const testUrl = async () => {
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
                <NavLink
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                  to="/"
                  end
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            {isSignedIn ? (
              <>
                <div className={"circle-icon active-icon"}></div>
                {/* TODO: add profile component */}
              </>
            ) : (
              <>
                <div className={"circle-icon"} onClick={signIn} ></div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;