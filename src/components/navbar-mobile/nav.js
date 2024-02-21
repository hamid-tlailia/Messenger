import React, { useEffect, useState } from "react";
// import nav css file
import "./nav.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
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
          <div class="loader">
            <div class="justify-content-center jimu-primary-loading"></div>
          </div>
        )
      }

      <div>
        {/* mobile header */}
        <div
          className="mobile-header d-lg-none d-md-none"
          onClick={() => {
            setSispensLoader(true);
          }}
        >
          {/* home nav */}
          <NavLink className="navs" to="/">
            <div className=" home-mobile">
              <i class="fas fa-house mb-1"></i>
              <span>Home</span>
            </div>
          </NavLink>
          {/* notifications nav */}
          <NavLink className="navs" to="/notifications">
            <div className=" notifications-mobile">
              <i class="fas fa-bell mb-1"></i>
              <span>Notifications</span>
            </div>
          </NavLink>
          {/* message nav */}
          <NavLink className="navs" to="/messages">
            <div className=" messages-mobile">
              <i class="fas fa-comment mb-1"></i>
              <span>Messages</span>
            </div>
          </NavLink>
          {/* users mobile */}
          <NavLink className="navs" to="/profile">
            <div className=" users-mobile">
              <i class="fas fa-user-group mb-1"></i>
              <span>Profile</span>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Nav;
