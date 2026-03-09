// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortfolioV1_1 from './pages/PortfolioV1.1';
import PortfolioV1_2 from './pages/PortfolioV1.2'; 
  //Sub-Project V1.2
  import Receipts from './pages/PressureCookerV1';
import PortfolioV1_3 from './pages/PortfolioV1.3';

  export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioV1_2 />} />
        
        <Route path="/V1.1" element={<PortfolioV1_1 />} />
        <Route path="/V1.2" element={<PortfolioV1_2 />} />
        <Route path="/V1.3" element={<PortfolioV1_3 />} />
        
        <Route path="/pressure-cooker" element={<Receipts />} />
      </Routes>
    </BrowserRouter>
  );
}
