import React, { useEffect, useState } from "react";
// import logo
import logo from "../public/images/ai.jpg";
// import login css file
import "./login.css";
// import startup page
import Startup from "../../components/startup/startup";
import { NavLink, useNavigate } from "react-router-dom";
import Home from "../home/home";
// import useForm react hook for form validation
import { useForm } from "react-hook-form";

const Login = () => {
  // set a state for handling login/sign-up components
  const [getNext, setGetNext] = useState(false);
  // hide login area if user authentificated
  const [authentificated, setAuthentificated] = useState(false);
  // starting with change page title
  useEffect(() => {
    document.title = "Hamidos | Login";
  }, []);

  // login btn

  const login = () => {
    localStorage.setItem("user-login", "true");
    navigate("/");
    window.location.reload();
  };
  // handle auto redirect
  const navigate = useNavigate();
  // get user token
  useEffect(() => {
    const token = localStorage.getItem("user-login");
    if (token === "true") {
      setAuthentificated(true);
    }
  });

  // Register  inputs validation
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    reset: loginReset,
    formState: { errors: loginErrors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      emailLogin: "user@example.com",
    },
  });

  // sign-Up inputs validation
  const {
    register: signUpRegister,
    handleSubmit: handleSignUpSubmit,
    reset: signUpReset,
    formState: { errors: signUpErrors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      firstname: "john",
      lastname: "doa",
      emailSignUp: "user@example.com",
    },
  });
  // inputs value spaces control
  const isNotEmptyOrSpaces = (value) => {
    return value.trim().length !== 0; // Check if the value is not empty or contains only spaces
  };
  // handle user login

  const handleLogin = (data) => {
    console.log("Login form data:", data); // Data submitted from the form
    loginReset(); // Reset the form's state, including input values and errors
  };

  const handleSignUp = (data) => {
    console.log("Sign-up form data:", data); // Data submitted from the form
    signUpReset(); // Reset the form's state, including input values and errors
  };
  return (
    // parent container
    <>
      {
        // if user not authentificated then we display login component and startup pgae
        !authentificated && (
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
              <div className="forms pt-3 w-100">
                {/* 1 :  login form */}
                <div
                  className={`login-form mt-5 login text-center ${
                    !getNext && "active"
                  }`}
                >
                  {/* title */}
                  <h2 className="login-title mb-3">Member Login</h2>
                  {/* email error handler aria */}
                  {loginErrors.emailLogin && (
                    <div className="alert alert-danger p-2 w-100">
                      Please enter a valid email
                    </div>
                  )}
                  {/* password error handler aria */}
                  {loginErrors.passwordLogin && (
                    <div className="alert alert-danger p-2 w-100">
                      Password required and must be between 6 and 16 character
                    </div>
                  )}

                  {/* form */}
                  <form onSubmit={handleLoginSubmit(handleLogin)}>
                    {/* email input */}
                    <div data-mdb-input-init className="form-floating mb-4">
                      <input
                        type="email"
                        id="email-login"
                        className="form-control"
                        {...loginRegister("emailLogin", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                          validate: {
                            notEmptyOrSpaces: (value) =>
                              isNotEmptyOrSpaces(value),
                          },
                        })}
                      />
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
                        r
                        {...loginRegister("passwordLogin", {
                          required: true,
                          minLength: 6,
                          maxLength: 16,
                          validate: {
                            notEmptyOrSpaces: (value) =>
                              isNotEmptyOrSpaces(value),
                          },
                        })}
                      />
                      <label className="form-label" htmlFor="password-login">
                        Password
                      </label>
                    </div>
                    {/* login btn */}
                    <button
                      data-mdb-ripple-init
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                      onClick={login}
                    >
                      Login
                    </button>
                  </form>
                  {/* forget password link */}
                  <NavLink to="/login/reset-password" className=" btn-link">
                    Forget password ?
                  </NavLink>
                  <span
                    className="d-flex flex-row justify-content-center align-items-center"
                    onClick={() => {
                      setGetNext(true);
                    }}
                    style={{ cursor: "pointer", color: "green" }}
                  >
                    Or create account{" "}
                    <i class="fas fa-arrow-right-long ms-2"></i>{" "}
                  </span>
                </div>
                {/*2: sign-up form */}
                <div
                  className={`sign-up-form mt-5 sign-up text-center ${
                    getNext && "active"
                  }`}
                >
                  {/* title */}
                  <h2 className="login-title mb-3">Member Sign-up</h2>

                  {/* form errors handler aria */}
                  {/* firstname error handler aria */}
                  {signUpErrors.firstname && (
                    <div className="alert alert-danger p-2 w-100">
                      Firstname required and must be between 3 and 10 character
                    </div>
                  )}
                  {/* lastname error handler aria */}
                  {signUpErrors.lastname && (
                    <div className="alert alert-danger p-2 w-100">
                      Lastname required and must be between 3 and 10 character
                    </div>
                  )}
                  {/* Email error handler aria */}
                  {signUpErrors.emailSignUp && (
                    <div className="alert alert-danger p-2 w-100">
                      Please enter a valid email
                    </div>
                  )}
                  {/* password error handler aria */}
                  {signUpErrors.passwordSignUp && (
                    <div className="alert alert-danger p-2 w-100">
                      Password required and must be between 6 and 16 character
                    </div>
                  )}
                  {/* form */}
                  <form onSubmit={handleSignUpSubmit(handleSignUp)}>
                    {/* firstname input */}
                    <div data-mdb-input-init className="form-floating mb-4">
                      <input
                        type="text"
                        id="firstname-signup"
                        className="form-control"
                        {...signUpRegister("firstname", {
                          required: true,
                          minLength: 3,
                          maxLength: 10,
                          validate: {
                            notEmptyOrSpaces: (value) =>
                              isNotEmptyOrSpaces(value),
                          },
                        })}
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
                        r
                        {...signUpRegister("lastname", {
                          required: true,
                          minLength: 3,
                          maxLength: 10,
                          validate: {
                            notEmptyOrSpaces: (value) =>
                              isNotEmptyOrSpaces(value),
                          },
                        })}
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
                        {...signUpRegister("emailSignUp", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                          validate: {
                            notEmptyOrSpaces: (value) =>
                              isNotEmptyOrSpaces(value),
                          },
                        })}
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
                        {...signUpRegister("passwordSignUp", {
                          required: true,
                          minLength: 6,
                          maxLength: 16,
                          validate: {
                            notEmptyOrSpaces: (value) =>
                              isNotEmptyOrSpaces(value),
                          },
                        })}
                      />
                      <label className="form-label" htmlFor="password-signup">
                        Password
                      </label>
                    </div>
                    {/* sign-up btn */}
                    <button
                      data-mdb-ripple-init
                      type="submit"
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
        )
      }
    </>
  );
};

export default Login;
