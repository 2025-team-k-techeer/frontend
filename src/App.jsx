// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import LibraryPage from './pages/LibraryPage.jsx';
import MainPage from './pages/Home.jsx';
//import Login from './pages/Login';
// import ARScene from './pages/ARScene';
import ProfilePage from './pages/ProfilePage.jsx';
import ManualPage from './pages/ManualPage.jsx';
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ManualPage />} />
          {/* <Route path="/" element={<LibraryPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="/library" element={<MainPage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/profile" element={<ProfilePage />} />

        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}
