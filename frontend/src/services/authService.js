// src/services/authService.js
import axios from 'axios';

// Base URL from .env or default to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

// Signup function
export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { msg: 'Network error' };
    }
};

// Login function
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { msg: 'Network error' };
    }
};

// Save token to localStorage
export const saveToken = (token) => {
    localStorage.setItem('token', token);
};

// Remove token (logout)
export const removeToken = () => {
    localStorage.removeItem('token');
};
