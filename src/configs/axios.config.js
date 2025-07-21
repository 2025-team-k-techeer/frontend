// src/configs/axios.config.js
import axios from 'axios';

// 환경 변수에서 API 기본 URL 가져오기
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * JSON 전송용 Axios 인스턴스
 * - 주로 POST, PUT, PATCH 요청으로 서버에 JSON 데이터를 보낼 때 사용합니다.
 * - 'Content-Type': 'application/json' 헤더가 자동으로 추가됩니다.
 */
export const jsonAxios = axios.create({
  baseURL: BASE_URL, // 모든 요청의 기본 URL
  timeout: 10000, // 10초 내에 응답이 없으면 요청 취소
  withCredentials: false, // 쿠키나 인증 헤더 등 인증 정보를 요청에 자동으로 포함시킵니다.
  headers: {
    'Content-Type': 'application/json', // 이 헤더 덕분에 서버가 JSON 데이터임을 알 수 있습니다.
  },
});

// (선택 사항) 토큰 재발급과 같은 복잡한 인증 로직은 필요에 따라 jsonAxios에 인터셉터로 추가 가능
// 예시: jsonAxios.interceptors.response.use(...)
