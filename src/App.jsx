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
import ResultPage from './pages/ResultPage.jsx';
import ARPage from './pages/ARPage.jsx';
import RoomDetail from './pages/RoomDetail.jsx';
import RoomStyle from './pages/RoomStyle.jsx';

export default function App() {
  return (
    <div>
      <BrowserRouter>
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
      </BrowserRouter>
      <Analytics />
    </div>
  );
}
