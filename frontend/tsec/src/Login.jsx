import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/styles/login.css';
import logo from './assets/images/logo.jpeg';


function Login() {
    const [activeTab, setActiveTab] = useState('user');
    const [idNumber, setIdNumber] = useState('');
    const [password, setPassword] = useState('');

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
        // Handle login logic here
        console.log('Login submitted for:', activeTab, 'with ID:', idNumber);
    };

    return (
        <div className="login-container">
            <div className="login-image">
                {/* You can replace this with an actual image */}
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
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="forgot-password">Forgot password?</p>
            </div>
        </div>
    );
}

export default Login;