import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.jpeg';


function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-top mr-2" />
        <span className="ml-2">Book Peek</span>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/login" className="btn btn-primary">Sign In</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
