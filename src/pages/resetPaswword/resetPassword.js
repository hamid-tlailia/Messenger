import React, { useEffect, useRef, useState } from "react";
// import css file
import "./resetPassword.css";
import { NavLink } from "react-router-dom";
// import axios

import axios from "axios";

const ResetPassword = () => {
  const [stepsLable, setStepsLable] = useState({
    firstStepLabel: "Email ",
    secondStepLabel: "OTP",
    thirdStepLabel: "Password",
    firstStepStatus: "waiting",
    firstStepColor: "bg-primary",
    secondStepStatus: "",
  });
  // form reset password verification state
  const [verification, setVerification] = useState({
    currentStep: "email",
    email: "",
    otp: "",
    oldPassword: "",
    newPassword: "",
    errorStatus: "",
    enablePasswordVerifiaction: false,
  });

  // received otp state
  const [receivedOTP, setReceivedOTP] = useState("");
  const [stepIndex, setStepIndex] = useState(1);
  // otp example
  const otp = "1234";
  // mailto global usage
  const mailTo = `mailto:${verification.email}`;
  // set global email scope
  const email = verification.email;
  // base url
  const baseUrl = "http://localhost:3001";
  // steps verification func
  const stepsVerication = async (e) => {
    // first step email verification
    if (verification.currentStep === "email") {
      if (verification.email === "") {
        setVerification({
          ...verification,
          errorStatus: "Please enter a valid email",
        });
      } else {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(verification.email);
        if (isValid) {
          setStepIndex(stepIndex + 1);
          setVerification({ ...verification, currentStep: "otp" });
          // send email
          try {
            const response = await axios.post(`${baseUrl}/api/send-email`, {
              email: email,
            }); // Send email in the request body
            setReceivedOTP(response.data);
            console.log(response.data);
          } catch (error) {
            console.error("Error sending OTP:", error);
          }
        } else {
          setVerification({
            ...verification,
            errorStatus: "Please enter a valid email",
          });
        }
      }
    }
    // second step otp verification
    else if (verification.currentStep !== "email") {
      if (verification.otp !== "") {
        console.log(
          "received otp : ",
          receivedOTP + " entred otp :",
          verification.otp
        );
        if (receivedOTP.toString() === verification.otp) {
          setStepIndex(stepIndex + 1);
          setVerification({
            ...verification,
            currentStep: "password",
            errorStatus: "",
          });
        } else {
          setVerification({
            ...verification,
            errorStatus: "OTP is incorrect",
          });
        }
      } else {
        setVerification({
          ...verification,
          errorStatus: "All fiels are required",
        });
      }
    }
  };
  // get submit btn
  const submitBTN = useRef(null);
  // control submit btn
  useEffect(() => {
    if (
      verification.oldPassword.length + verification.newPassword.length > 11 &&
      verification.oldPassword === verification.newPassword
    ) {
      submitBTN.current.classList.remove("disabled");
    } else {
      submitBTN.current.classList.add("disabled");
    }
  });
  // last step reset password && submit btn func
  const resetPassword = () => {
    // code goes here
  };
  return (
    <>
      <div className="reset-password-container">
        {/* steps container */}
        <div className="card">
          {/* stepper header */}
          <div className="card-header steps-header">
            <div
              className={
                stepIndex === 1
                  ? "badge bg-success  me-1"
                  : "badge bg-success me-1"
              }
            >
              {stepIndex === 1 ? "1" : <i class="fas fa-check"></i>}
            </div>
            <span className="me-1">{stepsLable.firstStepLabel} </span>
            <span className="line"></span>
            <div
              className={
                stepIndex > 1 ? "badge bg-success  me-1" : "badge bg-dark me-1"
              }
            >
              {stepIndex < 3 ? "2" : <i class="fas fa-check"></i>}
            </div>
            <span className="me-1"> {stepsLable.secondStepLabel} </span>
            <span className="line"></span>
            <div
              className={
                stepIndex > 2 ? "badge bg-success  me-1" : "badge bg-dark me-1"
              }
            >
              3
            </div>
            <span> {stepsLable.thirdStepLabel} </span>
          </div>
          <div className="card-body steps-body">
            {/* form errors aria */}
            {verification.errorStatus !== "" && (
              <div className="alert alert-danger">
                {verification.errorStatus}
              </div>
            )}
            <div className={stepIndex !== 1 ? "d-none" : "d-flex flex-column"}>
              <span className="label mb-2">Enter your email</span>
              <div class="form-floating w-100" data-mdb-input-init>
                <input
                  type="text"
                  id="typeText"
                  class="form-control"
                  value={verification.email}
                  onChange={(e) => {
                    setVerification({
                      ...verification,
                      email: e.target.value,
                      errorStatus: "",
                    });
                  }}
                />
                <label class="form-label" for="typeText">
                  E-mail*
                </label>
              </div>
            </div>
            <div className={stepIndex === 2 ? "d-flex" : "d-none"}>
              <div class="otp-form">
                {" "}
                <div class="title">OTP</div>
                <div class="title">Verification Code</div>
                <p class="message d-flex flex-column gap-2">
                  We have sent a verification code to
                  <a href={mailTo}>{verification.email} </a>
                </p>
                <div>
                  {" "}
                  <input
                    type="text"
                    className="otp-input"
                    placeholder="Enter your OTP*"
                    onChange={(e) => {
                      setVerification({ ...verification, otp: e.target.value });
                    }}
                  />
                </div>{" "}
              </div>
            </div>
            <div className={stepIndex > 2 ? "d-flex flex-column" : "d-none"}>
              <div className="alert alert-warning">
                NB : password required and must be more than 6 characters
              </div>
              <span className="label mb-2">Update password</span>
              <form>
                <div data-mdb-input-init class="form-floating w-100 mb-4">
                  <input
                    type="password"
                    id="form1Example1"
                    class="form-control"
                    value={verification.oldPassword}
                    onChange={(e) => {
                      setVerification({
                        ...verification,
                        oldPassword: e.target.value,
                      });
                    }}
                  />
                  <label class="form-label" for="form1Example1">
                    New password*
                  </label>
                </div>

                <div data-mdb-input-init class="form-floating w-100 mb-4">
                  <input
                    type="password"
                    id="form1Example2"
                    class="form-control"
                    value={verification.newPassword}
                    onChange={(e) => {
                      setVerification({
                        ...verification,
                        newPassword: e.target.value,
                      });
                    }}
                  />
                  <label class="form-label" for="form1Example2">
                    Confirme password*
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="card-footer steps-footer">
            <NavLink to="/">
              <button className="btn btn-outline-danger btn-floating">
                <i class="fas fa-xmark"></i>
              </button>
            </NavLink>
            <button
              className={
                stepIndex === 3
                  ? "btn btn-outline-info btn-floating  d-none"
                  : "btn btn-outline-info btn-floating "
              }
              onClick={stepsVerication}
            >
              <i class="fas fa-right-long fs-6"></i>
            </button>
            <button
              className={
                stepIndex > 2
                  ? "btn btn-info disabled"
                  : "btn btn-info disabled d-none"
              }
              onClick={resetPassword}
              ref={submitBTN}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
