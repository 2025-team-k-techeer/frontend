import React from 'react';
// src/components 폴더에서 필요한 컴포넌트들을 임포트합니다.
import HeaderBack from '../components/Header/HeaderBack.jsx';
import ImageGrid from '../components/ImageGrid/ImageGrid.jsx';
import Navigation from '../components/Navigation/Navigation.jsx';

function LibraryPage() {
  return (
    // LibraryPage 자체가 페이지 전체의 컨테이너 역할을 합니다.
    // 기존 App.jsx에 있던 레이아웃 클래스들을 이리로 옮깁니다.
    <div className="bg-white w-full max-w-6xl mx-auto flex flex-col min-h-screen">
      <HeaderBack
        title="라이브러리"
        bgColor="bg-sage" // 배경색을 sage로 변경
        showBorder={true} // 구분선 보임 (true는 기본값이므로 생략 가능)
      />
      <ImageGrid />
      <Navigation />
    </div>
  );
}

export default LibraryPage;
