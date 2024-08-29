import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './assets/styles/login.css';
import logo from './assets/images/logo.jpeg';

function Login() {
  const [activeTab, setActiveTab] = useState('user');
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  const handleBackButton = (event) => {
    window.history.pushState(null, document.title, window.location.href);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/authorize/login', {
        userId: idNumber,
        password,
      });
      console.log(response.data);
     
      if (response.status === 200) {
        // Navigate based on the active tab
        if (activeTab === 'user') {
          navigate('/user-home?userId=' + idNumber);
        } else {
          navigate('/org-home?userId=' + idNumber);
        }
      } else {
        setErrorMessage('Invalid ID number or password. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.' + error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <div className="image-placeholder"></div>
      </div>
      <div className="login-form-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login-title">Welcome Back</h1>
        <div className="login-tabs">
          <button
            className={`tab-btn ${activeTab === 'user' ? 'active' : ''}`}
            onClick={() => setActiveTab('user')}
          >
            User
          </button>
          <button
            className={`tab-btn ${activeTab === 'organization' ? 'active' : ''}`}
            onClick={() => setActiveTab('organization')}
          >
            Organization
          </button>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="idNumber">ID Number</label>
            <input
              type="text"
              id="idNumber"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Enter your ID number"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="forgot-password">Forgot password?</p>
      </div>
    </div>
  );
}

export default Login;
