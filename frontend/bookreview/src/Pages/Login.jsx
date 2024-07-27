import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Container, Grid, Card, CardContent, CardActions, Button, TextField, Typography } from '@mui/material';
import Navbar2 from '../Components/Navbar2';
import loginImage from '../images/login.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLoginClick = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', data);
  
      if (response.data.type === "JWT") {
        localStorage.setItem('JWT', response.data.message);
        alert("Login successful");
        navigate('/');
      }
      else{

        alert("Invalid credentials");
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert("Login Failed");
    }
  };

  return (
    <>
      <Navbar2 />

      <Container
        maxWidth="lg"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'white' }}
      >
        <Grid container spacing={2}>
          <Grid item md={6} display={{ xs: 'none', md: 'flex' }} alignItems="center" justifyContent="center">
            <img src={loginImage} alt="Login Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
            <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom align="center" sx={{ bgcolor: 'primary.main', color: 'white', padding: 2 }}>
                  Login
                </Typography>
                <form onSubmit={handleLoginClick}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Login
                  </Button>
                </form>
              </CardContent>
              <CardActions>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ width: '100%' }}>
                  Don't have an account? <a href="/register">Register</a>
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
