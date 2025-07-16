// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import LibraryPage from './pages/LibraryPage.jsx';
import MainPage from './pages/MainPage.jsx';
//import Login from './pages/Login';
// import ARScene from './pages/ARScene';
import ProfilePage from './pages/ProfilePage.jsx';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/library" element={<LibraryPage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}
