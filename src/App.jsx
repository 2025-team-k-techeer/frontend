// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import MainPage from '/src/pages/MainPage.jsx';
import LibraryPage from '/src/pages/LibraryPage.jsx';
import ProfilePage from '/src/pages/ProfilePage.jsx';
import ManualPage from '/src/pages/ManualPage.jsx';
import RoomType from '/src/pages/RoomType.jsx';
import UploadPage from '/src/pages/UploadPage.jsx';
import LoginPage from '/src/pages/LoginPage.jsx';
import SignUpPage from '/src/pages/SignUpPage.jsx';
import ResultPage from '/src/pages/ResultPage.jsx';
import ARPage from '/src/pages/ARPage.jsx';
import RoomDetail from '/src/pages/RoomDetail.jsx';
import RoomStyle from '/src/pages/RoomStyle.jsx';

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
