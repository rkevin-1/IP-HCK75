
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import displayToast from '../Utils/toast';


export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      let response = await axios({
        url: "http://localhost:3000/login",
        method: "post",
        data: {
          email,
          password,
        },
      });
      // console.log(response.data.message, "<<<<<<<<response");

      if (response.data.message === "Invalid email or password") {
        displayToast('error', 'Please check your email or password!');
      }
      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("user", response.data.user.id);

      displayToast('success', 'Login successful!', () => {
        navigate('/');
      });

    } catch (err) {
      console.log(err);
      displayToast();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', {
        email,
        password,
      });
      console.log(response);

      if (response.status === 400 || response.message === "User already exists") {
        displayToast('error', 'User already exists');
      }

      displayToast('success', `Register successful!`);
      setIsRegistering(false);

    } catch (err) {
      displayToast('Registration failed. Please try again.', 'error');
    }
  };

  const handleCredentialResponse = async (response) => {
    console.log(response);
    
    try {
      
      const result = await axios.post('http://localhost:3000/auth/google', {
        google_token: response.credential,
      });
        console.log(result.data);
        
        localStorage.setItem('access_token', result.data.access_token);
        displayToast('Google login successful!', 'success');
        navigate('/');
      
    } catch (err) {
      console.error('Google login failed', err);
      displayToast('Google login failed.', 'error');
    }
  };
  

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "162462898656-in7ekutqm82pgpfaintdh0am8stgjiqa.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
  
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
  } , []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white bg-opacity-50 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isRegistering ? 'Create a New Account' : 'Login to Your Account'}
        </h2>

        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isRegistering ? (
            <>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setIsRegistering(false);
                  setError('');
                }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setIsRegistering(true);
                  setError('');
                }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </button>
            </>
          )}
        </p>


        {/* Google Login Button */}
        <div id="buttonDiv"></div>


      </div>
      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
}
