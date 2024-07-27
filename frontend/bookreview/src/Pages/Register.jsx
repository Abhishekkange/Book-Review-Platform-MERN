import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Link as MuiLink
} from '@mui/material';
import Navbar2 from '../Components/Navbar2';
import registerIllustration from '../images/register.jpeg'; // Adjust the path as necessary
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const handleRegisterClick = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:4000/api/v1/register', data);
      alert(response.data.message);
      if (response.data.message === "Registered Successfully") {
        try {
          const loginResponse = await axios.post('http://localhost:4000/api/v1/login', data);
          if (loginResponse.data.type === "JWT") {
            localStorage.setItem('JWT', loginResponse.data.message);
            navigate('/');
          }
        } catch (error) {
          console.error('There was an error!', error);
          alert("Try Login Again");
        }
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar2 />
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <img src={registerIllustration} alt="Register Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 2 }}
                  >
                    Back
                  </Button>
                  <Typography variant="h4" component="h1" textAlign="center" sx={{ flexGrow: 1 }}>
                    Register
                  </Typography>
                </Box>
                <form onSubmit={handleRegisterClick}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Register
                  </Button>
                </form>
                <Box textAlign="center">
                  <Typography variant="body2" color="textSecondary">
                    Already have an account?{' '}
                    <MuiLink href="/login" variant="body2">
                      Sign In
                    </MuiLink>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Register;
