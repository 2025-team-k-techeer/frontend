import React, { useState, useEffect } from 'react';
import HeaderBack from '../components/Header/HeaderBack';
import Navigation_top from '../components/Navigation/Navigation_top';
import Manual from '../components/Tip/Manual';

function ManualPage() {
  const [activeSection, setActiveSection] = useState('upload');

  // 섹션 클릭 핸들러
  function handleSectionClick(sectionId) {
    const section = document.getElementById(sectionId);

    if (section) {
      // 네비게이션 바의 높이를 고려하여 스크롤 위치 계산
      const navHeight = 70; // 네비게이션 바 높이 (대략)
      const headerHeight = 70; // 헤더 높이 (대략)
      const offsetTop = section.offsetTop - headerHeight - navHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setActiveSection(sectionId);
  }

  // 스크롤 핸들러
  function handleScroll() {
    const sections = ['upload', 'select', 'ar'];
    let currentSection = 'upload';

    sections.forEach(function (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const navHeight = 70;
        const headerHeight = 70;
        const sectionTop = section.offsetTop - headerHeight - navHeight;
        if (window.scrollY >= sectionTop) {
          currentSection = sectionId;
        }
      }
    });

    setActiveSection(currentSection);
  }

  useEffect(function () {
    window.addEventListener('scroll', handleScroll);
    return function () {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col min-h-screen bg-white">
      <HeaderBack />
      <Navigation_top
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />
      <Manual />
    </div>
  );
}

export default ManualPage;
