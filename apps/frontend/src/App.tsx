import './App.css'
import DashboardLayoutBasic from './layout/Dashboard';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}  />
        <Route path="/dashboard" element={<DashboardLayoutBasic />}  />
      </Routes>
    </BrowserRouter>
 
  )
}

export default App
