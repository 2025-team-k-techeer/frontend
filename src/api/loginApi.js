// src/api/loginApi.js
import { jsonAxios } from '/src/configs/axios.config'; // jsonAxios 인스턴스 임포트
import qs from 'qs'; // qs 라이브러리로 urlencoded 변환

/**
 * 로그인 (POST /users/login)
 */
export const postLogin = async ({ email, password }) => {
  // (선택 사항) 필수 필드 유효성 검사 (프론트엔드에서 1차 검증)
  if (!email || !password) {
    throw new Error('모든 필드가 필요합니다.');
  }

  try {
    const data = qs.stringify({
      username: email, // username 필드로 보냄
      password: password,
    });

    const response = await jsonAxios.post('/users/login', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    // access token 추출
    const access_token = response.data.access_token;
    if (!access_token) {
      throw new Error('토큰이 존재하지 않습니다.');
    }
    return { access_token };
  } catch (error) {
    // axios 에러 메시지 처리
    const msg = error.response?.data?.message || error.message;
    throw new Error(msg);
  }
};
