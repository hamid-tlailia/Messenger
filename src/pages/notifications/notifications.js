import React, { useEffect } from 'react';
// import css file
import './notifications.css'
// import user notification vatar
import userThree from '../public/images/user3.png'
import userFour from '../public/images/user4.png'
// import react navlink
import { NavLink } from 'react-router-dom';

const Notifications = () => {
    // starting with change page title
    useEffect(() => {
      document.title = "Hamidos | Notifications";
    },[]);

  return (
    <div className='container-fluid all-center-col notifs'>
      <h4>Notifications center</h4>
      <div className="notifs w-100">
{/* notification 1 */}
<div  className="notif-content mb-4 d-flex flex-row w-100 justify-content-center align-items-center gap-4">
<NavLink to="/posts/details/cc8p22df8pll6"><img src= {userThree} className='chat-avatar shadow-4-strong p-1' alt="chat" /></NavLink>
  <div className="chat-details w-100 mt-2 text-start">
    <div className="d-flex flex-row text-dark justify-content-start align-items-start gap-2 w-100">
      <strong>Hamidos</strong>
      <span >like your photo</span>
    </div>
    <p className='text-dark'>2 hours ago</p>
  </div>
  <i class="far fa-trash-can ms-3 text-danger shadow-2 p-1" title='Delete notification'></i>
</div>
{/* notification 2 */}
<div className="notif-content d-flex flex-row justify-content-center align-items-center gap-4">
<NavLink to="/posts/details/b77pllknn89"><img src= {userFour} className='chat-avatar shadow-4-strong p-1' alt="chat" /></NavLink>
  <div className="chat-details w-100 mt-2 text-start">
    <div className="d-flex flex-row text-dark justify-content-start align-items-start gap-2 w-100">
      <strong>Hiba</strong>
      <span >Share your post</span>
    </div>
    <p className='text-dark'>25 minuts ago</p>
  </div>
  <i class="far fa-trash-can ms-3 text-danger shadow-2 p-1" title='Delete notification'></i>
</div>
      </div>
      <div className=" fs-3 all-center-row mt-5   d-none">
      <i class="fas fa-bell me-2 text-warning"></i>  No new notifications !
      </div>
    </div>
  );
}

export default Notifications;
