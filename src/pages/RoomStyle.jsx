// src/pages/StyleSelectionPage.jsx

import React, { useState, useCallback } from 'react';

import HeaderBack from '../components/Header/HeaderBack';

import Title from '../components/Title/Title';
import ButtonS from '../components/Button/ButtonS';
import StyleModal from '../components/StyleModal';
import ButtonAction from '../components/Button/ButtonAction';
import ModernIcon from '../assets/Icon/Modern.svg?react';
import ClassicIcon from '../assets/Icon/Classic.svg?react';
import NaturalIcon from '../assets/Icon/Natural.svg?react';
import EuropeIcon from '../assets/Icon/Europe.svg?react';
import IndustrialIcon from '../assets/Icon/Industrial.svg?react';
import MinimalIcon from '../assets/Icon/Mimimal.svg?react';
import TribalIcon from '../assets/Icon/Trival.svg?react';
import RetroIcon from '../assets/Icon/Retro.svg?react';
import { useNavigate } from 'react-router-dom';
import { useRoomStyleStore } from '../store/useRoomStyleStore';

// import { ModernIcon, NordicIcon, ... } from '../components/icons';

// 데이터는 컴포넌트 바깥에 두거나 API로 받아옵니다.
const styleData = [
  {
    label: '모던',
    icon: ModernIcon,
    description: '모던 스타일 설명',
  },
  { label: '클래식', icon: ClassicIcon, description: '클래식 스타일 설명' },
  { label: '내츄럴', icon: NaturalIcon, description: '내츄럴 스타일 설명' },
  { label: '북유럽', icon: EuropeIcon, description: '북유럽 스타일 설명' },
  {
    label: '인더스트리얼',
    icon: IndustrialIcon,
    description: '인더스트리얼 스타일 설명',
  },
  { label: '미니멀', icon: MinimalIcon, description: '미니멀 스타일 설명' },
  { label: '트라이벌', icon: TribalIcon, description: '트라이벌 스타일 설명' },
  { label: '빈티지', icon: RetroIcon, description: '빈티지 스타일 설명' },
  // ... 나머지 8개 스타일 데이터
];

function StyleSelectionPage() {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState(null); // 선택된 스타일 객체 저장
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setStyle = useRoomStyleStore((state) => state.setStyle);
  // 스타일 버튼 클릭 시 실행될 함수
  const handleStyleSelect = useCallback(
    (style) => {
      setSelectedStyle(style); // 클릭된 스타일 정보로 state 업데이트
      setStyle(style.label); // zustand에 label 저장
      console.log('style:', style.label);
      // setIsModalOpen(true); // 모달 열기 제거
    },
    [setStyle]
  );

  // 모달 닫기 함수
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="w-full mx-auto flex flex-col pt-20 min-h-screen lg:max-w-4xl">
      {/* 헤더 부분 */}
      <HeaderBack title="" bgColor="bg-sage-bg" />
      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col px-6 pb-6 overflow-y-auto">
        <Title
          title="원하는 인테리어 스타일을 선택해주세요"
          subtitle="선택한 스타일에 맞춰 AI가 공간을 꾸며줍니다."
        />

        {/* 스타일 버튼 그리드, map 형식으로 데이터를 불러옵니다. */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {styleData.map((style) => (
            <ButtonS
              key={style.label}
              label={style.label}
              icon={style.icon}
              isSelected={selectedStyle?.label === style.label}
              onClick={() => handleStyleSelect(style)}
              onLongPress={() => {
                setSelectedStyle(style);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </main>
      {/* 푸터 (다음 버튼) */}
      <footer className="p-4 flex-shrink-0">
        <ButtonAction
          onClick={() => {
            navigate('/RoomDetail');
          }}
          isDisabled={!selectedStyle}
        >
          다음
        </ButtonAction>
      </footer>
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
