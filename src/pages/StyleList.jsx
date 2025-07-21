import React from 'react';
import HeaderBack from '../components/Header/HeaderBack';
import InteriorList from '../components/List';
import Navigation from '../components/Navigation/Navigation';

function StyleList() {
  return (
    // LibraryPage 자체가 페이지 전체의 컨테이너 역할을 합니다.
    // 기존 App.jsx에 있던 레이아웃 클래스들을 이리로 옮깁니다.
    <div className="flex flex-col pt-20 h-screen mx-auto lg:max-w-6xl">
      <HeaderBack title="인테리어 스타일" className="flex-shrink-0" />
      <main>
        <InteriorList />
      </main>
      <Navigation />
    </div>
  );
}

export default StyleList;
