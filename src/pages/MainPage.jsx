import React, { useState } from 'react';

import Header from '/src/components/Header/HeaderM';
import DrawerMenu from '/src/components/Menu';
import ButtonL from '/src/components/Button/ButtonL';
import InteriorStyleSection from '/src/components/MainPage/InteriorStyleSection';
import Navigation from '/src/components/Navigation/Navigation';
import HowToUse from '/src/components/MainPage/HowToUse';
import HeroBanner from '/src/components/MainPage/HeroBenner';

// 인테리어 스타일 데이터 예시
const sampleStyles = [
  {
    id: 'style_minimal',
    name: '미니멀',
    description: '불필요한 장식을 최소화하고 본질에 집중하는 스타일입니다.',
    example_image_url:
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
  },
  {
    id: 'style_natural',
    name: '내추럴',
    description: '나무, 흙 등 자연 소재를 사용하여 편안함을 주는 스타일입니다.',
    example_image_url:
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
  },
  {
    id: 'style_nordic',
    name: '북유럽',
    description: '실용성과 따뜻한 감성이 조화된 밝고 아늑한 스타일입니다.',
    example_image_url: '/styles/nordic.jpg',
  },
  {
    id: 'style_industrial',
    name: '인더스트리얼',
    description:
      '노출 콘크리트, 벽돌 등 거친 마감재를 그대로 살린 스타일입니다.',
    example_image_url: '/styles/industrial.jpg',
  },
  {
    id: 'style_classic',
    name: '클래식',
    description:
      '우아한 곡선과 고급스러운 장식이 돋보이는 전통적인 스타일입니다.',
    example_image_url: '/styles/classic.jpg',
  },
  {
    id: 'style_vintage',
    name: '빈티지',
    description: '과거의 디자인을 재현하여 향수를 불러일으키는 스타일입니다.',
    example_image_url: '/styles/classic.jpg',
  },
  {
    id: 'style_tribal',
    name: '트라이벌',
    description:
      '다채로운 색상을 과감하게 사용하여 생동감을 주는 스타일입니다.',
    example_image_url: '/styles/classic.jpg',
  },
  {
    id: 'style_modern',
    name: '모던',
    description: '기능적이고 깔끔한 선과 면으로 구성된 현대적인 스타일입니다.',
    example_image_url: '/styles/modern.jpg',
  },
];

function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="w-full min-h-screen bg-white mx-auto  
                lg:max-w-6xl" //데스크탑 사이즈
    >
      <Header onMenuClick={() => setIsMenuOpen(true)} />

      <main className="flex-1 pt-16">
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
      <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Navigation />
    </div>
  );
}

export default MainPage;
