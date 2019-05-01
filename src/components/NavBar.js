import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  const { login, isAuthenticated, logout } = props.auth;
  //TODO display login or logout links conditionally
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/app" className="brand-logo">
          Dashboard
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/">Home</Link>
          </li>
          {!isAuthenticated() && (
            <li>
              <Link to="#" onClick={login.bind(this)}>
                Login
              </Link>
            </li>
          )}
          {isAuthenticated() && (
            <li>
              <Link to="#">Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
