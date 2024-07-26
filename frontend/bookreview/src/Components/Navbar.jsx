import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpeg';
import profileIcon from '../images/user.png'; 
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Check local storage for authentication token or status
    const token = localStorage.getItem('JWT');
    if (token) {
      setIsSignedIn(true);
    }
  }, []);

  const handleProfileClick = () => {


    navigate('/profile');

  };
  const handleSignOut = () => {
    // Handle sign out logic, like clearing the token
    localStorage.removeItem('JWT');
    setIsSignedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-top mr-2" />
        <span className="ml-2">Book Peek</span>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          {isSignedIn ? (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img onClick={handleProfileClick} src={profileIcon} alt="Profile" width="30" height="30" className="d-inline-block align-top" />
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/profile">Profile</Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleSignOut}>Sign Out</button>
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="btn btn-primary ml-3">Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
