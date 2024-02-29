import React, { useState } from "react";
// import css file
import "./resetPassword.css";
import { NavLink } from "react-router-dom";

const ResetPassword = () => {
  const [stepsLable, setStepsLable] = useState({
    firstStepLabel: "Email ",
    secondStepLabel: "OTP",
    thirdStepLabel: "Password",
    firstStepStatus: "waiting",
    firstStepColor: "bg-primary",
    secondStepStatus: "",
  });
  const [stepIndex, setStepIndex] = useState(1);
  return (
    <>
      <div className="reset-password-container">
        {/* steps container */}
        <form className="card">
          {/* stepper header */}
          <div className="card-header steps-header">
            <div
              className={
                stepIndex === 1
                  ? "steps-badge bg-success  me-1"
                  : "steps-badge bg-success me-1"
              }
            >
              {stepIndex === 1 ? "1" : <i class="fas fa-check"></i>}
            </div>
            <span className="me-1">{stepsLable.firstStepLabel} </span>
            <span className="line"></span>
            <div
              className={
                stepIndex > 1 ? "steps-badge bg-success  me-1" : "steps-badge bg-dark me-1"
              }
            >
              {stepIndex < 3 ? "2" : <i class="fas fa-check"></i>}
            </div>
            <span className="me-1"> {stepsLable.secondStepLabel} </span>
            <span className="line"></span>
            <div
              className={
                stepIndex > 2 ? "steps-badge bg-success  me-1" : "steps-badge bg-dark me-1"
              }
            >
              3
            </div>
            <span> {stepsLable.thirdStepLabel} </span>
          </div>
          <div className="card-body steps-body">
            <div className={stepIndex !== 1 ? "d-none" : "d-flex"}>step 1</div>
            <div className={stepIndex === 2 ? "d-flex" : "d-none"}>
              <div class="otp-form">
                {" "}
                <div class="title">OTP</div>
                <div class="title">Verification Code</div>
                <p class="message">
                  We have sent a verification code to
                  <a href="mailto:tlailia757@gmail.com">tlailia757@gmail.com</a>
                </p>
                <div class="inputs">
                  {" "}
                  <input id="input1" type="text" maxlength="1" />
                  <input id="input2" type="text" maxlength="1" />
                  <input id="input3" type="text" maxlength="1" />
                  <input id="input4" type="text" maxlength="1" />
                </div>{" "}
              </div>
            </div>
            <div className={stepIndex > 2 ? "d-flex" : "d-none"}>step 3</div>
          </div>
          <div className="card-footer steps-footer">
            <NavLink to="/">
              <button className="btn btn-danger">cancel</button>
            </NavLink>
            <button
              className={
                stepIndex === 3 ? "btn btn-info d-none" : "btn btn-info"
              }
              onClick={() => {
                setStepIndex(stepIndex + 1);
              }}
            >
              confirme
            </button>
            <button
              className={stepIndex > 2 ? "btn btn-info" : "btn btn-info d-none"}
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
