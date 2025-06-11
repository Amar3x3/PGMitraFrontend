import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Home from './components/home';
import Complaint from './components/TenantComplaints/Complaint';
import Announcements from './components/TenantAnnouncements/Announcements';
import FoodMenu from './components/TenantFoodMenu/FoodMenu';
import EditPersonalInfo from './components/TenantPersonalInfo/EditPersonalInfo';
import ViewPersonalInfo from './components/TenantPersonalInfo/ViewPersonalInfo';
import TenantDashboard from './components/TenantDashboard/TenantDashboard';
import OwnerComplaints from './components/OwnerComplaints/OwnersComplaints';
import OwnerDiningMenu from './components/OwnerDiningMenu/OwnerDiningMenu';
import OwnerAnnouncements from './components/OwnerAnnouncements/OwnerAnnouncements';


function App() {
  return (
    // <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
          
            <Route path='/' element={<App/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/raise-request' element={<Complaint/>}></Route>
            <Route path='/announcements' element={<Announcements></Announcements>}></Route>
            <Route path='/food-menu' element={<FoodMenu/>}></Route>
            <Route path='/edit-personal-info' element={<EditPersonalInfo></EditPersonalInfo>}></Route>
            <Route path='/view-personal-info' element={<ViewPersonalInfo/>}></Route>
            <Route path='/tenant-dashboard' element={<TenantDashboard/>}></Route>
            <Route path='/owners-complaints' element={<OwnerComplaints/>}></Route>
            <Route path='/owners-menu' element={<OwnerDiningMenu></OwnerDiningMenu>}></Route>
            <Route path='/owners-announcement' element={<OwnerAnnouncements/>}></Route>
        </Routes>
        </header>

        {/* <Routes>
          <Route path="/raise-request" element={<Complaint/>}/>
        </Routes> */}
        
      </div>
    // </Router>
  );
}

export default App;
