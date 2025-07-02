import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mini-product-feedback-board.onrender.com',
  withCredentials: true,
});

export const login = (data) => API.post('api/auth/login', data);
export const register = (data) => API.post('api/auth/register', data);
export const logout = () => API.post('api/auth/logout');

