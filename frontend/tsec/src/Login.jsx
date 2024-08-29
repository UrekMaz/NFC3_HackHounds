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
          navigate('/user-home');
        } else {
          navigate('/org-home');
        }
      } else {
        setErrorMessage('Invalid ID number or password. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.' + error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
  <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl">
    <div className="login-image md:w-1/2 bg-gray-200">
      <div className="image-placeholder h-full"></div>
    </div>
    <div className="login-form-container p-8 md:w-1/2 flex flex-col justify-center">
      <img src={logo} alt="Logo" className="logo mb-8 mx-auto" />
      <h1 className="login-title text-3xl font-bold text-center mb-6">Welcome Back</h1>
      <div className="login-tabs flex justify-center mb-6">
        <button
          className={`tab-btn ${activeTab === 'user' ? 'bg-purple text-white' : 'bg-gray-200'} px-4 py-2 rounded-l`}
          onClick={() => setActiveTab('user')}
        >
          User
        </button>
        <button
          className={`tab-btn ${activeTab === 'organization' ? 'bg-purple text-white' : 'bg-gray-200'} px-4 py-2 rounded-r`}
          onClick={() => setActiveTab('organization')}
        >
          Organization
        </button>
      </div>
      <form className="login-form space-y-4" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="idNumber" className="block text-gray-700">ID Number</label>
          <input
            type="text"
            id="idNumber"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder="Enter your ID number"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {errorMessage && <p className="error-message text-red-500 text-sm">{errorMessage}</p>}
        <button type="submit" className="login-btn bg-purple text-white w-full py-2 rounded">Login</button>
      </form>
      <p className="forgot-password text-center text-blue-500 mt-4 cursor-pointer">Forgot password?</p>
    </div>
  </div>
</div>

  );
}

export default Login;
