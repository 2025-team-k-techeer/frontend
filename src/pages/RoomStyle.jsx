// src/pages/StyleSelectionPage.jsx

import React, { useState, useCallback } from 'react';
import HeaderBack from '../components/HeaderBack';
import Title from '../components/Title/Title';
import ButtonT from '../components/Button/ButtonT';
import StyleModal from '../components/StyleModal';
import ButtonAction from '../components/Button/ButtonAction';

// import { ModernIcon, NordicIcon, ... } from '../components/icons';

// 데이터는 컴포넌트 바깥에 두거나 API로 받아옵니다.
const styleData = [
  { label: '모던', icon: null, description: '모던 스타일 설명' },
  { label: '클래식', icon: null, description: '클래식 스타일 설명' },
  { label: '내츄럴', icon: null, description: '내츄럴 스타일 설명' },
  { label: '북유럽', icon: null, description: '북유럽 스타일 설명' },
  {
    label: '인더스트리얼',
    icon: null,
    description: '인더스트리얼 스타일 설명',
  },
  { label: '미니멀', icon: null, description: '미니멀 스타일 설명' },
  { label: '트라이벌', icon: null, description: '트라이벌 스타일 설명' },
  { label: '빈티지', icon: null, description: '빈티지 스타일 설명' },
  // ... 나머지 8개 스타일 데이터
];

function StyleSelectionPage() {
  const [selectedStyle, setSelectedStyle] = useState(null); // 선택된 스타일 객체 저장
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 스타일 버튼 클릭 시 실행될 함수
  const handleStyleSelect = useCallback((style) => {
    setSelectedStyle(style); // 클릭된 스타일 정보로 state 업데이트
    setIsModalOpen(true); // 모달 열기
  }, []);

  // 모달 닫기 함수
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // 2. 다음 버튼 클릭 시 실행될 함수를 정의합니다.
  const handleNextClick = () => {
    // 선택된 스타일이 없으면 아무것도 하지 않습니다.
    if (!selectedStyle) return;
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col min-h-screen">
      {/* 헤더 부분 */}
      <HeaderBack title="" bgColor="bg-sage-bg" />
      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col px-6 pb-6 overflow-y-auto">
        <Title
          title="원하는 인테리어 스타일을 선택해주세요"
          subtitle="선택한 스타일에 맞춰 AI가 공간을 꾸며줍니다."
        />

        {/* 스타일 버튼 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {styleData.map((style) => (
            <ButtonT
              key={style.label}
              label={style.label}
              icon={style.icon}
              isSelected={selectedStyle?.label === style.label}
              onClick={() => handleStyleSelect(style)}
            />
          ))}
        </div>
      </main>
      {/* 푸터 (다음 버튼) */}
      <ButtonAction
            onClick={handleNextClick}
            disabled={!selectedStyle} {/*selectedStyle이 null이면 true, 아니면 false가 전달됩니다.*/}>
              다음
              <ButtonAction />
      {/*selectedStyle이 null이면 true, 아니면 false가 전달됩니다.*/}
      {/* 모달 컴포넌트 */}
      <StyleModal
        isOpen={isModalOpen}
        onClose={closeModal}
        label={selectedStyle?.label}
        description={selectedStyle?.description}
      />
    </div>
  );
}

export default StyleSelectionPage;
