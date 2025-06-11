import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Splash from './components/splash/splash';
import Login from './components/Login/login';
import VendorRegister from './components/VendorRegister/vendorRegister';
import Role from './components/Roles/role';
import TenentRegister from './components/TenentRegister/tenentRegister';
import { AuthProvider } from './context/AuthContext';
import VendorDashboard from './components/VendorDashboard/vendorDashboard';
import TenentDashboard from './components/TenentDashboard/tenentDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/role" element={<Role />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vendor-register" element={<VendorRegister />} />
            <Route path="/tenent-register" element={<TenentRegister />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/tenent-dashboard" element={<TenentDashboard/>}/>
          </Routes>
        </AuthProvider>
        <ToastContainer />
      </header>
    </div>

  );
}

export default App;
