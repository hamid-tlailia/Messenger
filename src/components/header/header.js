import React from 'react';
// import header css file
import './header.css'
// import navlink 
import {NavLink} from 'react-router-dom'
// import logo
import logo from "../startup/public/images/new-log.png"
const Header = () => {

  return (
    <div className='header d-none d-lg-flex d-md-flex'>
<div className='shadow-3-strong header d-none d-lg-flex d-md-flex'>
<div className="logo"><img src={logo} className='image-logo' alt="" /></div>
<div className="items">
  <NavLink className="routes" to="/"><i class="fas fa-house me-2"></i> Home</NavLink>
  <NavLink className="routes" to="/notifications"><i class="fas fa-bell me-2"></i> Notifications</NavLink>
  <NavLink className="routes" to="/messages"><i class="fas fa-comment me-2"></i> Messages</NavLink>
  <NavLink className="routes" to="/profile"><i class="fas fa-user-group me-2"></i> Profile</NavLink>
</div>
</div>
    </div>
  );
}

export default Header;
