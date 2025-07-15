// src/App.jsx
import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import Login from './pages/Login';
// import ARScene from './pages/ARScene';
import AR from './pages/AR';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AR />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}
