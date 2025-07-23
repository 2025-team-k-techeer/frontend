// src/api/userApi.js
import { jsonAxios } from '../configs/axios.config.js';
import { useAuthStore } from '../store/useAuthStore';

/**
 * 마이페이지 데이터(프로필 정보, 라이브러리)를 조회하는 API
 */
export const fetchMyPageData = async () => {
  // Zustand 스토어에서 직접 상태를 가져옴
  const user = useAuthStore.getState().user;
  const accessToken = user?.token;

  // 토큰이 없으면 요청을 보내지 않고 에러 처리
  if (!accessToken) {
    throw new Error('인증 토큰이 없습니다.');
  }

  try {
    const response = await jsonAxios.get('/api/user/mypage', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('마이페이지 데이터 조회 실패:', error);
    throw error;
  }
};
