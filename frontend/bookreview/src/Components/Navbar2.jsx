import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from '../images/logo.jpeg';

const Navbar2 = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={() => navigate(-1)}  // This will navigate back to the previous page
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          component={Link}
          to="/"
          sx={{ ml: 2 }}
        >
          <img src={logo} alt="Logo" width="30" height="30" />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Book Peek</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar2;
