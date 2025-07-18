// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import MainPage from './pages/MainPage.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ManualPage from './pages/ManualPage.jsx';
import UploadPage from './pages/UploadPage.jsx';
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/manual" element={<ManualPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}
