import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { generalRequest } from "../../service/api-service";
import "./NavBar.style.css";
import SuccessButton from "../Reusable/button";
import { useAuthStore, useUserDataStore } from "../../stores/authStore";
import { NavBarContext, SystemRoutes } from "../../enums/generalEnum";


const NavBar: React.FC = () => {

  const { isSignedIn, signIn } = useAuthStore();
  const { userData } = useUserDataStore();
  let userIconTemp = ''

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
    }
  ]

  useEffect(() => {
    if(userData?.firstName?.length > 0){
      createIconTemp()
    }
  }, [isSignedIn])

  const createIconTemp = () => {
    userIconTemp = userData.firstName.split('')[0].toLocaleUpperCase()
    console.log(userIconTemp)
  }

  const testUrl = async () => {
    const response = await generalRequest('test', 'GET')
    console.log(response);
    console.log(userData);
    console.log(userIconTemp)
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
                    >
                      {button.text}
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
          <div>
            {isSignedIn ? (
              <>
                <div className={"circle-icon active-icon"}>
                  <span>{userIconTemp}</span>
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