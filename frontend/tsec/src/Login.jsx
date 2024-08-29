import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LabelInputRow({ label, inputType, inputId, placeholder, value, onChange }) {
    return (
        <div className="input-row">
            <label htmlFor={inputId} className="input-label">
                {label}
            </label>
            <input
                type={inputType}
                id={inputId}
                className="input-field"
                placeholder={placeholder}
                aria-label={label}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

function Login() {
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

        try {
            const response = await axios.post('http://localhost:3000/authorize/login', {
                userId: idNumber,
                password,
            });
            console.log(response.data);
        } catch (error) {
            console.error('There was an error logging in the user!', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <section className="login-section">
            <header>
                <h1 className="app-name">Login Component</h1>
            </header>
            <main className="login-main">
                <h2 className="login-title">Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <LabelInputRow
                        label="Enter your ID number to login"
                        inputType="text"
                        inputId="userId"
                        placeholder="12345678"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                    />
                    <LabelInputRow
                        label="Enter password"
                        inputType="password"
                        inputId="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="login-btn" type="submit">
                        Login
                    </button>
                </form>
            </main>
        </section>
    );
}

export default Login;
