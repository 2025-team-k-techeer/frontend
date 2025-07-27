// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import ScrollToTop from './components/ScrollToTop';

// 동적 임포트
const MainPage = lazy(() => import('/src/pages/MainPage.jsx'));
const LibraryPage = lazy(() => import('/src/pages/LibraryPage.jsx'));
const ProfilePage = lazy(() => import('/src/pages/ProfilePage.jsx'));
const ManualPage = lazy(() => import('/src/pages/ManualPage.jsx'));
const RoomType = lazy(() => import('/src/pages/RoomType.jsx'));
const UploadPage = lazy(() => import('/src/pages/UploadPage.jsx'));
const LoginPage = lazy(() => import('/src/pages/LoginPage.jsx'));
const SignUpPage = lazy(() => import('/src/pages/SignUpPage.jsx'));
const ResultPage = lazy(() => import('/src/pages/ResultPage.jsx'));
const ARPage = lazy(() => import('/src/pages/ARPage.jsx'));
const RoomDetail = lazy(() => import('/src/pages/RoomDetail.jsx'));
const RoomStyle = lazy(() => import('/src/pages/RoomStyle.jsx'));
const ARPageWrapper = lazy(() => import('/src/pages/ArpageWrapper.jsx'));
// 예시 mock 데이터
const mockModels = [
  {
    label: '의자',
    model_url: 'https://example.com/model1.glb',
    image_url: 'https://example.com/image1.png',
    width_cm: 50,
    height_cm: 80,
    depth_cm: 50,
    scale: 1.0,
  },
  {
    label: '책상',
    model_url: 'https://example.com/model2.glb',
    image_url: 'https://example.com/image2.png',
    width_cm: 120,
    height_cm: 75,
    depth_cm: 60,
    scale: 1.2,
  },
];

<BrowserRouter>
  <Routes>
    {/* 기존 라우트 */}
    <Route path="/" element={<MainPage />} />
    <Route path="/login" element={<LoginPage />} />
    {/* 테스트용 AR 페이지 경로 */}
    <Route path="/ar-test" element={<ARPageWrapper />} />
  </Routes>
</BrowserRouter>;

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div>로딩 중...</div>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/RoomType" element={<RoomType />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/Manual" element={<ManualPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/RoomStyle" element={<RoomStyle />} />
            <Route path="/RoomDetail" element={<RoomDetail />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/ar" element={<ARPage />} />
            <Route path="/ar-test" element={<ARPageWrapper />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}
