// src/api/signupApi.js
import { jsonAxios } from '../configs/axios.config'; // jsonAxios 인스턴스 임포트

/**
 * 회원가입 (POST /users/signup)
 */
export const postSignup = async ({ name, email, password }) => {
  // (선택 사항) 필수 필드 유효성 검사 (프론트엔드에서 1차 검증)
  if (!name || !email || !password) {
    throw new Error('모든 필드가 필요합니다.');
  }

  try {
    // jsonAxios 인스턴스를 사용하여 POST 요청을 보냅니다.
    // 두 번째 인자(객체)는 요청 본문(Request Body)으로 JSON 형태로 서버에 전송됩니다.
    const response = await jsonAxios.post('/users/signup', {
      name,
      email,
      password,
    });
    // 서버 응답 데이터에서 status, message, user_id 추출
    const { status, message, user_id } = response.data;
    if (status !== 'success') {
      throw new Error(message || '회원가입 실패: 이미 등록된 이메일 입니다.');
    }
    return { status, message, user_id };
  } catch (error) {
    // axios 에러 메시지 처리
    const msg = error.response?.data?.message || error.message;
    throw new Error(msg);
  }
};

/**
 * 특정 문서에 데이터를 저장 (POST /documents/{document_id}/save)
 */
export const saveDocumentData = async (documentId, type) => {
  try {
    const response = await jsonAxios.post(`/documents/${documentId}/save`, {
      parts: [type], // 'parts'라는 키에 배열 형태로 데이터를 담아 보냅니다.
    });
    console.log(`"${type}" 저장 완료:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `"${type}" 저장 실패:`,
      error.response?.data || error.message // 에러 응답이 있으면 data를, 없으면 message를 사용
    );
    throw error;
  }
};

// (선택 사항) Fetch API를 직접 사용한 스트리밍 예시 (SSE)
// Axios는 기본적으로 스트리밍을 직접 지원하지 않으므로, 이 경우 Fetch API를 사용합니다.
export const getDocumentStream = async (documentId, onMessage, onError) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/documents/${documentId}/stream`, // 직접 전체 URL 명시
      {
        method: 'GET',
        headers: {},
        mode: 'cors',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      if (chunk.includes('[DONE]')) {
        console.log('Streaming finished.');
        break;
      }
      for (const char of chunk) {
        onMessage(char);
      }
    }
  } catch (error) {
    console.error('SSE Fetch Error:', error);
    if (onError) onError(error);
  }
};
