import React from "react";
import { useEffect, useState } from "react";
// import header css file
import "./header.css";
// import navlink
import { NavLink } from "react-router-dom";
// import logo
import logo from "../startup/public/images/ai.jpg";
const Header = () => {
  // loader for sispenss 😀
  const [sispensLoader, setSispensLoader] = useState(false);
  // sispens loader func
  useEffect(() => {
    // Simulate page loading delay for demonstration
    const timer = setTimeout(() => {
      setSispensLoader(false); // Set loading state to false after delay
    }, 300);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }); // Run effect only once when the component mounts

  return (
    <>
      {
        // display loader if sispens loader is true
        sispensLoader && (
          <div class="header-loader">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        )
      }
      <div className="header d-none d-lg-flex d-md-flex">
        <div className="shadow-3-strong header d-none d-lg-flex d-md-flex">
          <div className="logo">
            <img src={logo} className="image-logo" alt="" />
          </div>
          <div
            className="items"
            onClick={() => {
              setSispensLoader(true);
            }}
          >
            <NavLink className="routes" to="/">
              <i class="fas fa-house me-2"></i> Home
            </NavLink>
            <NavLink className="routes" to="/notifications">
              <i class="fas fa-bell me-2"></i> Notifications
            </NavLink>
            <NavLink className="routes" to="/messages">
              <i class="fas fa-comment me-2"></i> Messages
            </NavLink>
            <NavLink className="routes" to="/profile">
              <i class="fas fa-user-group me-2"></i> Profile
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
