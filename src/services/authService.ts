import axios from 'axios';
import { LoginCredentials } from '../types';
import { API_URL, TOKEN_KEY, ENDPOINTS } from '../config';

// Create axios instance with baseURL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post(ENDPOINTS.LOGIN, credentials);
    const { token } = response.data;
    
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      return { token };
    }
    
    throw new Error('Token not received');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;