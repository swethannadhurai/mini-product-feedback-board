import axios from 'axios';

const API = axios.create({
  baseURL: 'https://your-backend-api.onrender.com/api',
  withCredentials: true,
});

export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const logout = () => API.post('/auth/logout');
