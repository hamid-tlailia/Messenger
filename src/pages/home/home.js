import React, { useEffect, useState } from "react";
// import home css file
import "./home.css";
// import card image
import logo from "../public/images/fleurs.jpeg";
// import toast modal
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
// import  social media buttons
import ShareButtons from "../../components/share-btns/shareButton";
// import user avatar for post user image
import avatar_one from "../public/images/user2.png";
import avatar_tow from "../public/images/user3.png";
import avatar_three from "../public/images/user4.png";
import { NavLink } from "react-router-dom";

const Home = () => {
  // share post state
  const [sharedTitle, setSharedTitle] = useState("");
  // shared url  state
  const [sharedURL, setSharedURL] = useState("");
  // share modal state
  const [showModal, setShowModal] = useState(false);
  // starting with change page title
  useEffect(() => {
    document.title = "Hamidos | Home";
  }, []);
  // page url to share
  const postUrl = `${window.location.href}${sharedURL}`;
  const postTitle = sharedTitle;
  // filter posts input func
  const filterPosts = (e) => {
    const filtred_name = e.target.value;

    // get all posts
    const posts = document.querySelectorAll(".card-items");

    if (posts) {
      posts.forEach((post) => {
        if (
          post
            .getAttribute("data-name")
            .toLowerCase()
            .includes(filtred_name.toLocaleLowerCase())
        ) {
          document.querySelector(".no-result").innerHTML = "";
        } else {
          document.querySelector(".no-result").innerHTML = "No result found";
        }
      });
      // show post if equal to input value
      for (let i = 0; i < posts.length; i++) {
        // get post name
        const post_name = posts[i].getAttribute("data-name");
        if (
          post_name.toLowerCase().includes(filtred_name.toLocaleLowerCase())
        ) {
          posts[i].style.display = "flex";
          // document.querySelector(".no-result").innerHTML =""
        } else {
          posts[i].style.display = "none";
        }
      }
    }
  };

  return (
    <>
      <div className="home-page">
        <div className="card-container p-3 d-flex flex-column gap-3 justify-content-center align-items-center mb-5 ">
          {/* search area */}
          <div className="d-flex flex-row justify-content-between text-align-center p-3 align-items-center mb-5 w-100">
            <span className="d-lg-none d-md-none"></span>
            <h4 className="d-none d-md-flex d-md-flex bg-transparent mb-4">
              All posts
            </h4>
            {/* search form */}
            <form class="d-flex input-group w-auto">
              <input
                type="search"
                className="form-control rounded mb-4 bg-transparent"
                placeholder="Search"
                aria-label="Search"
                id="search"
                aria-describedby="search-addon"
                onChange={filterPosts}
              />
              <span className="input-group-text border-0" id="search-addon">
                <label htmlFor="search">
                  <i className="fas fa-search"></i>
                </label>
              </span>
            </form>
          </div>
          {/* area search not found label */}
          <div
            className="no-result bg-transparent text-info fs-4"
            style={{
              position: "absolute",
            }}
          ></div>
          <div className="d-flex flex-lg-row gap-3 flex-md-row flex-column justify-content-satart align-items-start">
            {/* post card 1*/}
            <div
              className="card-items shadow-4-strong"
              data-name="Hamid Tlailia"
            >
              {/* card top-logo */}
              <div className="logo">
                <img src={avatar_tow} className="shadow-4-strong " alt="" />
              </div>
              {/* user post name */}
              <h4>Hamid Tlailia</h4>
              {/* post date */}
              <p>posted : 2 hours ago</p>
              {/* post content */}
              <p className="post-body  text-left">
                This is an example for the first post body and u can share this
                post when u click the share button bellow :
              </p>
              <img
                src={logo}
                className="position-relative w-100 post-image"
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
              <div className="d-flex flex-row justify-content-center align-items-center gap-3 mb-2">
                {/* like btn */}
                <div className="reactions like">
                  <i class="fas fa-heart text-danger me-2"></i> Like
                </div>
                {/* comment btn */}
                <NavLink
                  to="/posts/details/225L7PKKV25CC"
                  className="reactions comment"
                >
                  <i class="fas fa-comment me-1"></i> comment
                </NavLink>
                {/* share btn */}
                <div
                  className="reactions share"
                  onClick={(e) => {
                    setShowModal(!showModal);
                    setSharedURL("posts/details/225L7PKKV25CCP1");
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
            </div>
            {/* post card 2*/}
            <div
              className="card-items shadow-4-strong "
              data-name="Isra Mansour"
            >
              {/* card top-logo */}
              <div className="logo">
                <img src={avatar_one} className="shadow-4-strong" alt="" />
              </div>
              {/* user post name */}
              <h4>Isra Mansour</h4>
              {/* post date */}
              <p>posted : 2 hours ago</p>
              {/* post content */}
              <p className="post-body  text-left">
                This is an example for the second post body and u can share this
                post when u click the share button bellow :
              </p>
              <img
                src={logo}
                className="position-relative w-100 post-image"
                alt=""
              />
              {/* likes number */}
              <span className="d-flex flex-row justify-content-start align-items-center w-100 mb-4">
                <i class="fas fa-heart me-1 mt-1"></i>120 likes
              </span>
              {/* reactions btns container */}
              <div className="d-flex flex-row justify-content-center align-items-center gap-3 mb-2">
                {/* like btn */}
                <div className="reactions like">
                  <i class="fas fa-heart  me-2"></i> Like
                </div>
                {/* comment btn */}
                <div className="reactions comment">
                  <i class="fas fa-comment me-2"></i> Comment
                </div>
                {/* share btn */}
                <div
                  className="reactions share"
                  onClick={(e) => {
                    setShowModal(!showModal);
                    setSharedURL("posts/details/225L7PKKV25CCP2");
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
            </div>
            {/* post card 3*/}
            <div
              className="card-items shadow-4-strong "
              data-name="Khaled Jouablia"
            >
              {/* card top-logo */}
              <div className="logo">
                <img src={avatar_three} className="shadow-4-strong" alt="" />
              </div>
              {/* user post name */}
              <h4>Khaled Jouablia</h4>
              {/* post date */}
              <p>posted : 2 hours ago</p>
              {/* post content */}
              <p className="post-body  text-left">
                This is an example for the third post body and u can share this
                post when u click the share button bellow :
              </p>
              <img
                src={logo}
                className="position-relative w-100 post-image"
                alt=""
              />
              {/* likes number */}
              <span className="d-flex flex-row justify-content-start align-items-center w-100 mb-4">
                <i class="fas fa-heart me-1 mt-1"></i>120 likes
              </span>
              {/* reactions btns container */}
              <div className="d-flex flex-row justify-content-center align-items-center gap-3 mb-2">
                {/* like btn */}
                <div className="reactions like">
                  <i class="fas fa-heart  me-2"></i> Like
                </div>
                {/* comment btn */}
                <div className="reactions comment">
                  <i class="fas fa-comment me-2"></i> Comment
                </div>
                {/* share btn */}
                <div
                  className="reactions share"
                  onClick={(e) => {
                    setShowModal(!showModal);
                    setSharedURL("posts/details/225L7PKKV25CCP3");
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
            </div>
          </div>
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
                onClick={(e) => {
                  navigator.clipboard
                    .writeText(postUrl)
                    .then(() => {
                      toast.success("Link successfully copied !");
                    })
                    .catch((error) => {
                      console.error("Error copying text to clipboard:", error);
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
    </>
  );
};

export default Home;
