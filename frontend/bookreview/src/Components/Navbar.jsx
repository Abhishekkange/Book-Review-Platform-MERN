import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, TextField, Button, Box, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../images/logo.jpeg';
import profileIcon from '../images/user.png';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [keyword, setKeyword] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleLogoClick =  () => {

    window.location.reload();



  }

  useEffect(() => {
    const token = localStorage.getItem('JWT');
    if (token) {
      setIsSignedIn(true);
    }
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(keyword);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSignOut = () => {
    localStorage.removeItem('JWT');
    setIsSignedIn(false);
  };

  const handleAddReviewClick = () => {
    navigate('/AddNewBook');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
          <Link onClick={handleLogoClick} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Book Peek</Link>
        </Box>

        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <TextField
              size="small"
              placeholder="Search"
              variant="outlined"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              sx={{
                ml:3,
                mr: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                },
                flex: 1,
              }}
              InputProps={{
                endAdornment: (
                  <IconButton type="button" aria-label="search" onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
            <Button
              variant="contained"
              color="success"
              onClick={handleAddReviewClick}
              sx={{ mr: 2 }}
            >
              Add New Review
            </Button>
            <IconButton onClick={handleProfileClick}>
              <img src={profileIcon} alt="Profile" style={{ height: 40 }} />
            </IconButton>
          </Box>
        )}

        {isMobile && (
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
      {isMobile && (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, backgroundColor: 'white' }}>
          <TextField
            size="small"
            placeholder="Search"
            variant="outlined"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton type="button" aria-label="search" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={handleAddReviewClick}
            fullWidth
            sx={{ mb: 2 }}
          >
            Add New Review
          </Button>
          <Button variant="contained" color="primary" onClick={handleProfileClick} fullWidth>
            Profile
          </Button>
        </Box>
      )}
    </AppBar>
  );
};

export default Navbar;
