import React from 'react';
/**
 * 공간 유형 선택 버튼 컴포넌트
 * @param {object} props
 * @param {string} props.label - 버튼에 표시될 텍스트 (예: "거실")
 * @param {React.ElementType} props.icon - 표시될 SVG 아이콘 컴포넌트
 * @param {boolean} props.isSelected - 현재 버튼의 선택 여부
 * @param {function} props.onClick - 버튼 클릭 시 실행될 함수
 * @param {'square' | 'full'} [props.layout='square'] - 버튼 레이아웃 ('square': 정사각형, 'full': 가로 전체)
 */
function ButtonS({
  label,
  icon: Icon,
  isSelected,
  onClick,
  layout = 'square',
}) {
  const layoutClasses = {
    square: 'flex-col aspect-square',
    full: 'w-full mt-4',
  };

  // 선택 상태에 따른 스타일 분기 처리
  const selectionClasses = isSelected
    ? 'border-sage-accent text-sage-accent' // 선택됐을 때
    : 'border-gray-100 text-brand-charcoal'; // 선택 안 됐을 때

  const iconColor = isSelected ? 'text-sage-accent' : 'text-icon-gray';
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center bg-white p-4 rounded-2xl border-2 hover:border-gray-300 transition-all
        ${layoutClasses[layout]}
        ${selectionClasses}`}
    >
      <div
        className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center 
          ${layout === 'square' ? 'mb-3' : 'mr-4'}`}
      >
        <Icon className={`h-8 w-8 ${iconColor}`} />
      </div>
      <span className="font-semibold text-base text-center">{label}</span>
    </button>
  );
}
export default ButtonS;
