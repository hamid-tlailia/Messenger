import React from 'react';
// import css  file
import './newUserNav.css'
// import chat app logo
import logo from '../startup/public/images/ai.jpg'
import { NavLink } from 'react-router-dom';
const NewUserNav = () => {

  return (
<>

  <nav className="navbar navbar-expand navbar-light">
  {/* <!-- Container wrapper --> */}
  <div className="container mt-0">
    {/* <!-- Navbar brand --> */}
    <div className='me-2'>
      <img
        src= {logo}
        className='image-logo'
        alt="chat-Logo"
        loading="lazy"
        style= {{marginTop :'-1px'}}
      />
    </div>

    {/* <!-- Collapsible wrapper --> */}
    <div className=" navbar-collapse" id="navbarButtonsExample">
      {/* <!-- Left links --> */}
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <span>Hamidos</span>
        </li>
      </ul>
      {/* <!-- Left links --> */}

      <div className="d-flex align-items-center">
      <NavLink to="/">  
        <button data-mdb-ripple-init type="button" className="btn btn-primary px-3 me-2">
          Login/Sign-up
        </button>
        </NavLink>
    
      </div>
    </div>
    {/* <!-- Collapsible wrapper --> */}
  </div>
  {/* <!-- Container wrapper --> */}
</nav>


</>
  );
};

export default NewUserNav;
