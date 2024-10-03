import api from '../api/api'; // Axios instance

// Action Types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const GOOGLE_LOGIN_SUCCESS = 'GOOGLE_LOGIN_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';

// Register Action
export const register = (email, password) => async (dispatch) => {
  try {
    const res = await api.post('/register', { email, password });
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.response.data.message });
  }
};

// Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    const res = await api.post('/login', { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.response.data.message });
  }
};

// Google Sign-in Action
export const googleLogin = (token) => async (dispatch) => {
  try {
    const res = await api.post('/auth/google', { token });
    dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.response.data.message });
  }
};
