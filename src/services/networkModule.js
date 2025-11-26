import axios from 'axios';

// Base URL for the API
const BASE_URL = 'http://64.176.16.51:8000/api/v1/';
export const IMAGE_BASE_URL = 'http://64.176.16.51:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.message || `HTTP ${error.response.status} Error`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'Unknown error occurred');
    }
  }
);

export default api;
