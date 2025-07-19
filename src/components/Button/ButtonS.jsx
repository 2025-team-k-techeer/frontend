import React, { useRef } from 'react';
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
  onLongPress,
  layout = 'square',
}) {
  const timerRef = useRef(null);

  const layoutClasses = {
    square: 'flex-col aspect-square',
    full: 'w-full mt-4',
  };

  // 선택 상태에 따른 스타일 분기 처리
  const selectionClasses = isSelected
    ? 'border-sage-accent text-sage-accent' // 선택됐을 때
    : 'border-gray-100 text-brand-charcoal'; // 선택 안 됐을 때

  const iconColor = isSelected ? 'text-sage-accent' : 'text-icon-gray';

  const handlePressStart = () => {
    timerRef.current = setTimeout(() => {
      if (onLongPress) onLongPress();
    }, 600); // 600ms 이상 누르면 long press로 간주
  };

  const handlePressEnd = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}
      data-label={label} // 버튼 클릭 시 라벨 값을 전달(룸스타일선택에 이용)
      className={`flex justify-center items-center bg-white p-4 rounded-2xl border-2 hover:border-gray-300 transition-all 
        ${layoutClasses[layout]} 
        ${selectionClasses}`}
    >
      <div
        className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center 
          ${layout === 'square' ? 'mb-3' : 'mr-4'}`}
      >
        {/* Icon이 존재할 때만 렌더링하도록 변경 */}
        {Icon && <Icon className={`h-8 w-8 ${iconColor}`} />}
      </div>
      <span className="font-semibold text-base text-center">{label}</span>
    </button>
  );
}
export default ButtonS;
