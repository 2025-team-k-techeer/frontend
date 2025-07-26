// src/api/styleApi.js
import { jsonAxios } from '../configs/axios.config.js';

/**
 * 스타일 이름을 기반으로 상세 정보를 조회하는 API
 * @param {string} styleName - 조회할 스타일의 이름 (예: '모던')
 */
export const fetchAllStyles = async () => {
  try {
    // GET 방식으로 '/interiors/style-info/all' 주소에 요청
    const response = await jsonAxios.get('/interiors/style-info/all');
    console.log('전체 API 응답:', response);
    console.log('response.data:', response.data);
    // 응답 데이터에서 실제 스타일 목록이 담긴 data 배열을 반환
    // API 응답 구조에 따라 response.data.data 또는 response.data를 반환
    return response.data.data || response.data; // 성공 시 { style_id, name, description, ... } 객체 반환
  } catch (error) {
    console.error('스타일 정보 조회 실패:', error);
    throw error;
  }
};
