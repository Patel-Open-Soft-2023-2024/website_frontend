// utils/axiosInstance.js
import axios from 'axios';

export const axiosMainServerInstance = axios.create({
  baseURL: 'http://localhost:4000',
  // Any other configurations here
});