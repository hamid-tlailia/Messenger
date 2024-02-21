import React, { useEffect, useRef, useState } from "react";
// import css files
import "../home/home.css";
import "./details.css";
// import user avatar for post user image
import avatar_one from "../public/images/user3.png";
// import toast modal
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
// import useForm react hook for form validation
import { useForm } from "react-hook-form";
// import  social media buttons
import ShareButtons from "../../components/share-btns/shareButton";
// import card image
import logo from "../public/images/fleurs.jpeg";
// import no registred user nav bar
import NewUserNav from "../../components/login-header/newUserNav";

const Details = () => {
  // share post state
  const [sharedTitle, setSharedTitle] = useState("");
  // loader section  state
  const [isLoading, setIsLoading] = useState(true);
  // share modal state
  const [showModal, setShowModal] = useState(false);
  // check if user authentificated / not state
  const [authentificated, setAuthentificated] = useState(false);
  // starting with change page title
  useEffect(() => {
    document.title = "Hamidos | Post-Details";
  }, []);
  // page url to share
  const postUrl = window.location.href;
  const postTitle = sharedTitle;
  // get details container by reference
  const details_container = useRef(null);
  // scroll post details page once user visit it
  useEffect(() => {
    if (details_container.current) {
      details_container.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, []);

  // check if user already loged in min once in this browser
  useEffect(() => {
    const userToken = localStorage.getItem("user-login");
    if (userToken && userToken === "true") {
      setAuthentificated(true);
      setIsLoading(false);
    } else {
      setAuthentificated(false);
      setIsLoading(false);
    }
  });

  // comment input validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Comment: "I like it!",
    },
  });
  // control empty input and spaces value
  const isNotEmptyOrSpaces = (value) => {
    return value.trim().length !== 0; // Check if the value is not empty or contains only spaces
  };

  const handleComment = (data) => {
    console.log(data); // Data submitted from the form
    reset();
  };

  return (
    <>
      {
        // if not getting authentification yet set a loader to page
        isLoading && (
          <div class="details-loader">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        )
      }
      {!authentificated && <NewUserNav />}
      <div className="post-details" ref={details_container}>
        <h4 className="w-100 text-start">
          <span className="badge bg-primary shadow-3">Post details</span>
        </h4>
        {/* post card 1*/}
        <div className="card-item shadow-4-strong" data-name="Hamid Tlailia">
          {/* card top-logo */}
          <div className="logo">
            <img src={avatar_one} className="shadow-4-strong " alt="" />
          </div>
          {/* user post name */}
          <h4>Hamid Tlailia</h4>
          {/* post date */}
          <p>posted : 2 hours ago</p>
          {/* post content */}
          <p className="post-body mb-1 ">
            This is an example for the first post body and u can share this post
            when u click the share button bellow any time so now u can try it :
          </p>
          <img
            src={logo}
            className="position-relative w-100 post-image mb-4"
            alt=""
          />
          {/* likes number + comments */}
          <div className="d-flex flex-row justify-content-between align-items-center mt-2 mb-3 w-100">
            <span className="d-flex flex-row justify-content-start align-items-center ">
              <i class="fas fa-heart text-danger me-1 mt-1"></i>you and 120
              others
            </span>
            <span className="d-flex flex-row justify-content-start align-items-center ">
              2 comments
            </span>
          </div>
          {/* reactions btns container */}
          {!authentificated ? (
            <span className="alert alert-warning w-100  text-center fs-5">
              <i class="fas fa-triangle-exclamation"></i> You are not able to
              react this post please login or sign-up first
            </span>
          ) : (
            <div className="d-flex flex-row justify-content-center align-items-center gap-3">
              {/* like btn */}
              <div className="reactions like">
                <i class="fas fa-heart text-danger me-2"></i> Like
              </div>
              {/* comment btn */}
              <div className="reactions comment pe-none">
                <i class="fas fa-comment me-1"></i> comment
              </div>
              {/* share btn */}
              <div
                className="reactions share"
                onClick={(e) => {
                  setShowModal(!showModal);
                  setSharedTitle(
                    e.target.parentNode.parentNode.querySelector(".post-body")
                      ? e.target.parentNode.parentNode.querySelector(
                          ".post-body"
                        ).innerText
                      : "Please go back and share again !"
                  );
                }}
              >
                <i class="fas fa-share me-2"></i> Share
              </div>
            </div>
          )}
          <div className="comments-section active">
            {errors.Comment && (
              <span className="error alert alert-danger">
                This field is required for max 100 character
              </span>
            )}
            <hr />
            <div className="comments">
              {/* comment 1 */}
              <div className="all-flex-row w-100">
                <div className="badge-comment  bg-dark text-light ">I</div>
                <div className="all-flex-col">
                  <strong className="mt-1">Isra Mansour</strong>
                  <p className="comment-body">
                    i love this post ! <mark>1 hrs ago</mark>
                  </p>
                </div>
              </div>
              {/* comment 2 */}
              <div className="all-flex-row w-100">
                <div className="badge-comment  bg-dark text-light ">K</div>
                <div className="all-flex-col">
                  <strong className="mt-1">Khaled Jouablia</strong>
                  <p className="comment-body">
                    it's very amazin... <mark>25 min ago</mark>
                  </p>
                </div>
              </div>
            </div>
            {/* input comments */}
            {authentificated && (
              <form
                className="comment-form active"
                onSubmit={handleSubmit(handleComment)}
              >
                <input
                  type="search"
                  className="comment-input "
                  placeholder="Add comment"
                  {...register("Comment", {
                    required: true,
                    minLength: 1,
                    maxLength: 100,
                    validate: {
                      notEmptyOrSpaces: (value) => isNotEmptyOrSpaces(value),
                    },
                  })}
                />

                <button className="comment-btn" type="submit">
                  <i class="fas fa-arrow-up"></i>
                </button>
              </form>
            )}
          </div>
        </div>
        {/* share post modal */}
        <div className={showModal ? "modal active" : "modal"}>
          <div className=" card share-modal">
            <div className="card-header flex-row-end fs-5">
              <p className="">Share post</p>
              <i
                class="fas fa-xmark mb-3 close border-0"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              ></i>
            </div>
            <div className="card-body d-flex flex-column flex-lg-row flex-md-row justify-content-around gap-2 align-items-center">
              <div>
                <ShareButtons url={postUrl} title={postTitle} />
              </div>

              <div className="copy-link w-auto p-1">
                <span
                  data-link={window.location.href}
                  onClick={(e) => {
                    navigator.clipboard
                      .writeText(e.target.getAttribute("data-link"))
                      .then(() => {
                        toast.success("Link copied to clipboard !");
                      })
                      .catch((error) => {
                        console.error(
                          "Error copying text to clipboard:",
                          error
                        );
                        alert("Failed to copy text to clipboard!");
                      });
                  }}
                >
                  <i class="far fa-clone me-2"></i> Copy link
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* toast container */}
        <ToastContainer style={{ zIndex: "10000000" }} />
      </div>
    </>
  );
};

export default Details;
