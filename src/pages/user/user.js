import React, { useEffect, useState } from "react";
// import css file
import "./user.css";
// import user image
import userThree from "../public/images/user3.png";

const User = () => {
  // set a state for changing update and validate button display
  const [updateName, setUpdateName] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  // set states for friends list and friends request to toggle show
  const [showRequestList, setShowRequestList] = useState(false);
  // show/hide friends list modal state
  const [showModal, setShowModal] = useState(false);
  // starting with change page title
  useEffect(() => {
    document.title = "Hamidos | Profile";
  }, []);

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
            <img
              src={userThree}
              className="profile-avatar shadow-4-strong p-1 me-1"
              alt="chat"
            />
            <span
              className="text-primary p-2 shadow-2"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              <i class="fas fa-list"></i> friends list
            </span>
          </div>
          {/* select or remove current image */}
          <div className="d-flex flex-column flex-lg-row flex-md-row justify-content-center align-items-start gap-2 change-image">
            <label
              htmlFor="file"
              className="btn btn-light text-dark remove-select"
            >
              Select new photo
            </label>
            <button className="btn btn-danger text-light remove-select">
              Remove photo
            </button>
            <input type="file" id="file" className="d-none" />
          </div>
          <hr />
          {/* name and email address update form */}
          <form className="d-flex flex-column">
            <label className="label">Name :</label>
            <div className="d-flex flex-row gap-2 justify-content-center align-items-center update-area mb-4">
              <input
                type="text"
                className={
                  updateName ? "name-input inputs update" : "name-input inputs"
                }
                id="name"
                placeholder="Hamidos"
              />
              <i
                className="far fa-pen-to-square"
                onClick={(e) => {
                  setUpdateName(!updateName);
                  !updateName &&
                    e.target.parentNode.querySelector("#name").focus();
                }}
              ></i>
              {updateName && (
                <i className="far fa-circle-check fs-4 text-success"></i>
              )}
            </div>
            <label className="label">Email :</label>
            <div className="d-flex flex-row gap-2 justify-content-center align-items-center update-area">
              <input
                type="email"
                id="email"
                className={
                  updateEmail
                    ? "email-input inputs update"
                    : "email-input inputs"
                }
                placeholder="tlailia757@gmail.com"
              />
              <i
                className="far fa-pen-to-square"
                onClick={(e) => {
                  setUpdateEmail(!updateEmail);
                  !updateEmail &&
                    e.target.parentNode.querySelector("#email").focus();
                }}
              ></i>
              {updateEmail && (
                <i className="far fa-circle-check fs-4 text-success"></i>
              )}
            </div>
          </form>
          {/* update password form */}
          <hr />
          <div className="password-update-area">
            <h5>Update password :</h5>
            <p>
              ensure your account is using a long rondom password to stay secure
            </p>
            <form className="d-flex flex-column flex-lg-row flex-md-row justify-content-start gap-3 align-items-start">
              <input
                type="text"
                className="password-input"
                placeholder="Old password"
              />
              <input
                type="text"
                className="password-input"
                placeholder="New password"
              />
              <button className="btn btn-primary">save</button>
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
                  setShowModal(!showModal);
                }}
              ></i>
            </div>
            <hr />
            {/* friends list container */}
            <div className="friends-list-container">
              <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                <button
                  className="lists-nav-btns w-50"
                  onClick={() => {
                    setShowRequestList(false);
                  }}
                >
                  Friends list
                </button>
                <button
                  className="lists-nav-btns w-50"
                  onClick={() => {
                    setShowRequestList(true);
                  }}
                >
                  Requests
                </button>
              </div>
              {/* lists are start*/}
              <div className="lists-area">
                {/* user friends list */}
                <div
                  className={
                    showRequestList
                      ? "user-friends-list"
                      : "user-friends-list active"
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
                      <strong className="mt-2">Hiba</strong>
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
                    showRequestList
                      ? "user-requests-list active"
                      : "user-requests-list"
                  }
                >
                  <div className="answer-friends-request-area w-100">
                    <p className="fw-bold mb-2">Friends requests :</p>
                    {/* request 1 */}
                    <div className="friends-section gap-auto mb-2 " style={{width:'100%'}}>
                      <img
                        src={userThree}
                        className="chat-avatar shadow-4-strong p-1"
                        alt="chat"
                      />
                      <div className="chat-details w-100 text-start">
                        <strong className="mt-2">Hiba</strong>
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
                    <div className="friends-section gap-auto mb-2" style={{width:'100%'}}>
                      <img
                        src={userThree}
                        className="chat-avatar shadow-4-strong p-1"
                        alt="chat"
                      />
                      <div className="chat-details w-100 text-start">
                        <strong className="mt-2">Khaled</strong>
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
              </div>
              {/* lists area end */}
            </div>
          </div>
          {/* friends list area end */}
        </div>
        {/* Logout btn */}

        <div className="logout-section">
          <p className="mt-3 fw-bold">Logout :</p>
          <button class="Btn">
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
