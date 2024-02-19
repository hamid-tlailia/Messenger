import React, { useState } from "react";
import "./startup.css";
// import logo image
import logo from "./public/images/flour.webp";
import nextLogo from './public/images/chat-app-logo.png'
import { NavLink } from "react-router-dom";

const Startup = () => {

  // skip state
  const [skip, setSkip] = useState(false);
  // get next item state

  const [getNext, setGetNext] = useState({
    "background" : "",
    "logo" : `${logo}`,
    "title" : "Explore new AI messenger",
    "description" : 
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ratione nostrum alias perferendis obcaecati 1",
    "step" : false,
    "skip" :false
  });

  return (
    <div className= {`container-startup ${skip && "hide"}`}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        {/* logo */}
        <div className= {`logo-container ${getNext.background}`}>
        <img src={getNext.logo} className="img-fluid startup-logo" alt="logo-startup" />
        </div>
        {/* title */}
        <h3 className="title ms-3">{getNext.title} </h3>
        {/* little description */}
        <p className="description">
        {getNext.description}
        </p>
        {/* steps */}
        <div className="steps">
          <span className= {`step ${!getNext.step && "active" }`}></span>
          <span className={`step ${getNext.step && "active" }`}></span>
        </div>
        {/* buttons */}
        <div className="d-flex flex-row justify-content-around align-items-center btns-container">
          {/* skip btn */}
          <button className="btn btn-secondary text-dark button skip-btn " onClick={() => {
            setSkip(true)
          }}>skip</button>
          {/* next/go btn */}
          <NavLink>
          <button className="btn btn-primary text-light button go-btn" onClick={(e) => {
            setGetNext({
              background : "bg-success",
              logo : nextLogo,
              title : "Get ready to start soon !",
              description : 
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ratione nostrum alias perferendis obcaecati 2",
              step : true,
              "skip" : true
            })
          e.target.innerHTML = "Start"
          getNext.skip && setSkip(true)
          }}> Next</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Startup;
