// src/pages/StyleSelectionPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 컴포넌트 import
import HeaderBack from '/src/components/Header/HeaderBack';
import Title from '/src/components/Title/Title';
import ButtonS from '/src/components/Button/ButtonS';
import StyleModal from '/src/components/StyleModal';
import ButtonAction from '/src/components/Button/ButtonAction';
import { useRoomStyleStore } from '/src/store/useRoomStyleStore';
import { fetchAllStyles } from '/src/api/styleApi'; //API 함수

// 아이콘 import
import ModernIcon from '/src/assets/Icon/Modern.svg?react';
import ClassicIcon from '/src/assets/Icon/Classic.svg?react';
import NaturalIcon from '/src/assets/Icon/Natural.svg?react';
import EuropeIcon from '/src/assets/Icon/Europe.svg?react';
import IndustrialIcon from '/src/assets/Icon/Industrial.svg?react';
import MinimalIcon from '/src/assets/Icon/Mimimal.svg?react';
import TribalIcon from '/src/assets/Icon/Tribal.svg?react';
import RetroIcon from '/src/assets/Icon/Retro.svg?react';

// API의 style_id와 프론트엔드의 아이콘 컴포넌트를 연결하는 객체
// styleIconMap 으로 명확하게 바꿈
const styleIconMap = {
  style_modern: ModernIcon,
  style_classic: ClassicIcon,
  style_natural: NaturalIcon,
  style_nordic: EuropeIcon,
  style_industrial: IndustrialIcon,
  style_minimal: MinimalIcon,
  style_tribal: TribalIcon,
  style_vintage: RetroIcon,
};

function StyleSelectionPage() {
  const navigate = useNavigate();
  const [styles, setStyles] = useState([]); // API로 받아온 스타일 목록 전체 저장
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setStyleInStore = useRoomStyleStore((state) => state.setStyle);

  // 페이지가 처음 렌더링될 때 API 호출
  useEffect(() => {
    const getStyles = async () => {
      try {
        const allStyles = await fetchAllStyles();
        console.log('서버가 준 스타일 목록:', allStyles);
        console.log('API 응답 데이터:', allStyles);
        console.log('데이터 타입:', typeof allStyles);
        console.log('배열인가?', Array.isArray(allStyles));
        // API 응답이 배열인지 확인하고, 배열이 아니면 빈 배열로 설정
        setStyles(Array.isArray(allStyles) ? allStyles : []);
      } catch (error) {
        console.error('스타일 목록을 불러오는 데 실패했습니다:', error);
        alert('스타일 목록을 불러오는 데 실패했습니다.');
        setStyles([]); // 에러 시에도 빈 배열로 설정
      }
    };
    getStyles();
  }, []);

  // 스타일 버튼 클릭 시
  function handleStyleSelect(style) {
    setSelectedStyle(style);
    setStyleInStore(style.style_id);
  }

  // 버튼을 꾹 눌렀을 때
  function handleLongPress(style) {
    setSelectedStyle(style); // 모달에 보여줄 스타일 정보 업데이트
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="w-full mx-auto flex flex-col pt-16 min-h-screen lg:max-w-4xl">
      {/* 헤더 부분 */}
      <HeaderBack title="" bgColor="bg-sage-bg" />
      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col px-6 pb-24 overflow-y-auto">
        <Title
          title="인테리어 스타일을 선택해주세요"
          subtitle="선택한 스타일에 맞춰 AI가 공간을 꾸며줍니다.<br/>꾹 누르면 스타일에 대한 설명을 확인할 수 있습니다."
        />

        {/* 스타일 버튼 그리드, map 형식으로 데이터를 불러옵니다. */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.isArray(styles) &&
            styles.map((style) => (
              <ButtonS
                key={style.style_id}
                label={style.name}
                icon={styleIconMap[style.style_id]}
                isSelected={selectedStyle?.style_id === style.style_id}
                imageSrc={Style.image_url}
                onClick={() => handleStyleSelect(style)}
                onLongPress={() => handleLongPress(style)}
              />
            ))}
        </div>
      </main>

      {/* 푸터 (다음 버튼) */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 flex-shrink-0 bg-white">
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
        label={selectedStyle?.name}
        description={selectedStyle?.description} // API로 받아온 description
      />
    </div>
  );
}

export default StyleSelectionPage;
