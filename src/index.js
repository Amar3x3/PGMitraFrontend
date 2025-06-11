import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter as Browser, Routes, Route, useLocation, BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Home from './components/home';
import Complaint from './components/TenantComplaints/Complaint';
import Announcements from './components/TenantAnnouncements/Announcements';
import FoodMenu from './components/TenantFoodMenu/FoodMenu';
import EditPersonalInfo from './components/TenantPersonalInfo/EditPersonalInfo';
import ViewPersonalInfo from './components/TenantPersonalInfo/ViewPersonalInfo';
import TenantDashboard from './components/TenantDashboard/TenantDashboard';
import OwnerComplaints from './components/OwnerComplaints/OwnersComplaints';
import OwnerDiningMenu from './components/OwnerDiningMenu/OwnerDiningMenu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
