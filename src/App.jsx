// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import MainPage from './pages/MainPage.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ManualPage from './pages/ManualPage.jsx';
import RoomType from './pages/RoomType.jsx';
import UploadPage from './pages/UploadPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import StyleList from './pages/StyleList.jsx';
import RoomStyle from './pages/RoomStyle.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx'; //전역 상태로도 관리를 위함함

export default function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/RoomType" element={<RoomType />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/Manual" element={<ManualPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/StyleList" element={<StyleList />} />
            <Route path="/RoomStyle" element={<RoomStyle />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Analytics />
    </div>
  );
}
