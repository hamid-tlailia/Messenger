import React, { useEffect, useRef, useState } from "react";
// import css file
import "./user.css";
// import posts dependencies images
import logo from "../public/images/fleurs.jpeg";
import avatar_tow from "../public/images/user1.png";
// import user image
import userThree from "../public/images/user3.png";
// import useForm react hook for form validation
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const User = () => {
  // set a state for changing update and validate button display
  const [updateFirstName, setUpdateFirstName] = useState(false);
  const [updateLastName, setUpdateLastName] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  // set states for friends list and friends request to toggle show
  const [showRequestList, setShowRequestList] = useState("friends-list");
  // show/hide friends list modal state
  const [showModal, setShowModal] = useState(false);
  // preview image src state
  const [fileUrl, setFileUrl] = useState("");
  // preview profile image state
  const [imageUrl, setImageUrl] = useState("");
  // update infos btn add/remove disabled class to avoid submit form without editing informations
  const [isDisabled, setIsDisabled] = useState(true);
  // update password btn add/remove disabled class
  const [isDisabledPasswordBtn, setIsDisabledPasswordBtn] = useState(true);
  // show my posts section state
  const [showPostsSection, setShowPostsSection] = useState(false);
  // display editable image state
  const [editableImageSrc, setEditableImageSrc] = useState("");
  // show and hide edit post aria
  const [showEditPostAria, setShowEditPostAria] = useState(false);
  // display editable text in text area
  const [getEditableText, setGetEditableText] = useState("");
  // starting with change page title
  useEffect(() => {
    document.title = "Hamidos | Profile";
  }, []);
  // enable force dark mode by chrome browser
  const handleSearch = () => {
    alert(
      'To enable dark mode in this app : .\n 1 : Write in your browser url : browser-type , exp : "chrome://flags" .\n 2 : In saerch area write "Auto dark mode" .\n 3 : Choose the 4th option .\n 4 : Relaunch chrome .\n NB : if you want to disable dark mode : repeat the same steps and turn "Auto dark mode" to "Default"'
    );
  };
  // get post btn
  const postBtn = useRef(null);
  // preview image from input file in create post
  const displayPostImage = (event) => {
    // get input file value
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Create object URL for the selected file
      const objectUrl = URL.createObjectURL(selectedFile);
      // push image src inside file url state
      setFileUrl(objectUrl);
      // remove disabled class from submit btn
      const postBTN = postBtn.current;
      postBTN.classList.remove("disabled");
    }
  };
  // get input image by refrence to clear value after change
  const profileImageInput = useRef(null);
  // display profile image func

  const showProfileImage = (e) => {
    // get input file value
    const selectedImage = e.target.files[0];

    // Create object URL for the selected file

    // push image src inside file url state
    if (selectedImage && selectedImage.size) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImageUrl(imageUrl);
      // clear input value
      if (profileImageInput.current) profileImageInput.current.value = null;
    }
  };

  // firstname , lastname and email  validation
  const {
    register: registerUpdatedInfos,
    handleSubmit: handleUpdatedInfos,
    reset: updateInfosReset,
    formState: { errors: UpdateInfosErrors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      firstname: "Hamidos",
      lastname: "Tlailia",
      email: "tlailia757@gmail.com",
    },
  });
  // password update form validation
  const {
    register: registerUpdatePassword,
    handleSubmit: handleUpdatePassword,
    reset: updatePasswordReset,
    formState: { errors: updatePasswordErrors },
  } = useForm({
    mode: "onBlur",
  });
  // update user infos func
  const handleUpdate = (data, event) => {
    event.preventDefault();
    console.log("Updated infos : ", data);
    // reset form data
    updateInfosReset();
  };
  // inputs value spaces control
  const isNotEmptyOrSpaces = (value) => {
    return value.trim().length !== 0; // Check if the value is not empty or contains only spaces
  };
  // update user password func
  const updatePassword = (data, event) => {
    console.log("Updated password : ", data);
    // reset form data
    updatePasswordReset();
  };

  // close edit states for read only after update user infos
  const cloeseEditStates = () => {
    setUpdateFirstName(false);
    setUpdateLastName(false);
    setUpdateEmail(false);
  };
  // get input file for post image
  const fileInput = useRef(null);
  // Remove post image btn
  const closePostImage = (e) => {
    setFileUrl("");
    const inputFile = fileInput.current;
    if (inputFile) inputFile.value = "";
    postBtn.current.classList.add("disabled");
  };

  // remove disble class for submit post btn

  const removeDisabledClass = (e) => {
    const postBTN = postBtn.current;
    // remove disabled class from submit btn
    if (e.target.value.trim().length !== 0) {
      postBTN.classList.remove("disabled");
    } else if (
      e.target.value.trim().length === 0 &&
      fileInput.current.value !== ""
    ) {
      postBTN.classList.remove("disabled");
    } else {
      postBTN.classList.add("disabled");
    }
    setGetEditableText(e.target.value);
  };

  // user logout btn func
  const navigate = useNavigate();
  const logOut = () => {
    // update user token from local storage
    localStorage.setItem("user-login", "false");
    // redirect user to login page
    window.location.reload();
  };

  // display editable image from input file func

  const displayEditableImage = (e) => {
    // get input file value
    const selectedImage = e.target.files[0];

    // Create object URL for the selected file

    // push image src inside file url state
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setEditableImageSrc(imageUrl);
    }
    // clear input value
    e.target.value = null;
  };
  // get text area of post edit
  const textarea = useRef(null);
  // edit post btn func

  const editPost = (e) => {
    const editableText = e.target.parentNode.parentNode.parentNode.children[3];
    setShowEditPostAria(true);
    if (editableText) setGetEditableText(editableText.textContent);
    textarea.current.focus();
  };
  return (
    <div className="user-container container-fluid">
      <div className="profile-content">
        <h5 className="fw-bold">
          <i class="fas fa-qrcode text-primary"></i> Profile
        </h5>
        <div className="content">
          <h5>Profile informations :</h5>
          <p>update your account profile's informations and email address</p>
          {/* user profile image */}
          <div className="d-flex flex-row justify-content-between align-items-center friends-list">
            <div className="user-profile-img">
              <img
                src={userThree}
                className={
                  imageUrl
                    ? "d-none"
                    : "profile-avatar shadow-4-strong p-1 me-1"
                }
                alt="chat"
              />
              {/* absolute section to show input file value start */}
              {/* check if already user choose an image */}
              {imageUrl && (
                <form className="absolute-preview-image-section">
                  {/* input file image display here */}
                  <img
                    src={imageUrl}
                    className=" profile-preview-image shadow-4-strong p-1 ms-4"
                    alt="preview"
                  />
                  {/* set or cancel options */}
                  <div className="d-flex flex-row  justify-content-between align-items-center gap-2">
                    <button
                      type="submit"
                      className="btn btn-light  shadow-2  btn-floating fs-6 p-0"
                    >
                      <i class="fas fa-circle-check  text-success"></i>
                    </button>
                    <button
                      class=" btn btn-light btn-floating p-2 p-0 shadow-2 text-danger fs-6"
                      onClick={() => {
                        setImageUrl("");
                      }}
                    >
                      <i className="fas fa-circle-xmark"></i>
                    </button>
                  </div>
                </form>
              )}
              {/* absolute section to show input file value end */}
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              <span
                className="text-primary p-2 shadow-2"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <i class="fas fa-list"></i> friends list
              </span>
              <span
                className="p-2"
                style={{ cursor: "pointer" }}
                onClick={handleSearch}
              >
                <i
                  class="far fa-moon text-warning bg-dark p-2 d-flex justify-content-center align-items-center fs-5"
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                ></i>
              </span>
            </div>
          </div>
          {/* select or remove current image */}
          <div className="d-flex flex-column flex-lg-row flex-md-row justify-content-center align-items-start gap-2 change-image">
            <label
              htmlFor="file"
              className="btn btn-transparent text-dark remove-select"
            >
              Select new photo
            </label>
            <button className="btn btn-danger text-light remove-select">
              Remove photo
            </button>
            <input
              type="file"
              id="file"
              className="d-none"
              accept="image/*"
              ref={profileImageInput}
              onChange={showProfileImage}
            />
          </div>
          <hr />
          {/* name and email address update form */}

          {/* handle update infos form errors */}

          {/* firstname error handler aria */}
          {UpdateInfosErrors.firstname && (
            <div className="alert alert-danger p-2 w-100">
              Firstname required and must be between 3 and 10 character
            </div>
          )}
          {/* lastname error handler aria */}
          {UpdateInfosErrors.lastname && (
            <div className="alert alert-danger p-2 w-100">
              Lastname required and must be between 3 and 10 character
            </div>
          )}
          {/* email error handler aria */}
          {UpdateInfosErrors.email && (
            <div className="alert alert-danger p-2 w-100">
              Please enter a valid email
            </div>
          )}
          <form
            className="d-flex flex-column mb-4"
            onSubmit={handleUpdatedInfos(handleUpdate)}
          >
            <label className="label">Firstname :</label>
            <div className="d-flex flex-row gap-2 justify-content-center align-items-center update-area mb-4">
              <input
                type="text"
                className={
                  updateFirstName
                    ? "name-input inputs update"
                    : "name-input inputs"
                }
                id="name"
                placeholder="Enter firstname"
                {...registerUpdatedInfos("firstname", {
                  required: true,
                  minLength: 3,
                  maxLength: 10,
                  validate: {
                    notEmptyOrSpaces: (value) => isNotEmptyOrSpaces(value),
                  },
                })}
              />
              <i
                className="far fa-pen-to-square"
                onClick={(e) => {
                  setIsDisabled(!isDisabled);
                  setUpdateFirstName(!updateFirstName);
                  !updateFirstName &&
                    e.target.parentNode.querySelector("#name").focus();
                }}
              ></i>
            </div>
            <label className="label">Lastname :</label>
            <div className="d-flex flex-row gap-2 justify-content-center align-items-center update-area mb-4">
              <input
                type="text"
                className={
                  updateLastName
                    ? "name-input inputs update"
                    : "name-input inputs"
                }
                id="name"
                placeholder="Enter lastname"
                {...registerUpdatedInfos("lastname", {
                  required: true,
                  minLength: 3,
                  maxLength: 10,
                  validate: {
                    notEmptyOrSpaces: (value) => isNotEmptyOrSpaces(value),
                  },
                })}
              />
              <i
                className="far fa-pen-to-square"
                onClick={(e) => {
                  setIsDisabled(!isDisabled);
                  setUpdateLastName(!updateLastName);
                  !updateLastName &&
                    e.target.parentNode.querySelector("#name").focus();
                }}
              ></i>
            </div>
            <label className="label">Email :</label>
            <div className="d-flex flex-row gap-2 mb-4 justify-content-center align-items-center update-area">
              <input
                type="email"
                id="email"
                className={
                  updateEmail
                    ? "email-input inputs update"
                    : "email-input inputs"
                }
                placeholder="Enter email"
                {...registerUpdatedInfos("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                  validate: {
                    notEmptyOrSpaces: (value) => isNotEmptyOrSpaces(value),
                  },
                })}
              />
              <i
                className="far fa-pen-to-square"
                onClick={(e) => {
                  setIsDisabled(!isDisabled);
                  setUpdateEmail(!updateEmail);
                  !updateEmail &&
                    e.target.parentNode.querySelector("#email").focus();
                }}
              ></i>
            </div>
            <button
              className={
                isDisabled ? "btn btn-primary disabled" : "btn btn-primary"
              }
              style={{ width: "max-content" }}
              type="submit"
              onClick={cloeseEditStates}
            >
              save
            </button>
          </form>
          {/* update password form errors  handler */}
          {/* old password error handler aria */}
          {updatePasswordErrors.oldPassword && (
            <div className="alert alert-danger p-2 w-100">
              Old password required and must be between 6 and 16 character
            </div>
          )}
          {/* new password error handler aria */}
          {updatePasswordErrors.newPassword && (
            <div className="alert alert-danger p-2 w-100">
              New password required and must be between 6 and 16 character
            </div>
          )}
          {/* update password form */}
          <hr />
          <div className="password-update-area">
            <h5>Update password :</h5>
            <p>
              ensure your account is using a long rondom password to stay secure
            </p>
            <form
              className="d-flex flex-column flex-lg-row flex-md-row justify-content-start gap-3 align-items-start"
              onSubmit={handleUpdatePassword(updatePassword)}
            >
              <input
                type="text"
                className="password-input"
                placeholder="Old password"
                {...registerUpdatePassword("oldPassword", {
                  required: true,
                  minLength: 6,
                  maxLength: 16,
                  validate: {
                    notEmptyOrSpaces: (value) => isNotEmptyOrSpaces(value),
                  },
                })}
                // disable/enable submit btn depending in input value
                onChange={(e) => {
                  e.target.value.trim().length !== 0
                    ? setIsDisabledPasswordBtn(false)
                    : setIsDisabledPasswordBtn(true);
                }}
              />
              <input
                type="text"
                className="password-input"
                placeholder="New password"
                {...registerUpdatePassword("newPassword", {
                  required: true,
                  minLength: 6,
                  maxLength: 16,
                  validate: {
                    notEmptyOrSpaces: (value) => isNotEmptyOrSpaces(value),
                  },
                })}
                // disable/enable submit btn depending in input value
                onChange={(e) => {
                  e.target.value.trim().length !== 0
                    ? setIsDisabledPasswordBtn(false)
                    : setIsDisabledPasswordBtn(true);
                }}
              />
              <button
                type="submit"
                className={
                  isDisabledPasswordBtn
                    ? "btn btn-primary disabled"
                    : "btn btn-primary"
                }
              >
                save
              </button>
            </form>
          </div>
          {/* friends list area start */}
          <div
            className={
              showModal ? "friends-list-parent show" : "friends-list-parent"
            }
          >
            <div className="d-flex flex-row justify-content-between align-items-center">
              <span className="text-primary">
                <i class="fas fa-user-plus"></i> Friends list
              </span>
              <i
                class="fas fa-xmark close-modal"
                onClick={() => {
                  setShowModal(false);
                }}
              ></i>
            </div>
            <hr />
            {/* friends list container */}
            <div className="friends-list-container">
              <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                <button
                  className={
                    showRequestList === "friends-list"
                      ? "lists-nav-btns active"
                      : "lists-nav-btns"
                  }
                  onClick={() => {
                    setShowRequestList("friends-list");
                  }}
                >
                  Friends list
                </button>
                <button
                  className={
                    showRequestList === "requests-list"
                      ? "lists-nav-btns active"
                      : "lists-nav-btns"
                  }
                  onClick={() => {
                    setShowRequestList("requests-list");
                  }}
                >
                  Requests
                </button>
                <button
                  className={
                    showRequestList === "create-post"
                      ? "lists-nav-btns active"
                      : "lists-nav-btns"
                  }
                  onClick={() => {
                    setShowRequestList("create-post");
                  }}
                >
                  Create post
                </button>
              </div>
              {/* lists are start*/}
              <div className="lists-area">
                {/* user friends list */}
                <div
                  className={
                    showRequestList === "friends-list"
                      ? "user-friends-list active"
                      : "user-friends-list"
                  }
                >
                  <p className="fw-bold text-dark mb-2">Friends :</p>

                  {/* friend 1 */}
                  <div className="chat mb-2 gap-auto" style={{ width: "100%" }}>
                    <img
                      src={userThree}
                      className="chat-avatar shadow-4-strong p-1"
                      alt="chat"
                    />
                    <div className="chat-details w-100 text-start">
                      <strong className="mt-2">Sarra</strong>
                      <p>
                        <i class="fas fa-check text-success icon-user-list"></i>{" "}
                        friend
                      </p>
                    </div>
                    <i class="far fa-trash-can text-danger icon-user-list"></i>
                  </div>
                  {/* friend 2 */}
                  <div className="chat gap-auto" style={{ width: "100%" }}>
                    <img
                      src={userThree}
                      className="chat-avatar shadow-4-strong p-1"
                      alt="chat"
                    />
                    <div className="chat-details text-start w-100">
                      <strong className="mt-2">Khaled</strong>
                      <p>
                        <i class="fas fa-check text-success icon-user-list"></i>{" "}
                        friend
                      </p>
                    </div>
                    <i class="far fa-trash-can text-danger icon-user-list"></i>
                  </div>
                </div>
                {/* user request list */}
                <div
                  className={
                    showRequestList === "requests-list"
                      ? "user-requests-list active"
                      : "user-requests-list"
                  }
                >
                  <div className="answer-friends-request-area w-100">
                    <p className="fw-bold mb-2">Friends requests :</p>
                    {/* request 1 */}
                    <div
                      className="friends-section gap-auto mb-2 "
                      style={{ width: "100%" }}
                    >
                      <img
                        src={userThree}
                        className="chat-avatar shadow-4-strong p-1"
                        alt="chat"
                      />
                      <div className="chat-details w-100 text-start">
                        <strong className="mt-2">Faycel</strong>
                        <p className="row-center">
                          <i class="fas fa-clock"></i> waiting
                        </p>
                      </div>
                      <div className="d-flex flex-row w-100 justify-content-end align-items-end gap-2">
                        <button className="btn btn-success">
                          <i class="fas fa-circle-check text-light icon-user-list"></i>
                        </button>
                        <button className="btn btn-danger">
                          <i class="far fa-trash-can text-light icon-user-list"></i>
                        </button>
                      </div>
                    </div>
                    {/* request 2 */}
                    <div
                      className="friends-section mb-2"
                      style={{ width: "100%" }}
                    >
                      <img
                        src={userThree}
                        className="chat-avatar shadow-4-strong p-1"
                        alt="chat"
                      />
                      <div className="chat-details w-100 text-start">
                        <strong className="mt-2">Khaled</strong>
                        <p className="row-center">
                          <i class="fas fa-clock"></i> waiting
                        </p>
                      </div>
                      <div className="d-flex flex-row justify-content-start align-items-start gap-2">
                        <button className="btn btn-success">
                          <i class="fas fa-circle-check text-light icon-user-list"></i>
                        </button>
                        <button className="btn btn-danger">
                          <i class="far fa-trash-can text-light icon-user-list"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="send-friend-request-area w-100">
                    <p className="fw-bold mb-2">You may know :</p>
                    {/* user 1 */}
                    <div
                      className="friends-section gap-auto mb-2"
                      style={{ width: "100%" }}
                    >
                      <img
                        src={userThree}
                        className="chat-avatar shadow-4-strong p-1"
                        alt="chat"
                      />
                      <div className="chat-details w-100 text-start">
                        <strong className="mt-2">John</strong>
                        <p>
                          <i class="fas fa-user-plus text-primary"></i> user
                        </p>
                      </div>
                      <button className="btn btn-primary d-flex flex-row gap-1 justify-content-center align-items-center">
                        <i class="fas fa-user-plus text-light"></i> Add
                      </button>
                    </div>
                  </div>
                </div>
                {/* create post area start */}
                <div
                  className={
                    showRequestList === "create-post"
                      ? "create-post-list w-100 active"
                      : "create-post-list"
                  }
                >
                  <p className="fw-bold mb-2">Let's create your post :</p>
                  <div className="alert alert-warning">
                    Please chose your image first to see however it is suitable
                    with your post
                  </div>
                  <form className="d-flex flex-column justify-content-center align-items-center post-form gap-1">
                    {/* Display image from input file */}
                    {fileUrl && (
                      <div className="image-display-area w-100 p-2 mb-4">
                        {/* Remove post image */}
                        <span
                          className="close-preview-post-image"
                          onClick={closePostImage}
                        >
                          X
                        </span>
                        {fileUrl && (
                          <img
                            src={fileUrl}
                            className="preview-image"
                            alt="Preview"
                          />
                        )}
                      </div>
                    )}
                    {/* User post text area */}
                    <div className="form-floating w-100">
                      <textarea
                        className="form-control h-100"
                        cols={59}
                        id="post-input"
                        rows={6}
                        data-mdb-input-init
                        style={{ resize: "none" }}
                        onChange={removeDisabledClass}
                      ></textarea>
                      <label className="form-label" for="textAreaExample">
                        What's on your mind...😊
                      </label>
                    </div>
                    {/* post file + submit btns */}
                    <div className="d-flex flex-row justify-content-between align-items-center p-2 post-btns-parent">
                      <label
                        className="d-flex flex-row justify-content-center align-items-center gap-2 post-image-btn"
                        htmlFor="image-file"
                      >
                        <input
                          type="file"
                          className="d-none"
                          id="image-file"
                          onChange={displayPostImage}
                          accept="image/*"
                          ref={fileInput}
                        />
                        <i class="far fa-image"></i> Photos
                      </label>
                      <button
                        type="submit"
                        className="btn post-btn btn-dark disabled"
                        ref={postBtn}
                      >
                        post
                      </button>
                    </div>
                  </form>
                  <hr />
                  {/* my posts aria start */}
                  <div className="w-100 d-flex justify-content-center align-items-center">
                    <p
                      className="my-posts-btn"
                      onClick={() => {
                        setShowPostsSection(true);
                        // Scroll to the top of the page
                        window.scroll({
                          top: 0,
                          behavior: "smooth", // Optional: Smooth scrolling behavior
                        });
                      }}
                    >
                      <i className="fas fa-pen-clip"></i> My posts
                    </p>
                  </div>
                  <div
                    className={
                      showPostsSection ? "my-posts  active" : "my-posts"
                    }
                  >
                    {/* posts area goes here */}
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <p className="f-bold">Manage your posts</p>
                      <i
                        class="fas fa-xmark close-modal"
                        onClick={() => {
                          setShowPostsSection(false);
                        }}
                      ></i>
                    </div>
                    <br />
                    {/* post example */}
                    <div
                      className="card-items shadow-4-strong"
                      data-name="Hamid Tlailia"
                    >
                      {/* card top-logo */}
                      <div className="logo">
                        <img
                          src={avatar_tow}
                          className="shadow-4-strong "
                          alt=""
                          style={{ zIndex: "1000" }}
                        />
                      </div>
                      {/* user post name */}
                      <h4>Hamid Tlailia</h4>
                      {/* post date */}
                      <p>posted : 2 hours ago</p>
                      {/* post content */}
                      <p className="post-body  text-left">
                        This is an example for the first post body and u can
                        share this post when u click the share button bellow :
                      </p>
                      <img
                        src={logo}
                        className="position-relative w-100 post-image"
                        alt=""
                      />
                      {/* likes number + comments */}
                      <div className="d-flex flex-row justify-content-between align-items-center mt-2 mb-3 w-100">
                        <span className="d-flex flex-row justify-content-start align-items-center ">
                          <i class="fas fa-heart text-danger me-1 mt-1"></i>you
                          and 120 others
                        </span>
                        <span className="d-flex flex-row justify-content-start align-items-center ">
                          2 comments
                        </span>
                      </div>
                      {/* reactions btns container */}
                      <div className="card shadow-2-strong rounded-5 p-3 d-flex flex-row justify-content-center align-items-center gap-3 mb-2">
                        <NavLink
                          to="/posts/details/225L7PKKV25CC"
                          className="btn btn-primary btn-floating"
                        >
                          <i class="far fa-eye"></i>
                        </NavLink>
                        <button
                          className="btn btn-success btn-floating"
                          onClick={editPost}
                        >
                          <i class="fas fa-pen-clip"></i>
                        </button>
                        <button className="btn btn-danger btn-floating">
                          <i class="far fa-trash-can"></i>
                        </button>
                      </div>

                      {/* comments container */}
                      <div className="comments mt-3 h-100">
                        {/* comment 1 */}
                        <div className="all-flex-row w-100">
                          <div className="badge-comment  bg-dark text-light ">
                            I
                          </div>
                          <div className="all-flex-col">
                            <strong className="mt-1">Isra Mansour</strong>
                            <p className="comment-body">
                              i love this post ! <mark>1 hrs ago</mark>
                            </p>
                          </div>
                          <i class="far fa-trash-can mt-4 text-danger ms-1"></i>
                        </div>
                        {/* comment 2 */}
                        <div className="all-flex-row w-100">
                          <div className="badge-comment  bg-dark text-light ">
                            K
                          </div>
                          <div className="all-flex-col">
                            <strong className="mt-1">Khaled Jouablia</strong>
                            <p className="comment-body">
                              it's very amazin... <mark>25 min ago</mark>
                            </p>
                          </div>
                          <i class="far fa-trash-can mt-4 text-danger ms-1"></i>
                        </div>
                      </div>
                      {/* edit post section */}
                      <div
                        className={
                          showEditPostAria
                            ? "edit-post-section show"
                            : "edit-post-section"
                        }
                      >
                        <div className="edit-post-content">
                          <div className="d-flex card-header flex-row justify-content-between align-items-center bg-secondary pb-0 p-1">
                            <p className="f-bold mt-2 text-light">Edit post</p>
                            <i class="fas fa-pen-to-square text-success"></i>
                          </div>
                          {/* display preview image */}
                          {editableImageSrc !== "" && (
                            <div className="mb-2">
                              <span
                                className="close-edit-image"
                                onClick={() => {
                                  setEditableImageSrc("");
                                }}
                              >
                                X
                              </span>
                              <img
                                src={editableImageSrc}
                                className="position-relative w-100 post-image"
                                alt=""
                              />
                            </div>
                          )}
                          {/* post body */}
                          <div className="card-body">
                            <div className="card-body  mt-1">
                              <div className="form-floating w-100">
                                <textarea
                                  className="form-control h-50"
                                  cols={59}
                                  id="post-input"
                                  rows={6}
                                  data-mdb-input-init
                                  style={{ resize: "none" }}
                                  value={getEditableText}
                                    onChange={(e) => {
                                    setGetEditableText(e.target.value);
                                  }}
                                  ref={textarea}
                                ></textarea>
                                <label className="form-label" for="post-input">
                                  What you thinking in...😊
                                </label>
                              </div>
                            </div>

                            <div className="d-flex justify-content-center align-items-center mt-3 w-100 text-light">
                              <div className="bg-secondary p-2 rounded-5 cursor-pointer">
                                <label
                                  htmlFor="image"
                                  className="cursor-pointer"
                                >
                                  <i class="fas fa-images text-primary me-1"></i>
                                  upload other image
                                </label>
                                <input
                                  type="file"
                                  id="image"
                                  className="d-none"
                                  accept="image/*"
                                  onChange={displayEditableImage}
                                />
                              </div>
                            </div>
                          </div>
                          {/* submit - cancel btns */}
                          <div className="card-footer p-2 d-flex justify-content-end mt-5">
                            <button className="btn btn-success me-2 btn-floating">
                              <i class="fas fa-check"></i>
                            </button>
                            <button
                              className="btn btn-danger btn-floating"
                              onClick={() => {
                                setShowEditPostAria(false);
                              }}
                            >
                              <i class="fas fa-xmark"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* my posts aria end */}
                </div>
                {/* create post area end */}
              </div>
              {/* lists area end */}
            </div>
          </div>
          {/* friends list area end */}
        </div>
        {/* Logout btn */}

        <div className="logout-section">
          <p className="mt-3 fw-bold">Logout :</p>
          <button class="Btn" onClick={logOut}>
            <div class="sign">
              <svg viewBox="0 0 512 512">
                <path
                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9
     406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 
     14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 
     256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64
      0c17.7 0 32 
    14.3 32 32s-14.3 32-32 32z"
                ></path>
              </svg>
            </div>
            <div class="text">Logout</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
