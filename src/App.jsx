// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostItBoard from './PortfolioV1.2.1';
import OldPortfolio from './PortfolioV1.1.30';


  export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The main path "/" loads your NEW Post-it design */}
        <Route path="/" element={<PostItBoard />} />
        
        {/* The "/progress" path loads your OLD design */}
        <Route path="/progress" element={<OldPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
