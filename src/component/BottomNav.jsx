// src/components/BottomNav.js

import React from 'react';

// SVG 아이콘들을 별도의 컴포넌트로 만들면 더 깔끔하게 관리할 수 있습니다.
const HomeIcon = ({ isActive }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    viewBox="0 0 20 20"
    fill={isActive ? '#6B8A7A' : 'currentColor'}
  >
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);
// LibraryIcon, ProfileIcon 등도 위와 같이 만들 수 있습니다.

function BottomNav({ activeMenu }) {
  const NavItem = ({ href, icon, label, name }) => {
    const isActive = activeMenu === name;
    return (
      <a
        href={href}
        className={`flex flex-col items-center space-y-1 ${isActive ? 'text-cyan-point' : 'text-icon-gray'}`}
      >
        {icon({ isActive })}
        <span>{label}</span>
      </a>
    );
  };

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-sm border-t border-gray-200/80 flex justify-around items-center text-xs text-icon-gray font-medium z-10">
      <NavItem href="#" icon={HomeIcon} label="홈" name="home" />
      {/* 라이브러리, 프로필 아이콘도 컴포넌트로 만들어 사용하면 좋습니다. */}
      <a href="./library.html" className="flex flex-col items-center space-y-1">
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
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

export default BottomNav;
