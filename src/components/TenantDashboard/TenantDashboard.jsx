import React from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './TenantDashboard.css'; 
import { FaUserCircle, FaUtensils, FaBullhorn, FaHome, FaUser, FaTools, FaFileAlt, FaComments } from 'react-icons/fa';
import BottomNav from '../BottomNav';
import BottomNavBar from '../BottomNavbar/bottomNav';
import useAuth from '../../hooks/useAuth';
import { CgLogOut } from "react-icons/cg";
import { toast } from 'react-toastify';
import QuickActionButton from '../QuickActionButton/quickActionButton';
import { useState, useEffect } from 'react';
import axios from "axios"; 
import api from '../../services/authApi'; // Assuming 'authApi.js' is the correct path to your configured axios instance

function TenantDashboard() { const navigate = useNavigate();

    const [tenant, setTenant] = useState(null); 
    const{user, logout} = useAuth();
    const tenantId = localStorage.getItem('userId'); // Replace with dynamic ID if needed

    const handleLogout = () => {
        logout()
        toast.success('Logged out successfully');
        navigate('/login'); 
    };

    const handleMyProfile = () => {
        navigate('/view-personal-info');
    }

    const handleMenu = () => {
        navigate('/food-menu');
    };

    const handleRaiseComplaints = () => {
        navigate('/raise-request');
    };

    const handleAnnouncements = () => {
        navigate('/announcements');
    };

    // useEffect(() => { 
    //     const accessToken = localStorage.getItem('accessToken');
    //     axios.get(`http://localhost:1234/api/tenant/profile/id/${tenantId}`, {
    //     headers: {
    //         'Authorization' : `Bearer ${accessToken}`
    //     }}).then(
    //         (res) => setTenant(res.data)
    //     ) .catch(
    //             (err) => console.error("Error fetching tenant data:", err)
    //         ); }, [tenantId]);

    useEffect(() => {
        const fetchTenantData = async () => {
            try {
                // No need to manually get accessToken or set headers here.
                // Your api.js interceptor handles this automatically.
                const response = await api.get(`/tenant/profile/id/${tenantId}`);
                setTenant(response.data);
            } catch (err) {
                console.error("Error fetching tenant data:", err);
                // The interceptor handles 401/403 and refresh.
                // Any error caught here would be after the interceptor has tried to refresh
                // (e.g., if the refresh token also expired, or a different kind of error occurred).
            }
        };
    
        // Make sure tenantId is available before fetching
        if (tenantId) {
            fetchTenantData();
        }
    }, [tenantId]);

    if (!tenant) { 
        return <div className="loading-message">Loading profile...</div>; 
    }   


    const dashboardLinks = [
        {icon:<FaHome/>, label:"Home", path:"/tenant-dashboard"},
        //{icon:<FaFileAlt/>, label:"Payments", path:"/payment-dashboard"},
        {icon:<FaComments/>, label:"Complaints", path:"/raise-request"},
        {icon:<FaUser/>, label:"Profile", path:"/view-personal-info"}
    ]
    return ( 
    <div className="dashboard-container"> 
        <header className="dashboard-header">
                <p></p>
                <h4 className="dashboard-title">Dashboard</h4>
                <CgLogOut className="logout-icon" onClick={handleLogout}/>
        </header>
        <div className="profile-sec"> 
            <div className="profile-pic"> 
                <FaUserCircle size={64} color="#555" /> 
            </div> 
            <div className="profile-info"> 
                <h3>{tenant.name}</h3> 
                <p>{tenant.roomNo || "No Room"}</p> 
            </div> 
        </div>

        {/* <div className="quick-actions">
            <h4>Quick Actions</h4>
            <div className="action-buttons">
                <button onClick={() => navigate('/view-personal-info')}>View Profile</button>
                <button onClick={() => navigate('/food-menu')}>Today's Menu</button>
                <button onClick={() => navigate('/raise-request')}>Raise Complaint</button>
                <button onClick={() => navigate('/announcements')}>Announcements</button>
            </div>
        </div> */}

        <section className="quick-actions-section">
            <h2 className="section-title">Quick Actions</h2>
            <div className="quick-actions-grid">
                <QuickActionButton icon={<FaUser />} label="View Profile" onClick={handleMyProfile} />
                <QuickActionButton icon={<FaUtensils />} label="Today's Menu" onClick={handleMenu} />
                <QuickActionButton icon={<FaComments />} label="Raise Complaint" onClick={handleRaiseComplaints} />                
                <QuickActionButton icon={<FaBullhorn />} label="Announcements" onClick={handleAnnouncements} />                

            </div>
        </section>

        {/* <div className="bottom-navi">
            <div className="nav-item" onClick={() => navigate('/tenant-dashboard')}>
                <FaHome />
                <span>Home</span>
            </div>
            <div className="nav-item" onClick={() => navigate('/raise-request')}>
                <FaTools />
                <span>Complaints</span>
            </div>
            <div className="nav-item" onClick={() => navigate('/view-personal-info')}>
                <FaUser />
                <span>Profile</span>
            </div>
        </div> */}

        <BottomNavBar links={dashboardLinks}/>
    </div>

    ); 
}

export default TenantDashboard;

