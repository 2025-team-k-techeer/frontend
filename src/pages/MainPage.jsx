import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '/src/store/useAuthStore';
import ToastMessage from '/src/components/Result/ToastMessage';

import Header from '/src/components/Header/HeaderM';
import DrawerMenu from '/src/components/Menu';
import ButtonL from '/src/components/Button/ButtonL';
import InteriorStyleSection from '/src/components/MainPage/InteriorStyleSection';
import Navigation from '/src/components/Navigation/Navigation';
import HowToUse from '/src/components/MainPage/HowToUse';
import HeroBanner from '/src/components/MainPage/HeroBenner';

import { fetchAllStyles } from '/src/api/styleApi'; // API 함수 import

function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [styles, setStyles] = useState([]); // API에서 불러온 스타일 목록
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    const getStyles = async () => {
      try {
        const allStyles = await fetchAllStyles();
        setStyles(Array.isArray(allStyles) ? allStyles : []);
      } catch (error) {
        setStyles([]);
      }
    };
    getStyles();
  }, []);

  const handleStartClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate('/upload');
    } else {
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        navigate('/login');
      }, 1000);
    }
  };

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
          <ButtonL onClick={handleStartClick} variant="primary">
            시작하기
          </ButtonL>
          {/* 사용법 섹션 컴포넌트 사용 */}
          <HowToUse />

          {/* 인테리어 스타일 섹션 컴포넌트 사용 */}
          <InteriorStyleSection styles={styles} />
        </div>
      </main>

      {/* 햄버거 메뉴 컴포넌트 사용 */}
      <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Navigation />
      <ToastMessage
        message="로그인이 필요합니다."
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}

export default MainPage;
