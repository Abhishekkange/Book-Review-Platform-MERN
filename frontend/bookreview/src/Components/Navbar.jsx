import React from 'react'


function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img src="logo.png" alt="Logo" width="30" height="30" className="d-inline-block align-top" />
        MyWebsite
      </a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button className="btn btn-primary">Sign In</button>
          </li>
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default Navbar
