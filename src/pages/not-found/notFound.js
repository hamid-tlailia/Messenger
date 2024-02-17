import React from 'react';
// import not found css file
import './notFound.css'
import { NavLink } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className='notFound'>
      <p>Page not found</p>
      <NavLink to="/"><button className='btn btn-outline-success'>Go Home</button></NavLink>
    </div>
  );
}

export default NotFound;
