// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import LibraryPage from './pages/LibraryPage.jsx';
import MainPage from './pages/MainPage.jsx';
//import Login from './pages/Login';
// import ARScene from './pages/ARScene';
import ProfilePage from './pages/ProfilePage.jsx';
import ManualPage from './pages/ManualPage.jsx';
import RoomType from './pages/RoomType.jsx';
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/RoomType" element={<MainPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/" element={<RoomType />} />
          <Route path="/ManualPage" element={<ManualPage />} />
          {/* <Route path="/" element={<LibraryPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/profile" element={<ProfilePage />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}
