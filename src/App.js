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
import RoomManager from './components/RoomsCreation/roomManage';
import { PropertyProvider } from './components/contexts/PropertyContext';
import PropertyList from './components/PropertyCreation/propertyList';
import RoomDetailsPage from './components/RoomDetails/roomdetails';





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
        <PropertyProvider>

          <AuthProvider>
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/role" element={<Role />} />
              <Route path="/login" element={<Login />} />
              <Route path="/vendor-register" element={<VendorRegister />} />
              <Route path="/tenent-register" element={<TenentRegister />} />
              <Route path="/vendor-dashboard" element={<VendorDashboard />} />
              <Route path="/tenent-dashboard" element={<TenentDashboard />} />
              <Route path="/create-property" element={<PropertyManage />} />
              <Route path='/vendor/property/:vendorId' element={<PropertyList />} />
              <Route path='/vendor/room/:propertyId' element ={<RoomManager />}/>
              <Route path='/vendor/roomdetails/:roomId' element ={<RoomDetailsPage />}/>
        

              {/* <Route path="/create-property" element={<SingleButton icon={<BsBuildingFillAdd />} label="Add Property" onClick={handleAddProperty} />}/> */}
              {/* <Route path='/create-rooms' element={<SingleButton icon={<FaBed />} label="Add Rooms" onClick={handleAddRooms}/>}/> */}
              {/* <Route path='/add-members' element={<SingleButton icon={<IoPersonAddSharp />} label="Add a member" onClick={handleMembers}/>}/> */}
            </Routes>
          </AuthProvider>
          <ToastContainer />
        </PropertyProvider>

      </header>
    </div>

  );
}

export default App;
