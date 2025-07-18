// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import MainPage from './pages/MainPage.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ManualPage from './pages/ManualPage.jsx';
<<<<<<< HEAD
import RoomType from './pages/RoomType.jsx';
=======
import Login from './pages/Login';
import UploadPage from './pages/UploadPage.jsx';
>>>>>>> ef42948ebc1d2445a8a7ad25d7105407f5867c73
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/library" element={<LibraryPage />} />
          <Route path="/RoomType" element={<RoomType />} />
          <Route path="/ManualPage" element={<ManualPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/manual" element={<ManualPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}
