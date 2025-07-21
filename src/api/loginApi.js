// src/api/loginApi.js
import { jsonAxios } from '../configs/axios.config'; // jsonAxios 인스턴스 임포트

/**
 * 로그인 (POST /users/login)
 */
export const postLogin = async ({ email, password }) => {
  // (선택 사항) 필수 필드 유효성 검사 (프론트엔드에서 1차 검증)
  if (!email || !password) {
    throw new Error('모든 필드가 필요합니다.');
  }

  try {
    // jsonAxios 인스턴스를 사용하여 POST 요청을 보냅니다.
    // 두 번째 인자(객체)는 요청 본문(Request Body)으로 JSON 형태로 서버에 전송됩니다.
    const response = await jsonAxios.post('/api/user/login', {
      email,
      password,
    });
    // 서버 응답 데이터에서 status, message, user_id 추출
    const { status, message, user_id, access_token } = response.data;
    if (status !== 'success') {
      throw new Error(message || '이메일 또는 비밀번호가 일치하지 않습니다.');
    }
    return { status, message, user_id, access_token };
  } catch (error) {
    // axios 에러 메시지 처리
    const msg = error.response?.data?.message || error.message;
    throw new Error(msg);
  }
};
