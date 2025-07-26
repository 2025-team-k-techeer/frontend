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
    const response = await jsonAxios.post('/interiors/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(access_token && { Authorization: `Bearer ${access_token}` }),
      },
    });

    console.log('Image upload response:', response.data);

    const { data, status, message } = response.data;
    if (status !== 'success') {
      throw new Error(message || '이미지 업로드에 실패했습니다.');
    }

    const { public_url, filename } = data;
    console.log(
      'Image upload success - url:',
      public_url,
      'filename:',
      filename
    );
    return { url: public_url, filename };
  } catch (error) {
    console.error('Image upload error:', error);
    console.error('Error response:', error.response);

    if (error.response?.status === 401) {
      throw new Error(
        '로그인이 필요하거나 토큰이 만료되었습니다. 다시 로그인해주세요.'
      );
    }

    const msg = error.response?.data?.message || error.message;
    throw new Error(msg);
  }
};
