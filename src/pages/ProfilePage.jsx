// App.js (예시)
import React from 'react';
import HeaderBack from '../components/Header/HeaderBack'; // HeaderBack 컴포넌트를 import 합니다.
import ProfileInfo from '../components/ProfileInfo';
import MyLibraryPreview from '../components/MyLibraryPreview';
import Navigation from '../components/Navigation/Navigation'; // Navigation 컴포넌트를 import 합니다.

function App() {
  return (
    <div className="w-full lg:max-w-3xl mx-auto flex flex-col pt-20 min-h-screen bg-white p-4">
      <HeaderBack
        title="내 프로필"
        bgColor="bg-sage" // 배경색을 sage로 변경
        showBorder={true} // 구분선 보임 (true는 기본값이므로 생략 가능)
      />
      <main>
        <ProfileInfo />
        <MyLibraryPreview />
      </main>
      <Navigation />
    </div>
  );
}

export default App;
