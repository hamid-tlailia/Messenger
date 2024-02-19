import React, { useEffect, useState } from "react";
// import logo
import logo from "../public/images/flour.webp";
// import login css file
import "./login.css";
// import startup page
import Startup from "../../components/startup/startup";
import { NavLink, useNavigate } from "react-router-dom";
import Home from "../home/home";

const Login = () => {
  // set a state for handling login/sign-up components
  const [getNext, setGetNext] = useState(false);
  // hide login area if user authentificated
  const [authentificated , setAuthentificated] = useState(false)
  // starting with change page title
  useEffect(() => {
    document.title = "Hamidos | Login";
  },[]);

// login btn

const login = () => {
  localStorage.setItem("user-login" , "true")
}

// get user token 
useEffect(() => {
  const token = localStorage.getItem('user-login')
  if(token) setAuthentificated(true)
})

  return (
    // parent container
  <>
  {
    // if user not authentificated then we display login component and startup pgae
    !authentificated
    &&
    <div className="container">
    {/* set startup page in first entry */}
    <Startup />
    {/* card container for tow column login-signup */}
    <div className="card d-flex flex-column flex-lg-row flex-md-row justify-content-center align-items-center w-100">
      {/* image logo at left */}
      <div className="logo text-center d-none d-lg-block">
        <img src={logo} alt="" className="w-75" />
      </div>
      {/* forms content at right */}
      <div className="forms">
        {/* 1 :  login form */}
        <div
          className={`login-form login text-center ${!getNext && "active"}`}
        >
          {/* title */}
          <h2 className="login-title mb-3">Member Login</h2>
          {/* form */}
          <form>
            {/* email input */}
            <div data-mdb-input-init className="form-floating mb-4">
              <input type="email" id="email-login" className="form-control" />
              <label className="form-label" htmlFor="email-login">
                Email address
              </label>
            </div>
            {/* password input */}
            <div data-mdb-input-init className="form-floating mb-4">
              <input
                type="password"
                id="password-login"
                className="form-control"
              />
              <label className="form-label" htmlFor="password-login">
                Password
              </label>
            </div>
            {/* login btn */}
      <NavLink to="/">
      <button
              data-mdb-ripple-init
              type="button"
              className="btn btn-primary btn-block mb-4"
              onClick={login}
            >
              Login
            </button>
      </NavLink>
            <span
              className="d-flex flex-row justify-content-center align-items-center"
              onClick={() => {
                setGetNext(true);
              }}
              style={{ cursor: "pointer", color: "green" }}
            >
              Creating account <i class="fas fa-arrow-right-long ms-2"></i>{" "}
            </span>
          </form>
        </div>
        {/*2: sign-up form */}
        <div
          className={`sign-up-form sign-up text-center ${
            getNext && "active"
          }`}
        >
          {/* title */}
          <h2 className="login-title mb-3">Member Sign-up</h2>
          {/* form */}
          <form>
            {/* firstname input */}
            <div data-mdb-input-init className="form-floating mb-4">
              <input
                type="text"
                id="firstname-signup"
                className="form-control"
              />
              <label className="form-label" htmlFor="firstname-signup">
                Firstname
              </label>
            </div>
            {/* lastname input */}
            <div data-mdb-input-init className="form-floating mb-4">
              <input
                type="text"
                id="lastname-signup"
                className="form-control"
              />
              <label className="form-label" htmlFor="lastname-signup">
                Lastname
              </label>
            </div>
            {/* email input */}
            <div data-mdb-input-init className="form-floating mb-4">
              <input
                type="email"
                id="email-signup"
                className="form-control"
              />
              <label className="form-label" htmlFor="email-signup">
                Email address
              </label>
            </div>
            {/* password input */}
            <div data-mdb-input-init className="form-floating mb-4">
              <input
                type="password"
                id="password-signup"
                className="form-control"
              />
              <label className="form-label" htmlFor="password-signup">
                Password
              </label>
            </div>
            {/* sign-up btn */}
            <button
              data-mdb-ripple-init
              type="button"
              className="btn btn-primary btn-block mb-4"
            >
              Sign-up
            </button>
            <span
              className="d-flex flex-row justify-content-center align-items-center"
              style={{ cursor: "pointer", color: "green" }}
              onClick={() => {
                setGetNext(false);
              }}
            >
              <i class="fas fa-arrow-left-long me-2"></i> Back to login{" "}
            </span>
          </form>
        </div>
      </div>
    </div>
  </div>
  }
  
  </>
  );
};

export default Login;
