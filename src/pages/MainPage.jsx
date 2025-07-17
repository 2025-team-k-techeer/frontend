import React, { useState } from 'react';

import Header from '../components/HeaderM';
import Menu from '../components/Menu';
import ButtonL from '../components/ButtonL';
import InteriorStyleSection from '../components/InteriorStyleSection';
import Navigation from '../components/Navigation/Navigation';
import HowToUse from '../components/HowToUse';
import HeroBanner from '../components/MainPage/HeroBenner';

// 인테리어 스타일 데이터 예시
const sampleStyles = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013',
    title: '모던 스타일',
    description: '깔끔하고 현대적인 느낌',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
    title: '미니멀 스타일',
    description: '단순함 속의 아름다움',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc',
    title: '내추럴 스타일',
    description: '자연의 편안함',
  },
];

function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="w-full min-h-screen bg-white
                md:max-w-3xl md:mx-auto  //태블릿 사이즈에선 최대 너비 지정 및 가운데 정렬
                lg:max-w-5xl" //데스크탑에선 최대 너비 더 넓게
    >
      <Header onMenuClick={() => setIsMenuOpen(true)} />

      <main className="flex-1">
        <div className="p-4 space-y-8 pb-24">
          {/* 상단 배너 섹션 */}
          <HeroBanner />

          {/* 시작하기 버튼 컴포넌트 사용 */}
          <ButtonL href="/upload" variant="primary">
            시작하기
          </ButtonL>
          {/* 사용법 섹션 컴포넌트 사용 */}
          <HowToUse />

          {/* 인테리어 스타일 섹션 컴포넌트 사용 */}
          <InteriorStyleSection styles={sampleStyles} />
        </div>
      </main>

      {/* 햄버거 메뉴 컴포넌트 사용 */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Navigation />
    </div>
  );
}

export default MainPage;
