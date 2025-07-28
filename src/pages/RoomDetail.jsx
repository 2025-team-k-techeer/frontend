import React, { useState } from 'react';

import HeaderBack from '/src/components/Header/HeaderBack';
import Title from '/src/components/Title/Title';
import Detail from '/src/components/Detail';
import TipSection from '/src/components/Tip/TipSection'; // 팁 섹션 컴포넌트 불러오기
import ButtonAction from '/src/components/Button/ButtonAction';
import { useRoomStyleStore } from '/src/store/useRoomStyleStore';
import { useResultGenerationStore } from '/src/store/useResultGenerationStore';
import { postGenerateResult } from '/src/api/generate-resultApi';
import { useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '/src/components/Loading';

export default function RoomDetail() {
  // prompt의 입력값을 관리할 state
  const prompt = useRoomStyleStore((state) => state.prompt);
  const setPrompt = useRoomStyleStore((state) => state.setPrompt);
  const room_type = useRoomStyleStore((state) => state.room_type);
  const style = useRoomStyleStore((state) => state.style);
  const image_url = useRoomStyleStore((state) => state.image_url);
  const setResult = useResultGenerationStore((state) => state.setResult);

  // 디버깅을 위한 store 값 출력
  console.log('RoomDetail - Store values:', {
    image_url,
    room_type,
    style,
    prompt,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // debounce 적용
  const setPromptDebounced = useCallback(
    debounce((value) => {
      setPrompt(value);
      console.log('prompt:', value);
    }, 600),
    []
  );

  // textarea의 onChange 이벤트를 처리할 핸들러
  function handlePromptChange(e) {
    setPromptDebounced(e.target.value);
  }

  // 완료 버튼 클릭 시
  async function handleComplete() {
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      // 필수 필드 검증
      if (!image_url) {
        setError('이미지를 업로드해주세요.');
        setLoading(false);
        return;
      }

      if (!room_type) {
        setError('공간 유형을 선택해주세요.');
        setLoading(false);
        return;
      }

      if (!style) {
        setError('인테리어 스타일을 선택해주세요.');
        setLoading(false);
        return;
      }

      if (!prompt || prompt.trim() === '') {
        setError('추가 요구사항을 입력해주세요.');
        setLoading(false);
        return;
      }

      const result = await postGenerateResult({
        image_url,
        room_type,
        style,
        prompt,
        token,
      });
      setResult(result);
      console.log('result:', result);
      navigate('/result');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-80 flex items-center justify-center">
          <LoadingComponent />
        </div>
      )}
      <div className="w-full max-w-7xl mx-auto flex flex-col  min-h-screen box-border bg-white lg:max-w-4xl">
        <HeaderBack title="" bgColor="bg-sage-bg" />
        <main className="flex-1 flex flex-col px-6 pt-16">
          <Title
            title="추가 요구사항을 입력해주세요"
            subtitle="더 들어갔으면 하는 가구 등 디테일한 요청을 적어주시면 <br>인테리어에 반영됩니다."
          />

          {/* 상세 요구사항 입력란 */}
          <Detail onChange={handlePromptChange} />

          {/* 분리된 TipSection 컴포넌트 사용 */}
          <TipSection />

          {/* 에러 메시지 */}
          {error && <div className="text-red-500 mt-4 text-sm">{error}</div>}
        </main>

        <footer className="fixed bottom-0 left-0 right-0 p-4 flex-shrink-0 bg-white mt-auto">
          <ButtonAction
            hraf="/result"
            onClick={handleComplete}
            isDisabled={!prompt || prompt.trim() === '' || loading}
          >
            {loading ? '로딩 중...' : '완료'}
          </ButtonAction>
        </footer>
      </div>
    </>
  );
}
