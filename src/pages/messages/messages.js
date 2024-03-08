import React, { useEffect, useRef, useState } from "react";
// import css file
import "./messages.css";
// import users avatars
import userOne from "../public/images/user1.png";
import userTow from "../public/images/user2.png";
import userThree from "../public/images/user3.png";
import userFour from "../public/images/user4.png";
import userFive from "../public/images/user5.png";
// import emoji picker
import EmojiPicker from "emoji-picker-react";
// import toast modal
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import message photo example
import photo from "../public/images/fleurs.jpeg";
import { NavLink } from "react-router-dom";
// import verified icon
import verified from "../public/images/téléchargement.png";

const Messages = () => {
  // left side bar state
  const [getSideBar, setGetSideBar] = useState(false);
  // starting with change page title
  useEffect(() => {
    document.title = "Hamidos | Messages";
  }, []);
  // states for emoji and message
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // video call section state hide and show
  const [showCallSection, setShowCallSection] = useState(false);
  // reply sent or received messgae states
  const [replySentMessage, setReplySentMessage] = useState("");
  const [replyReceivedMessage, setReplyReceivedMessage] = useState("");
  const [replyImageMessage, setReplyImageMessage] = useState(null);
  // user profile show/hide state
  const [showProfile, setShowProfile] = useState(false);
  // photo modal show/hide state
  const [showModal, setShowModal] = useState(false);
  // photo modal image src state
  const [modalImageSrc, setModalImageSrc] = useState("");
  // show/hide message image modal state
  const [getMessageModal, setGetMessageModal] = useState(false);
  // preview image src state
  const [fileUrl, setFileUrl] = useState("");
  // use a state to chek if selected image is a message or profile image for reason to hide reactions aria in profile photo
  // and display them in message photo only
  const [isMessagePhoto, setIsMessagePhoto] = useState(false);
  // prevouis chat reference for reverse chats usage
  const previous = useRef(null);
  // filter previous chat by name

  const filterUsersByName = (e) => {
    const input_value = e.target.value;
    const chats = document.querySelectorAll(".chat");
    if (chats) {
      // show not found labem if no reqult match the input value
      chats.forEach((chat) => {
        const chat_lower_name = chat.querySelector("strong").innerText;
        if (
          chat_lower_name
            .toLocaleLowerCase()
            .includes(input_value.toLocaleLowerCase())
        ) {
          document.querySelector(".no-result").innerHTML = "";
        } else {
          document.querySelector(".no-result").innerHTML = "No result found";
        }
      });

      // show posts if name equal to input value and hide enequal posts
      for (let i = 0; i < chats.length; i++) {
        const chat_name = chats[i].querySelector("strong").innerText;
        if (chat_name.toLowerCase().includes(input_value.toLocaleLowerCase())) {
          chats[i].style.display = "flex";
        } else {
          chats[i].style.display = "none";
        }
      }
    }
  };

  // Reverse chat from down to top and reverse
  const reverseChat = () => {
    const reversed_chat = previous.current;
    if (reversed_chat) {
      reversed_chat.classList.toggle("reverse");
    }
  };
  // push emoji inside message state
  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.emoji);
  };

  // get chat btn to  auto focus when user click reply btn
  const chat_btn = useRef(null);

  // handle reply for himself

  const handleReplySentMessage = (e) => {
    // set scroll to true to make auto scroll for chat footer
    chat_btn.current.focus();
    const sent_message =
      e.target.parentNode.parentNode.querySelector(".initial-message");
    if (sent_message) {
      setReplySentMessage(sent_message.innerText);
      setReplyReceivedMessage("");
      setReplyImageMessage(null);
    } else {
      setReplySentMessage("Something went wrong");
      setReplyReceivedMessage("");
      setReplyImageMessage(null);
    }
  };

  // handle reply for a received message

  const handleReplyReceivedMessage = (e) => {
    // set scroll to true to make auto scroll for chat footer
    chat_btn.current.focus();
    const received_message =
      e.target.parentNode.parentNode.parentNode.querySelector(
        ".initial-message"
      );
    if (received_message) {
      setReplyReceivedMessage(received_message.innerText);
      setReplySentMessage("");
      setReplyImageMessage(null);
    } else {
      setReplyReceivedMessage("Something went wrong");
      setReplySentMessage("");
      setReplyImageMessage(null);
    }
  };
  // Hnadle reply message image
  const replyPhoto = (e) => {
    chat_btn.current.focus();
    setShowModal(false);
    const imageSRC =
      e.target.parentNode.parentNode.parentNode.querySelector(".message-photo");
    if (imageSRC) {
      setReplyImageMessage(imageSRC.src);
      setReplyReceivedMessage("");
      setReplySentMessage("");
    } else {
      setReplyImageMessage("error");
      setReplyReceivedMessage("");
      setReplySentMessage("");
    }
    setIsMessagePhoto(false);
  };

  // get profile func
  const getProfile = () => {
    setShowProfile(true);
  };

  // preview image from input file
  const displayPostImage = (event) => {
    // get input file value
    const selectedFile = event.target.files[0];

    // Create object URL for the selected file
    const objectUrl = URL.createObjectURL(selectedFile);
    // push image src inside file url state
    if (selectedFile) {
      setFileUrl(objectUrl);
      setGetMessageModal(true);
    }
  };
  // get hidden a for downloading image
  const downloadImageSRC = useRef(null);
  // download image func

  const download = () => {
    if (downloadImageSRC.current) {
      downloadImageSRC.current.click();
    }
    setIsMessagePhoto(false);
  };

  // send message btn func
  const handleMessage = (e) => {
    e.preventDefault();
    if (message.trim().length === 0) {
      toast.error("please type a word to send");
    } else {
      // handle register message logic here
    }
  };

  // emoji aria hide once user click outside
  const emojisAria = useRef(null);
  const emojisDisplayBtn = useRef(null);
  window.onclick = (event) => {
    if (emojisAria.current && emojisDisplayBtn.current) {
      if (
        event.target !== emojisDisplayBtn.current &&
        !emojisAria.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }
  };
  return (
    // messages area parent
    <div className="messages-area-parent">
      {/* messages container ==> leftSideBar + chatBox */}
      <div className="messages-container flex-center ">
        {/*left side bar */}
        <div
          className={
            getSideBar
              ? "left-bar  text-center active"
              : "left-bar  text-center"
          }
          style={{ backgroundColor: "whitesmoke" }}
          onClick={() => {
            setShowEmojiPicker(false);
          }}
        >
          {/* top title */}
          <div className="flex-center p-2 fs-5">
            <h4 className="fw-bold">Chat Room</h4>
            <i
              class="fas fa-arrow-down-z-a"
              onClick={reverseChat}
              style={{ cursor: "pointer" }}
              title="reverse chats"
            ></i>
          </div>
          {/* search area form */}
          <form className="form center">
            <input
              type="search"
              placeholder="Search"
              onChange={filterUsersByName}
            />
            <i class="fas fa-magnifying-glass"></i>
          </form>
          {/* online users start */}
          <div className="online-users">
            {/* user 1 */}
            <div className="user">
              <img
                src={userOne}
                className="avatar shadow-5-strong"
                alt="user"
              />
              <span className="user-badge"></span>
            </div>
            {/* user 2 */}
            <div className="user">
              <img
                src={userTow}
                className="avatar shadow-5-strong"
                alt="user"
              />
              <span className="user-badge"></span>
            </div>
            {/* user 3 */}
            <div className="user">
              <img
                src={userThree}
                className="avatar shadow-5-strong"
                alt="user"
              />
              <span className="user-badge"></span>
            </div>
            {/* user 4 */}
            <div className="user">
              <img
                src={userFour}
                className="avatar shadow-5-strong"
                alt="user"
              />
              <span className="user-badge"></span>
            </div>
            {/* user 5 */}
            <div className="user">
              <img
                src={userFive}
                className="avatar shadow-5-strong"
                alt="user"
              />
              <span className="user-badge"></span>
            </div>
          </div>
          {/* online users end */}
          {/* previous-chat area start */}
          <div className="previous-chat" ref={previous}>
            {/* chat 1 */}
            <div
              className="chat"
              onClick={() => {
                setGetSideBar(!getSideBar);
              }}
            >
              <img
                src={userThree}
                className="chat-avatar shadow-4-strong p-1"
                alt="chat"
              />
              <div className="chat-details w-100 text-start">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                  <strong>Hamidos</strong>
                  <mark className="rounded-5">2 min</mark>
                </div>
                <p>this is what i told you last time about it</p>
              </div>
            </div>
            {/* chat 2 */}
            <div className="chat">
              <img
                src={userFive}
                className="chat-avatar shadow-4-strong p-1"
                alt="chat"
              />
              <div className="chat-details w-100 text-start">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                  <strong>Faycel</strong>
                  <mark className="rounded-5">1 hrs</mark>
                </div>
                <p>this is what i told you last time about it</p>
              </div>
            </div>
            {/* chat 3 */}
            <div className="chat">
              <img
                src={userOne}
                className="chat-avatar shadow-4-strong p-1"
                alt="chat"
              />
              <div className="chat-details w-100 text-start">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                  <strong>Khaled</strong>
                  <mark className="rounded-5">25 min</mark>
                </div>
                <p>this is what i told you last time about it</p>
              </div>
            </div>
            {/* chat 4 */}
            <div className="chat">
              <img
                src={userTow}
                className="chat-avatar shadow-4-strong p-1"
                alt="chat"
              />
              <div className="chat-details w-100 text-start">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                  <strong>Sarra</strong>
                  <mark className="rounded-5">1 month</mark>
                </div>
                <p>this is what i told you last time about it</p>
              </div>
            </div>
            {/* chat 5 */}
            <div className="chat">
              <img
                src={userFour}
                className="chat-avatar shadow-4-strong p-1"
                alt="chat"
              />
              <div className="chat-details w-100 text-start">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                  <strong>Sonia</strong>
                  <mark className="rounded-5">2 days</mark>
                </div>
                <p>this is what i told you last time about it</p>
              </div>
            </div>
          </div>
          {/* area search not found label */}
          <div
            className="no-result text-info fs-4"
            style={{
              position: "absolute",
              top: "29vh",
              zIndex: "1",
              left: "15vh",
            }}
          ></div>
          {/* previous-chat area end */}
        </div>
        {/* chat box start */}
        <div
          className={
            getSideBar
              ? "chat-box text-align-left   active h-100"
              : "chat-box text-align-left h-100"
          }
        >
          {/* chatBox header */}
          <div className="card-header chat-header">
            <div className="user-details">
              <i
                class="fas fa-arrow-left-long me-2 d-flex d-lg-none d-md-none get-side-bar"
                onClick={() => {
                  setGetSideBar(!getSideBar);
                }}
              ></i>
              <img
                src={userThree}
                className="chat-avatar shadow-4-strong p-1 me-1"
                alt="chat"
              />
              <div className="chat-details w-100 text-start">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                  <strong className="pt-3">Hamidos</strong>
                </div>
                <p>online</p>
              </div>
            </div>
            {/* call btns */}
            <div className="d-flex flex-row justify-content-center align-items-center call-center shadow-2-strong">
              <i
                class="fas fa-phone  border-end"
                title="Audio call"
                onClick={() => {
                  setShowCallSection(true);
                }}
              ></i>
              <i
                class="far fa-circle-user text-primary"
                title="Profile"
                onClick={getProfile}
              ></i>
            </div>
          </div>
          {/* chat box body */}
          <div className="card-body chat-body">
            {/* sender message */}
            <div className="sender">
              <span className="d-flex flex-row justify-content-center  align-items-center gap-3 message-sender-options">
                <i class="fas fa-heart text-danger" title="Like message"></i>
                <i
                  class="fas fa-reply text-primary"
                  title="Reply message"
                  onClick={handleReplySentMessage}
                ></i>
                <i
                  class="fas fa-clone text-warning"
                  title="Copy message"
                  onClick={(e) => {
                    navigator.clipboard
                      .writeText(
                        e.target.parentNode.parentNode.querySelector(
                          ".initial-message"
                        ).innerText
                      )
                      .then(toast.success("Message successfully copied"));
                  }}
                ></i>
                <i
                  class="fas fa-trash-can text-danger"
                  title="Delete message"
                ></i>
              </span>
              <p className="sender-message mb-0 initial-message">
                this is a sender message
              </p>
              <span className="d-flex justify-content-end align-items-center time">
                23 min ago{" "}
              </span>
            </div>
            {/* receiver message */}
            <div className="receiver">
              <p className="receiver-message mb-0">
                <span className=" message-receiver-options">
                  <div className="options">
                    <i
                      class="fas fa-heart text-danger"
                      title="Like message"
                    ></i>
                    <i
                      class="fas fa-reply text-primary"
                      title="Reply message"
                      onClick={handleReplyReceivedMessage}
                    ></i>
                    <i
                      class="fas fa-clone text-warning"
                      title="Copy message"
                      onClick={(e) => {
                        navigator.clipboard
                          .writeText(
                            e.target.parentNode.parentNode.parentNode.querySelector(
                              ".initial-message"
                            ).innerText
                          )
                          .then(toast.success("Message successfully copied"));
                      }}
                    ></i>
                    <i
                      class="fas fa-trash-can text-danger"
                      title="Delete message"
                    ></i>
                  </div>
                </span>
                <span className="initial-message p-0">
                  {" "}
                  this is a receiver message
                </span>
              </p>
              <span className="d-flex justify-content-end align-items-center time">
                2 hrs ago{" "}
              </span>
            </div>
            {/* Reply himself's message */}
            <div className="sender">
              <p className="sender-message mb-0 d-flex flex-column justify-content-center align-items-start">
                <div className="alert alert-success border-green p-1 mb-0">
                  <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                    <span className="text-success fw-bold">You</span>
                  </div>
                  <span>This is a sender message</span>
                </div>
                <span className="ms-2">User reply himself</span>
              </p>
              <span className="d-flex justify-content-end align-items-center time">
                23 min ago{" "}
              </span>
            </div>
            {/* Reply receiver's message */}
            <div className="receiver">
              <p className="receiver-message mb-0 d-flex flex-column justify-content-center align-items-start">
                <div className="alert alert-secondary border-green p-1 mb-0">
                  <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                    <span className="text-success fw-bold">You</span>
                  </div>
                  <span>This is a sender message</span>
                </div>
                <span className="ms-2">User got reply from receiver </span>
              </p>
              <span className="d-flex justify-content-end align-items-center time">
                2 hrs ago{" "}
              </span>
            </div>
            {/* sender reply a received message */}
            <div className="sender">
              <p className="receiver-message mb-0 d-flex flex-column justify-content-center align-items-start">
                <div className="alert alert-secondary border-secondary p-1 mb-0">
                  <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                    <span className="text-secondary fw-bold">Sarra</span>
                  </div>
                  <span>This is a receiver message</span>
                </div>
                <span className="ms-2">User reply a received message </span>
              </p>
              <span className="d-flex justify-content-end align-items-center time">
                23 min ago{" "}
              </span>
            </div>
            {/* receiver message */}
            <div className="receiver">
              <p className="receiver-message mb-0">
                this is a liked message
                <span className="liked-message">❤️</span>
              </p>
              <span className="d-flex justify-content-end align-items-center time">
                2 hrs ago{" "}
              </span>
            </div>
            {/* sender message */}
            <div className="sender">
              <p
                className="sender-message mb-0"
                onClick={(e) => {
                  setShowModal(!showModal);
                  setModalImageSrc(
                    e.target.parentNode.querySelector(".message-photo").src
                  );
                  setIsMessagePhoto(true);
                }}
              >
                <img
                  src={photo}
                  className="message-photo"
                  width={200}
                  height={200}
                  alt="message"
                  style={{ cursor: "pointer" }}
                />
                {/* hidden a element for downloading image */}
                <a
                  href={photo}
                  className="d-none"
                  ref={downloadImageSRC}
                  download={photo}
                ></a>
              </p>
              <span className="d-flex justify-content-end align-items-center time">
                23 min ago{" "}
              </span>
            </div>
            {/* receiver message */}
            <div className="receiver">
              <p className="receiver-message mb-0">
                this is a receiver message
              </p>
              <span className="d-flex justify-content-end align-items-center time">
                2 hrs ago{" "}
              </span>
            </div>
          </div>
          {/* chat box footer */}
          <div className="card-footer chat-footer  p-3">
            {/* replied message and images area */}
            {
              // check if sender reply himself's message
              replySentMessage !== "" && (
                <div className="alert alert-dark border-green">
                  <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                    <span className="text-success">You</span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setReplySentMessage("");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        // set scroll to false to close auto scroll for chat footer
                      }}
                    >
                      X
                    </span>
                  </div>
                  {replySentMessage}{" "}
                </div>
              )
            }
            {
              // check if sender reply received message
              replyReceivedMessage !== "" && (
                <div className="alert alert-dark   border-secondary">
                  <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                    <span className="text-secondary">Sarra</span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setReplyReceivedMessage("");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        // set scroll to false to close auto scroll for chat footer
                      }}
                    >
                      X
                    </span>
                  </div>
                  {replyReceivedMessage}{" "}
                </div>
              )
            }
            {/* reply a message photo area */}

            {
              // check message photo state
              replyImageMessage !== null && replyImageMessage !== "error" && (
                // message reply section
                <div className="alert alert-dark d-flex flex-row justify-content-between align-items-center border-green">
                  {/* name + message type section */}
                  <div className="d-flex flex-column justify-content-start align-items-start gap-1">
                    <span>You</span>
                    <span>
                      <i className="far fa-image"></i> Photo
                    </span>
                  </div>
                  {/* photo display area */}
                  <img
                    src={replyImageMessage}
                    width={80}
                    alt="preview-message-photo"
                  />
                  <span
                    className="close-reply"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setReplyImageMessage(null);
                    }}
                  >
                    <i className="fas fa-xmark"></i>
                  </span>
                </div>
              )
            }
            {/* message form */}
            <form className="message-form" onSubmit={handleMessage}>
              {/* Epmty input message error handler */}

              <div className="d-flex flex-row justify-content-between align-items-center gap-2 icons">
                <input
                  className="message-input"
                  value={message}
                  ref={chat_btn}
                  type="text"
                  placeholder="Tape message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  onFocus={() => {
                    setShowEmojiPicker(false);
                  }}
                />

                {/* emoji picker react */}
                {showEmojiPicker && (
                  <div className="emoji" ref={emojisAria}>
                    <EmojiPicker
                      className="picker"
                      onEmojiClick={handleEmojiSelect}
                    />
                  </div>
                )}

                <i
                  class="far fa-face-grin text-warning"
                  ref={emojisDisplayBtn}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                ></i>
                <label htmlFor="file">
                  <i class="fas fa-image text-dark me-3 "></i>
                </label>
                <input
                  type="file"
                  id="file"
                  className="d-none"
                  accept="image/*"
                  onChange={displayPostImage}
                />
              </div>
              <button className="message-btn" type="submit">
                <i class="fas fa-arrow-up"></i>
              </button>
            </form>
          </div>
          {/* friend profile infos area start */}
          <div
            className={
              showProfile
                ? "friend-profile-section show"
                : "friend-profile-section"
            }
          >
            <div className="w-100 text-start">
              <i
                class="fas fa-arrow-left-long"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowProfile(false);
                }}
              ></i>
            </div>
            <div className="user-infos-center">
              {/* user avatar */}
              <div
                data-src={userThree}
                onClick={(e) => {
                  setShowModal(true);
                  setModalImageSrc(e.target.getAttribute("data-src"));
                }}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={userThree}
                  className="profile-avatar  shadow-4-strong p-1 me-1 mb-4"
                  alt="chat"
                  title="Preview image"
                />
              </div>
              <p className="fw-bold fs-3  mb-0 d-flex flex-row justify-content-center align-items-center">
                <span>Hamidos</span>
                <img src={verified} width={40} alt="verified" />
              </p>
              <div className="shadow-2 d-flex flex-row justify-content-center align-items-center p-3 rounded-5 gap-2 mb-0">
                <button
                  className="btn btn-light btn-floating text-dark"
                  onClick={() => {
                    setShowCallSection(!showCallSection);
                    setShowProfile(!showProfile);
                  }}
                >
                  <i class="fas fa-phone"></i>
                </button>
                <button className="btn btn-light btn-floating text-dark">
                  <i class="fas fa-video"></i>
                </button>
                <button className="btn btn-light btn-floating text-dark">
                  <i class="fas fa-user-check text-success"></i>
                </button>
                <NavLink to="/profile">
                  <button className="btn btn-light btn-floating text-dark">
                    <i class="fas fa-list text-primary"></i>
                  </button>
                </NavLink>
              </div>
              <hr />
              <div className="d-flex flex-column border-top border-dark p-2 justify-content-start align-items-start w-100">
                <p className="fw-bold text-primary mb-0">Followers :</p>
                <p className="mb-3">
                  You following <span className="fw-bold">Hamidos</span>
                </p>
                <p className="fw-bold text-primary mb-0">
                  Theme :{" "}
                  <span className="badge bg-info">
                    <i class="fas fa-check"></i> Default
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* friend profile infos area end */}
          {/* photo modal area start */}
          <div
            className={showModal ? "photo-modal show p-2" : "photo-modal p-2"}
          >
            <div className="d-flex flex-row justify-content-between align-items-center mb-2 w-100">
              <span>Preview</span>
              <i
                class="fas fa-xmark text-danger rounded border p-2 border-danger"
                onClick={() => {
                  setShowModal(false);
                  setIsMessagePhoto(false);
                }}
              ></i>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
              {modalImageSrc !== "" ? (
                <img
                  src={modalImageSrc}
                  className="img-fluid message-photo w-auto h-auto mb-4"
                  alt="preview"
                />
              ) : (
                <span>No SRC available for this image</span>
              )}
              {/* image reaction + reply + delete and download area ===> display only in message images*/}
              {isMessagePhoto && (
                <div className="card w-75 reply-section mb-5">
                  {/* reply image message area start */}
                  {/* hide reactions area once reactions container clicked */}
                  <div className="reply">
                    <i
                      className="fas fa-heart text-danger"
                      onClick={() => {
                        setIsMessagePhoto(false);
                        setShowModal(false);
                      }}
                    ></i>
                    <i
                      className="fas fa-reply text-primary"
                      title="Reply message"
                      onClick={replyPhoto}
                    ></i>
                    {/* download image icon */}
                    <i
                      className="fas fa-arrow-down text-warning"
                      title="Download image"
                      onClick={download}
                    ></i>
                    <i
                      className="fas fa-trash-can text-danger"
                      onClick={() => {
                        setIsMessagePhoto(false);
                        setShowModal(false);
                      }}
                    ></i>
                  </div>
                  {/* reply image message area end */}
                </div>
              )}
            </div>
          </div>

          {/* photo modal area end */}
          {/* message photo modal start */}

          <div
            className={
              getMessageModal
                ? "photo-modal show bg-night p-2 "
                : "photo-modal  p-2"
            }
          >
            {/* modal header control */}
            <div className="d-flex flex-row card-header p-2 justify-content-between align-items-center mb-2 w-100">
              <span className="text-info">
                <i class="far fa-image text-info"></i> Hamidos
              </span>
              <i
                class="fas fa-xmark text-danger rounded border p-2 border-danger"
                onClick={() => {
                  setGetMessageModal(false);
                }}
              ></i>
            </div>
            {/* image area */}
            <div className="card-body d-flex justify-content-center align-items-center w-100">
              {fileUrl && (
                <img
                  src={fileUrl}
                  className="image-message w-auto"
                  alt="Preview"
                />
              )}
            </div>
            {/* message area */}
            <div className=" w-100 p-2">
              <form className="image-message-form active border">
                <input
                  type="text"
                  className="image-message-input"
                  placeholder="Add caption..."
                />
                <button className="image-message-btn">
                  <i class="fas fa-arrow-up text-light"></i>
                </button>
              </form>
            </div>
          </div>

          {/* message photo area end */}
        </div>
        {/*  chat box end */}
        {/* audio , video call section + user image , name and status */}
        <div
          className={
            showCallSection
              ? "call-section-parent p-3 bg-dark  show"
              : "call-section-parent p-3 bg-dark"
          }
        >
          <div className="call-section-container w-100 bg-dark p-3 d-flex flex-column justify-content-center align-items-center">
            <h4 className="w-100 text-center">
              <i class="fas fa-square-phone text-primary"></i> Hamidos
            </h4>
            <img
              src={userThree}
              className="profile-avatar text-center shadow-4-strong ms-3 p-1 mb-4"
              alt="chat"
              style={{
                width: "120px",
              }}
            />
            <span>Ringing</span>
            <div className="d-flex flex-row justify-content-center align-items-center p-3  mt-4 gap-3 call-buttons">
              <button className="btn btn-dark text-light btn-floating">
                <i class="fas fa-volume-high"></i>
              </button>
              <button className="btn btn-dark text-light btn-floating">
                <i class="fas fa-video"></i>
              </button>
              <button className="btn btn-dark btn-floating">
                <i class="fas fa-microphone-slash"></i>
              </button>
              <button
                className="btn btn-danger btn-floating"
                onClick={() => {
                  setShowCallSection(false);
                }}
              >
                <i class="fas fa-phone-slash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* toast container */}
      <ToastContainer style={{ zIndex: "10000000" }} />
    </div>
  );
};

export default Messages;
