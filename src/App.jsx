// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortfolioV1_2 from './pages/PortfolioV1.2';
import PortfolioV1_1 from './pages/PortfolioV1.1';
import Receipts from './pages/PressureCookerV1';


  export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The main path "/" loads your NEW Post-it design */}
        <Route path="/" element={<PortfolioV1_2 />} />
        
        {/* The "/progress" path loads your OLD design */}
        <Route path="/V1.1" element={<PortfolioV1_1 />} />

        {/* The "/Fast Fasion" path loads the result of the pressure cooker assignmnet*/}
        <Route path="/pressure-cooker" element={<Receipts />} />
      </Routes>
    </BrowserRouter>
  );
}
