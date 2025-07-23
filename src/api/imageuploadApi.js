// src/api/imageuploadApi.js
import { jsonAxios } from '/src/configs/axios.config'; // jsonAxios 인스턴스 임포트

/**
 * 이미지 파일을 GCS에 업로드하고, 공개 URL과 난독화된 파일명을 반환합니다.
 * @param {File} imageFile - 업로드할 이미지 파일
 * @param {string} token - (선택) Bearer 토큰
 * @returns {Promise<{ url: string, filename: string }>}
 */
export const postUploadImage = async (imageFile, access_token) => {
  if (!imageFile) throw new Error('이미지 파일이 필요합니다.');

  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await jsonAxios.post('/api/interiors/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(access_token && { Authorization: `Bearer ${access_token}` }),
      },
    });
    const { url, filename, status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message || '이미지 업로드에 실패했습니다.');
    }
    return { url, filename };
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    throw new Error(msg);
  }
};
