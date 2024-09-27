import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('user');
  let username = '';
  const navigate = useNavigate();
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      username = payload.sub;
    } catch (e) {
      console.error("Error decoding token", e);
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove the token from local storage
    navigate('/'); // Navigate to home page or refresh
  }
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <ul style={{ display: 'flex', listStyle: 'none' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
      <ul style={{ display: 'flex', listStyle: 'none' }}>
        {username ? (
          <>
          <li>Welcome, {username}</li>
          <li style={{ marginLeft: '10px' }}>(<Link to="#" onClick={handleLogout} style={{ textDecoration: 'none', color: 'blue' }}>Log out</Link>)</li>
        </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register" style={{ marginLeft: '10px' }}>Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;