// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
// import ARScene from './pages/ARScene';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/ar" element={<ARScene />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
