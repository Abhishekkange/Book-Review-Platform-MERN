import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import axios from 'axios';

const Register = () => {
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
      console.log('Response:', response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="background">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4">
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
  );
};

export default Register;
