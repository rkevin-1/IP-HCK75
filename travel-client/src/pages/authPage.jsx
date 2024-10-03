import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google'; // Import the new GoogleLogin
import { register, login, googleLogin } from '../redux/authActions';

const AuthPage = () => {
  const [view, setView] = useState('login'); // Toggle between login, register, google-signin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, user } = useSelector((state) => state.auth);

  // Handle Login Form Submit
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // Handle Register Form Submit
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(email, password));
  };

  // Handle Google Sign-in Success
  const handleGoogleSuccess = (response) => {
    const token = response.credential; // Use `credential` from the new package's response
    dispatch(googleLogin(token));
  };

  return (
    <div className="auth-page">
      <h1>Authentication</h1>
      <div>
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('register')}>Register</button>
        <button onClick={() => setView('google-signin')}>Google Sign-in</button>
      </div>

      {/* Display error if exists */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display user info if logged in */}
      {user && <p>Welcome, {user.email}</p>}

      {/* Login View */}
      {view === 'login' && (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        </div>
      )}

      {/* Register View */}
      {view === 'register' && (
        <div>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
      )}

      {/* Google Sign-in View */}
      {view === 'google-signin' && (
        <div>
          <h2>Google Sign In</h2>
          <GoogleLogin
            onSuccess={handleGoogleSuccess} // Handle successful login
            onError={() => {
              console.error('Google Sign-in failed');
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AuthPage;
