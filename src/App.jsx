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
<<<<<<< HEAD
import StyleList from './pages/StyleList.jsx';
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/RoomType" element={<RoomType />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/RoomType" element={<RoomType />} />
          <Route path="/ManualPage" element={<ManualPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/manual" element={<ManualPage />} />
          <Route path="/Profilepage" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<StyleList />} />
        </Routes>
      </BrowserRouter>
=======
import LoginPage from './pages/LoginPage.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx'; //전역 상태로도 관리를 위함함

export default function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/RoomType" element={<RoomType />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/Manual" element={<ManualPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
>>>>>>> d18ba11dca5f20e9fb851b9d1994b89b578037fc
      <Analytics />
    </div>
  );
}
