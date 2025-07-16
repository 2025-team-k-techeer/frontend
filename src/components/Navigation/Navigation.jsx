import React from 'react';
import './Navigation.css'; // CSS 파일을 임포트하여 스타일 적용
function Navigation() {
  return (
    // 여기에 fixed, bottom-0, left-0, right-0, w-full 클래스를 추가합니다.
    <nav className="fixed bottom-0 left-0 right-0 w-full h-20 bg-white/80 backdrop-blur-sm border-t border-gray-200/80 flex justify-around items-center text-xs text-icon-gray font-medium z-10 flex-shrink-0 h-20-set">
      <a href="./index.html" className="flex flex-col items-center space-y-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span>홈</span>
      </a>
      <a
        href="./library.html"
        className="flex flex-col items-center space-y-1 text-sage-accent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
        <span>라이브러리</span>
      </a>
      <a href="./profile.html" className="flex flex-col items-center space-y-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span>프로필</span>
      </a>
    </nav>
  );
}

export default Navigation;
