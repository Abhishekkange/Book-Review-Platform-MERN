import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.jpeg';
import profileIcon from '../images/user.png';

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

  const handleAddReviewClick = () => {
    navigate('/AddNewReview'); // Navigate to the add review page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Logo and Title */}
        <Link className="navbar-brand d-flex align-items-center mr-5" to="/">
          <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-top mr-2" />
          <span className="ml-2">Book Peek</span>
        </Link>

        {/* Search Bar and Add Review Button */}
        <div className="d-flex justify-content-center flex-grow-1">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: '60%' }} // Double the length of the default width
            />
          </form>
          <button
            className="btn btn-success ml-3"
            onClick={handleAddReviewClick}
          >
            Add New Review
          </button>
        </div>

        {/* Profile Icon */}
        <div className="ml-auto">
          {isSignedIn ? (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  onClick={handleProfileClick}
                  src={profileIcon}
                  alt="Profile"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="btn btn-primary ml-3">
                Sign In
              </Link>
            </li>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
