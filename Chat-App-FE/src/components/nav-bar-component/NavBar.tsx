/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { generalRequest } from "../../service/api-service";
import "./NavBar.style.css";
import SuccessButton from "../Reusable/button";
import { useAuthStore, useUserDataStore } from "../../stores/authStore";
import { NavBarContext, SystemRoutes } from "../../enums/generalEnum";
import { getUserData, logOut } from "../../service/auth-service";


const NavBar: React.FC = () => {

  const { isSignedIn, signIn } = useAuthStore();
  const { userData, setUserData } = useUserDataStore();
  const navigate = useNavigate();

  const buttonList = [
    {
      text: NavBarContext.HOME,
      link: SystemRoutes.HOME,
    },
    {
      text: NavBarContext.REGISTER,
      link: SystemRoutes.REGISTER,
    },
    {
      text: NavBarContext.LOGIN,
      link: SystemRoutes.LOGIN,
      addition: {
        text: NavBarContext.LOGOUT,
        isActive: isSignedIn
      }
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      const userDataStorage = getUserData();
      const hasData = Object.values(userDataStorage).some(Boolean);
      if (hasData) {
        const isValidToken = await checkIfAuth()
        if (isValidToken) {
          setUserData(userDataStorage);
          signIn();
        } else {
          logOutHandler()
        }
      } else {
        logOutHandler()
      }
    };
    fetchData();
  }, []);
  const checkIfAuth = async () => {
    return await generalRequest('auth', 'GET');
  };

  const createIconTemp = () => {
    return userData?.firstName?.split('')[0]
  }

  const testUrl = async () => {
    const response = await generalRequest('auth', 'GET')
    console.log(response);
    console.log(userData);
  }

  const logOutHandler = () => {
    logOut();
    setUserData({});
    navigate(SystemRoutes.LOGIN);
  }

  const navigateToProfile = () => {
    navigate(SystemRoutes.PROFILE);
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
              {
                buttonList.map((button, index) => (
                  <li className="nav-item" key={index}>
                    <NavLink
                      className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                      to={button.link}
                      onClick={(button.addition?.text && button.addition?.isActive) ? logOutHandler : undefined}
                    >
                      {(button.addition?.text && button.addition?.isActive) ? button.addition.text : button.text}
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
          <div>
            {isSignedIn ? (
              <>
                <div onClick={navigateToProfile} className={"circle-icon active-icon"}>
                  <span>{createIconTemp()}</span>
                </div>
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