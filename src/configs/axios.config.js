import axios from 'axios';

const isDev = import.meta.env.DEV;

// baseURL 조건 분기
const BASE_URL = isDev
  ? '/api' // 👉 로컬 개발 시 프록시 경로 사용
  : import.meta.env.VITE_API_URL; // 👉 배포 시에는 실제 주소 사용

export const jsonAxios = axios.create({
  baseURL: BASE_URL, // 프록시 설정으로 인해 /api 경로로 요청
  withCredentials: true, // ✅ 추가!
});

// 🔒 Bearer 토큰 자동 삽입
jsonAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
