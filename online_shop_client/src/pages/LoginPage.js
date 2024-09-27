import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(username, password).then(
      (response) => {
        navigate('/');
      },
      error => {
        console.log("Error:", error);  // Log the error for debugging
        const errorMessage = error?.response?.data?.message || "Something went wrong.";
        setMessage("Login failed. " + errorMessage);
      }
    );
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
