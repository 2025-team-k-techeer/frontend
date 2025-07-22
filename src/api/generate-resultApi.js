// src/api/loginApi.js
import { jsonAxios } from '../configs/axios.config'; // jsonAxios 인스턴스 임포트

/**
 * 인테리어 결과 생성 (POST /interiors/generate)
 * @param {Object} params
 * @param {string} params.image_url
 * @param {string} params.room_type
 * @param {string} params.style
 * @param {string} params.prompt
 * @param {string} params.token - Bearer 토큰
 */
export const postGenerateResult = async ({
  image_url,
  room_type,
  style,
  prompt,
  token,
}) => {
  if (!image_url || !room_type || !style || !prompt) {
    throw new Error('모든 필드가 필요합니다.');
  }
  try {
    const response = await jsonAxios.post(
      '/interiors/generate',
      { image_url, room_type, style, prompt },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    // 서버에서 내려주는 message 우선 노출
    const msg = error.response?.data?.message || error.message;
    throw new Error(msg);
  }
};
