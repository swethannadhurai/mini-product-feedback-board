import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mini-product-feedback-board.onrender.com',
  withCredentials: true,
});


export default API;

