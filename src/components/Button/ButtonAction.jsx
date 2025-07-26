import React from 'react';

/**
 * 페이지의 주요 액션 버튼 (예: 다음, 완료 등)
 * @param {object} props
 * @param {React.ReactNode} props.children - 버튼에 표시될 내용 (주로 텍스트)
 * @param {function} props.onClick - 버튼 클릭 시 실행될 함수
 * @param {boolean} [props.isDisabled=false] - 버튼 비활성화 여부
 */
function ButtonAction({ children, onClick, isDisabled = false }) {
  // 기본 스타일
  const baseStyle =
    'w-full text-center font-bold py-4 rounded-xl text-lg transition-colors shadow-md';

  // 활성화/비활성화에 따른 스타일
  const buttonStyle = isDisabled
    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' // 비활성화 스타일 (회색톤)
    : 'bg-sage-accent text-white hover:bg-opacity-90'; // 활성화 스타일

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseStyle} ${buttonStyle}`}
    >
      {children}
    </button>
  );
}

export default ButtonAction;
