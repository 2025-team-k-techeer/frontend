// src/lib/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 필요 시 쿠키 포함
});

export default api;
