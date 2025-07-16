import React, { useState } from 'react';

import Header from '../component/Header';
import FullscreenMenu from '../component/HambergerManu';
import ActionButton from '../component/ActionButton';
import InteriorStyleSection from '../component/InteriorStyleSection';

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

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="w-full min-h-screen bg-white
                md:max-w-3xl md:mx-auto  //태블릿 사이즈에선 최대 너비 지정 및 가운데 정렬
                lg:max-w-5xl" //데스크탑에선 최대 너비 더 넓게
    >
      <Header onMenuClick={() => setIsMenuOpen(true)} />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-8 pb-24">
          {/* 상단 배너 섹션 */}
          <section className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
              alt="메인 배너"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-5 text-white font-laundry">
              <h2 className="text-2xl font-bold mb-1">
                AI로 완성하는
                <br />
                나만의 인테리어
              </h2>
              <p className="text-sm font-light">
                한 번의 클릭으로 새로운 공간을 경험해보세요
              </p>
            </div>
          </section>

          {/* 시작하기 버튼 컴포넌트 사용 */}
          <ActionButton href="/upload" variant="primary">
            시작하기
          </ActionButton>

          {/* 인테리어 스타일 섹션 컴포넌트 사용 */}
          <InteriorStyleSection styles={sampleStyles} />
        </div>
      </main>

      {/* 하단 네비게이션은 생략... 필요시 컴포넌트화 가능 */}

      {/* 햄버거 메뉴 컴포넌트 사용 */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
};

export default MainPage;
