import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import loginImage from '../images/login.jpg';
import Navbar2 from '../Components/Navbar2';




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
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', data);
      console.log('Response:', response.data);
      if (response.data.type === "JWT") {
        localStorage.setItem('JWT', JSON.stringify(response.data.message));
        alert("login successful")
        navigate('/home');
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
          <img src={loginImage} alt="Login Illustration" className="img-fluid" />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
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
    </div>
    
    </>
   
  );
};

export default Login;
