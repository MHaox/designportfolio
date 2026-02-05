// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostItBoard from './PortfolioV1.2';
import OldPortfolio from './PortfolioV1.1';
import Receipts from './PressureCookerV1';


  export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The main path "/" loads your NEW Post-it design */}
        <Route path="/" element={<PostItBoard />} />
        
        {/* The "/progress" path loads your OLD design */}
        <Route path="/progress" element={<OldPortfolio />} />

        {/* The "/Fast Fasion" path loads the result of the pressure cooker assignmnet*/}
        <Route path="/pressure-cooker" element={<Receipts />} />
      </Routes>
    </BrowserRouter>
  );
}
