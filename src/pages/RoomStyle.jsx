import React, { useState, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import HeaderBack from '../components/HeaderBack';
import ButtonS from '../components/Button/ButtonS';
import StyleModal from '../components/StyleModal';
import ButtonAction from '../components/Button/ButtonAction';

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
];

function RoomStyle() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(null);

  const handleStyleSelect = useCallback((event) => {
    const label = event.currentTarget.dataset.style;
    const styleInfo = styleData.find((s) => s.label === label);

    if (styleInfo) {
      setSelectedStyle(styleInfo);
      setIsModalOpen(true);
    }
  }, []); // styleData가 API로 받아오는 동적인 데이터가 되면 [styleData]를 의존성 배열에 추가해야 합니다.

  // 모달을 닫는 함수
  function closeModal() {
    setIsModalOpen(false);
  }

  function handleNextClick() {
    // 예시: alert 또는 페이지 이동
    Navigate('/RoomType');
    // 또는 navigate('/다음페이지');
  }
  return (
    <div>
      <div>
        <HeaderBack title="" bgColor="bg-sage-bg" />
        {styleData.length > 0 ? (
          <div
            id="style-select-grid"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {styleData.map((style) => (
              <ButtonS
                key={style.label}
                label={style.label}
                icon={style.icon}
                isSelected={selectedStyle?.label === style.label}
                onClick={handleStyleSelect}
                data-style={style.label}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">표시할 스타일이 없습니다.</p>
        )}
        <StyleModal
          isOpen={isModalOpen}
          onClose={closeModal}
          name={selectedStyle?.label}
          description={selectedStyle?.description}
        />
      </div>
      <ButtonAction onClick={handleNextClick} isDisabled={!selectedStyle}>
        다음
      </ButtonAction>
    </div>
  );
}
export default RoomStyle;
