import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
    <Route path="/" element={ <LandingPage/> } />
    <Route path="/dashboard" element={ <Dashboard/> } />
    <Route path="/contact" element={  <><h1>contact</h1></> } />
  </Routes>
  )
}

export default App
