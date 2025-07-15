import React from 'react';

function Header() {
  return (
    <header className="p-4 flex items-center bg-white z-10 border-b border-gray-200 flex-shrink-0">
      <a href="./index.html" className="p-2 -ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-brand-charcoal"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </a>
      <h1 className="text-xl font-bold text-brand-charcoal text-center flex-1">
        라이브러리
      </h1>
      {/* 헤더 중앙 정렬을 위한 빈 공간 */}
      <div className="w-6 p-2"></div>
    </header>
  );
}

export default Header;
