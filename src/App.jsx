// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import MainPage from './pages/MainPage.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ManualPage from './pages/ManualPage.jsx';
import RoomType from './pages/RoomType.jsx';
import Login from './pages/Login';
import UploadPage from './pages/UploadPage.jsx';
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
      <Analytics />
    </div>
  );
}
