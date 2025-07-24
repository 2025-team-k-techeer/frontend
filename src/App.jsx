// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

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

export default function App() {
  return (
    <div>
      <BrowserRouter>
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
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}
