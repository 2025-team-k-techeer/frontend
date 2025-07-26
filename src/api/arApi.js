import { jsonAxios } from '/src/configs/axios.config';

// AR 유사 객체 모델 요청 API
export const fetchSimilarARObject = async ({ label }) => {
  try {
    const response = await jsonAxios.post('/api/ar/similar-object', { label });
    return response.data;
  } catch (error) {
    // 서버에서 에러 메시지가 오면 그대로 throw, 아니면 기본 메시지
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('AR 모델 정보를 불러오는 중 오류가 발생했습니다.');
  }
};
