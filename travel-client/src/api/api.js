import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export const getAllDestinations = () => api.get('/destinations');
export const createDestination = (data) => api.post('/destinations', data);
export const updateDestination = (id, data) => api.put(`/destinations/${id}`, data);
export const deleteDestination = (id) => api.delete(`/destinations/${id}`);

export const registerUser = (data) => api.post('/register', data);
export const loginUser = (data) => api.post('/login', data);
export const logoutUser = () => api.post('/logout');
export const getUserProfile = () => api.get('/profile');

export const getReviews = (destinationId) => api.get(`/destination/${destinationId}/reviews`);
export const createReview = (destinationId, data) => api.post(`/destination/${destinationId}/reviews`, data);
export const updateReview = (reviewId, data) => api.put(`/reviews/${reviewId}`, data);
export const deleteReview = (reviewId) => api.delete(`/reviews/${reviewId}`);

export const generateGeminiContent = (prompt) => api.post('/gemini/generate-gemini-content', { prompt });

export default api;
