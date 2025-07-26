import axios from 'axios';

export const jsonAxios = axios.create({
  baseURL: '/api', // 프록시 설정으로 인해 /api 경로로 요청

  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔒 Bearer 토큰 자동 삽입
jsonAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
