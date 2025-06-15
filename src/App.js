import { Navigate } from 'react-router-dom';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Complaint from './components/TenantComplaints/Complaint';
import Announcements from './components/TenantAnnouncements/Announcements';
import FoodMenu from './components/TenantFoodMenu/FoodMenu';
import EditPersonalInfo from './components/TenantPersonalInfo/EditPersonalInfo';
import ViewPersonalInfo from './components/TenantPersonalInfo/ViewPersonalInfo';
import TenantDashboard from './components/TenantDashboard/TenantDashboard';
import OwnerComplaints from './components/OwnerComplaints/OwnersComplaints';
import OwnerDiningMenu from './components/OwnerDiningMenu/OwnerDiningMenu';
import OwnerAnnouncements from './components/OwnerAnnouncements/OwnerAnnouncements';

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


import { RoleProvider } from './RoleContext/RoleContext';
import TenantManager from './components/TenantCreation/tenantManager';
import PaymentList from './components/PaymentsList/paymentsList';



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
    <RoleProvider>
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
              <Route path='/raise-request' element={<Complaint/>}></Route>
              <Route path='/announcements' element={<Announcements></Announcements>}></Route>
              <Route path='/food-menu' element={<FoodMenu/>}></Route>
              <Route path='/edit-personal-info' element={<EditPersonalInfo></EditPersonalInfo>}></Route>
              <Route path='/view-personal-info' element={<ViewPersonalInfo/>}></Route>
              <Route path='/tenant-dashboard' element={<TenantDashboard/>}></Route>
              <Route path='/owners-complaints' element={<OwnerComplaints/>}></Route>
              <Route path='/owners-menu' element={<OwnerDiningMenu></OwnerDiningMenu>}></Route>
              <Route path='/owners-announcement' element={<OwnerAnnouncements/>}></Route>
              <Route path="/create-property" element={<PropertyManage />} />
              <Route path='/vendor/property/:vendorId' element={<PropertyList />} />
              <Route path='/vendor/room/:propertyId' element ={<RoomManager />}/>
              <Route path='/vendor/roomdetails/:roomId/:propertyId' element ={<RoomDetailsPage />}/>
              <Route path='/create-tenant' element={<TenantManager/>}/>
              <Route path='/vendor-payments' element={<PaymentList/>}/>
              
            
              {/* <Route path="/create-property" element={<SingleButton icon={<BsBuildingFillAdd />} label="Add Property" onClick={handleAddProperty} />}/> */}
              {/* <Route path='/create-rooms' element={<SingleButton icon={<FaBed />} label="Add Rooms" onClick={handleAddRooms}/>}/> */}
              {/* <Route path='/add-members' element={<SingleButton icon={<IoPersonAddSharp />} label="Add a member" onClick={handleMembers}/>}/> */}
            </Routes>
          </AuthProvider>
          <ToastContainer />
        </PropertyProvider>

      </header>
    </div>
    </RoleProvider>

    
  );
}

export default App;
