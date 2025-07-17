import React from 'react';

/**
 * 페이지의 주요 액션 버튼 (예: 다음, 완료 등)
 */
function ButtonAction({ children, onClick, isDisabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`w-full text-center font-bold py-4 rounded-xl text-lg transition-colors shadow-md ${
        isDisabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-sage-accent text-white hover:bg-opacity-90'
      }`}
    >
      {children}
    </button>
  );
}

export default ButtonAction;
