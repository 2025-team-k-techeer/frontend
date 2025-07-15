// src/App.jsx
import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
// import ARScene from './pages/ARScene';
import AR from './pages/AR';
import { Analytics } from '@vercel/analytics/next';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AR />} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/ar" element={<ARScene />} /> */}
        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}
