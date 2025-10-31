import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './App.jsx'
import Transparency from './pages/Transparency.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/transparency" element={<Transparency />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
