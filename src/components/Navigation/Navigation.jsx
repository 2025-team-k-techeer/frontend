// 1. a 태그 대신 NavLink를 import 합니다.
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import HomeIcon from '../../assets/Icon/Home.svg?react';
import LibraryIcon from '../../assets/Icon/Library.svg?react';
import ProfileIcon from '../../assets/Icon/Profile.svg?react';

function Navigation() {
  // 2. 활성/비활성 스타일에 따라 클래스 이름을 반환하는 함수를 만듭니다.
  function getLinkClassName({ isActive }) {
    // 공통으로 적용될 기본 클래스
    const baseClasses = 'flex flex-col items-center space-y-1 font-medium';
    // 활성 상태일 때 추가될 클래스
    const activeClass = 'text-sage-accent';
    // 비활성 상태일 때 적용될 클래스
    const inactiveClass = 'text-icon-gray';

    return `${baseClasses} ${isActive ? activeClass : inactiveClass}`;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full h-20 bg-white/80 backdrop-blur-sm border-t border-gray-200/80 flex justify-around items-center text-xs z-10 flex-shrink-0 h-20-set">
      {/* 3. a 태그를 NavLink로 바꾸고, href를 to로 바꿉니다. */}
      {/* className에 위에서 만든 함수를 적용합니다. */}
      <NavLink to="/home" className={getLinkClassName}>
        {/* SVG 아이콘 */}
        <HomeIcon className="h-6 w-6" />
        <span>홈</span>
      </NavLink>

      <NavLink to="/library" className={getLinkClassName}>
        {/* SVG 아이콘 */}
        <LibraryIcon className="h-6 w-6" />
        <span>라이브러리</span>
      </NavLink>

      <NavLink to="/profile" className={getLinkClassName}>
        {/* SVG 아이콘 */}
        <ProfileIcon className="h-6 w-6" />
        <span>프로필</span>
      </NavLink>
    </nav>
  );
}

export default Navigation;
