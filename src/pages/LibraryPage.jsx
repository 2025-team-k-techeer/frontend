import React from 'react';
// src/components 폴더에서 필요한 컴포넌트들을 임포트합니다.
import Header from '../components/Header.jsx';
import ImageGrid from '../components/imageGrid/ImageGrid.jsx';
import Navigation from '../components/Navigation.jsx';

function LibraryPage() {
  return (
    // LibraryPage 자체가 페이지 전체의 컨테이너 역할을 합니다.
    // 기존 App.jsx에 있던 레이아웃 클래스들을 이리로 옮깁니다.
    <div className="bg-white w-full max-w-6xl mx-auto flex flex-col min-h-screen">
      <Header />
      <ImageGrid />
      <Navigation />
    </div>
  );
}

export default LibraryPage;
