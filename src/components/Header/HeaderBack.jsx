// Header.jsx
import React from 'react';
import LeftArrow from '/src/assets/Icon/LeftArrow';

function HeaderBack({
  title = '프로필',
  bgColor = 'bg-white', // 배경색을 위한 prop, 기본값은 'bg-white'
  showBorder = true, // 하단 구분선을 위한 prop, 기본값은 true (보임)
}) {
  // 배경색 Tailwind 클래스를 동적으로 적용합니다.
  // 예를 들어, bgColor에 'sage-bg'를 전달하면 'bg-sage-bg' 클래스가 적용됩니다.
  const headerBgClass = bgColor;

  // 하단 구분선 Tailwind 클래스를 조건부로 적용합니다.
  const borderClass = showBorder ? 'border-b border-gray-200' : '';
  // 뒤로 가기 핸들러 함수
  function handleGoBack() {
    window.history.back();
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full p-4 flex items-center z-10 flex-shrink-0 bg-sage-bg ${headerBgClass} ${borderClass}`}
    >
      <button
        onClick={handleGoBack}
        className="p-2 -ml-2 focus:outline-none bg-transparent hover:bg-transparent"
      >
        <LeftArrow className="h-6 w-6 text-brand-charcoal" />
      </button>
      <h1 className="text-xl font-bold text-brand-charcoal text-center flex-1">
        {title}
      </h1>
      <div className="w-6 p-2"></div>
    </header>
  );
}

export default HeaderBack;
