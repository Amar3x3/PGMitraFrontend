import { Routes, Route, Navigate } from 'react-router-dom';
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import SingleButton from './components/PropertyCreation/creationbtn';
import { BsBuildingFillAdd } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import PropertyManage from './components/PropertyCreation/propertyManage';
// import RoomManager from './components/RoomsCreation/roomManage';



function App() {

  const handleAddProperty = () => {
    toast.success("Property Created");
  }

  const handleAddRooms = () => {
    toast.info("Room Added");
  }

  const handleMembers = () => {
    toast.success("Added a member!")
  }
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
            <Route path="/create-property" element={<PropertyManage/>}/>
            {/* <Route path='/create-rooms' element = {<RoomManager/>}/> */}

            {/* <Route path="/create-property" element={<SingleButton icon={<BsBuildingFillAdd />} label="Add Property" onClick={handleAddProperty} />}/> */}
            {/* <Route path='/create-rooms' element={<SingleButton icon={<FaBed />} label="Add Rooms" onClick={handleAddRooms}/>}/> */}
            {/* <Route path='/add-members' element={<SingleButton icon={<IoPersonAddSharp />} label="Add a member" onClick={handleMembers}/>}/> */}
          </Routes>
        </AuthProvider>
        <ToastContainer />
      </header>
    </div>

  );
}

export default App;
