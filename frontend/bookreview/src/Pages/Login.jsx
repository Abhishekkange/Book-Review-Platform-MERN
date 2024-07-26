import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLoginClick = async(e) => {
    e.preventDefault();
    
    const data = {

        email: email,
        password: password
    }

    try {
        const response = await axios.post('http://localhost:4000/api/v1/login', data);
        console.log('Response:', response.data);
        if(response.data.type =="JWT")
        {
            localStorage.setItem('JWT', JSON.stringify(response.data.message));
            console.log('stored in localStorage');
        }
      } catch (error) {
        console.error('There was an error!', error);
      }
    };


  return (
    <div className="background">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4">
          <div className="card-header text-center bg-primary text-white">
            <h3>Login</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleLoginClick}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
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
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
          <div className="card-footer text-center">
            <small className="text-muted">Don't have an account? <a href="/register">Register</a></small>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Login;
