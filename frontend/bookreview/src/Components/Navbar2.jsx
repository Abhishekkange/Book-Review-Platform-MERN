import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.jpeg';


function Navbar2() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-top mr-2" />
        <span className="ml-2">Book Peek</span>
      </Link>
     
      
    </nav>
  )
}

export default Navbar2
