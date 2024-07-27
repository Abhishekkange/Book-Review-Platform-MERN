import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from '../images/logo.jpeg';
import profileIcon from '../images/user.png';

const Navbar = () => {
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
    navigate('/AddNewBook'); // Navigate to the add review page
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
          <Typography variant="h6">Book Peek</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search"
            variant="outlined"
            sx={{
              mr: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white', // Set background color to white
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton type="button" aria-label="search">
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
