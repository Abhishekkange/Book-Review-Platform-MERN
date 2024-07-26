import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import registerIllustration from '../images/register.jpeg'; // Adjust the path as necessary
import axios from 'axios';
import Navbar2 from '../Components/Navbar2';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  // State to manage form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle input change
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

  // Handle register button click
  const handleRegisterClick = async (event) => {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const data = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:4000/api/v1/register', data);
      alert(response.data.message);
      if(response.data.message =="Registered Successfully"){

          try {
            const response = await axios.post('http://localhost:4000/api/v1/login', data);
            console.log('Response:', response.data);
            if (response.data.type === "JWT") {
              localStorage.setItem('JWT', JSON.stringify(response.data.message));
              navigate('/home');
            }
          } catch (error) {
            console.error('There was an error!', error);
            alert("Try Login Again")
          }

      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (

    <>
    <Navbar2 />
     <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-white">
      <div className="row w-100">
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img src={registerIllustration} alt="Register Illustration" className="img-fluid" />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="card-header text-center bg-primary text-white">
              <h3>Register</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleRegisterClick}>
                <div className="form-group mb-3">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
            </div>
            <div className="card-footer text-center">
              <small className="text-muted">Already have an account? <a href="/login">Sign In</a></small>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default Register;
