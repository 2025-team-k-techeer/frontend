import { jsonAxios } from '/src/configs/axios.config';

/**
 * 내 인테리어 저장 API (POST /interiors/my-interior)
 * @param {Object} params
 * @param {string} params.interior_id
 * @param {string} params.token - Bearer 토큰
 */
export async function saveMyInterior({ interior_id, token }) {
  try {
    const response = await jsonAxios.post(
      '/interiors/my-interior',
      { interior_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('저장에 실패했습니다.');
  }
}
