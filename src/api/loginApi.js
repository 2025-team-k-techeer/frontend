// src/api/loginApi.js
import { jsonAxios } from '/src/configs/axios.config'; // jsonAxios 인스턴스 임포트
import qs from 'qs'; // qs 라이브러리로 urlencoded 변환

/**
 * 로그인 (POST /users/login)
 */
export const postLogin = async ({ email, password }) => {
  // (Optional) Frontend validation for required fields
  if (!email || !password) {
    throw new Error('Please fill in all fields.');
  }

  try {
    const requestData = qs.stringify({
      username: email,
      password: password,
      grant_type: 'password',
    });
    console.log('[LOGIN] Request body:', requestData);

    const response = await jsonAxios.post('/users/login', requestData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('[LOGIN] Full response:', response);
    console.log('[LOGIN] response.data:', response.data);

    const access_token = response.data.access_token;
    console.log('[LOGIN] access_token:', access_token);

    if (!access_token) {
      throw new Error('Token does not exist.');
    }
    return { access_token };
  } catch (error) {
    console.error('[LOGIN] Error:', error);
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};
