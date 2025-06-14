import React, { useEffect, useState } from "react"; 
import "./ViewPersonalInfo.css"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { FaEnvelope, FaHome, FaFileAlt, FaComments, FaPhone, FaVenusMars, FaUtensils, FaBriefcase, FaIdCard, FaUserShield, FaArrowLeft, FaUser } from "react-icons/fa";
import BottomNav from "../BottomNav";
import BottomNavBar from "../BottomNavbar/bottomNav";
import { MdRestaurantMenu } from "react-icons/md";
import api from "../../services/authApi";

const ViewPersonalInfo = () => 
    { const [tenant, setTenant] = useState(null); 
    const navigate = useNavigate(); 
    const tenantId = localStorage.getItem('userId'); // Replace with dynamic ID if needed
    const accessToken = localStorage.getItem('accessToken');
    
    const bottomNavLinks = [
        {icon:<FaHome/>, label:"Home", path:"/tenant-dashboard"},
        //{icon:<FaFileAlt/>, label:"Payments", path:"/payment-dashboard"},
        {icon:<FaComments/>, label:"Complaints", path:"/raise-request"},
        {icon:<FaUser/>, label:"Profile", path:"/view-personal-info"},
        {icon:<MdRestaurantMenu/>, label:"Menu", path:"/food-menu"},

    ]
    // useEffect(() => { axios.get(`http://localhost:1234/api/tenant/profile/id/${tenantId}`, {headers: {'Authorization' : `Bearer ${accessToken}`}}).then((res) => setTenant(res.data)) .catch((err) => console.error("Error fetching tenant data:", err)); }, [accessToken,tenantId]);

    useEffect(() => {
        api.get(`/tenant/profile/id/${tenantId}`)
            .then((res) => setTenant(res.data))
            .catch((err) => console.error("Error fetching tenant data:", err));
    }, [tenantId]); 

    if (!tenant) { return <div className="loading-message">Loading profile...</div>; }

    const handleBack = () => {
        navigate('/tenant-dashboard');
    };

    return ( 
    <div className="profile-container"> 
        <div className="profile-header-pro">
                <button className='back-button' onClick={handleBack}>
                    <FaArrowLeft size={16}/>    
                </button>
                {/* <IoIosArrowBack className="back-arrow" onClick={handleBack} /> */}
                <h2>Profile</h2>
        </div>
          
        <div className="profile-header"> 
            <div className="avatar-circle">👤</div> 
            <h2>{tenant.name}</h2> 
            <p className="room-number">Room {tenant.roomNumber || "Room not assigned."}</p> 
            <p className="p-num">Id: {tenantId}</p>
        </div>

        <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="info-pair">
                <span><FaEnvelope className="icon" /> Email:</span>
                <p>{tenant.email}</p>
            </div>
            <div className="info-pair">
                <span><FaPhone className="icon" /> Phone:</span>
                <p>{tenant.phone}</p>
            </div>
            <div className="info-pair">
                <span><FaVenusMars className="icon" /> Gender:</span>
                <p>{tenant.gender}</p>
            </div>
            <div className="info-pair">
                <span><FaUtensils className="icon" /> Food Preference:</span>
                <p>{tenant.foodPreference}</p>
            </div>
            <div className="info-pair">
                <span><FaBriefcase className="icon" /> Occupation:</span>
                <p>{tenant.occupation}</p>
            </div>
            <div className="info-pair">
                <span><FaUserShield className="icon" /> Emergency Contact Name:</span>
                <p>{tenant.emergencyContactName}</p>
            </div>
            <div className="info-pair">
                <span><FaPhone className="icon" /> Emergency Contact Ph.:</span>
                <p>{tenant.emergencyContactPhone}</p>
            </div>
            <div className="info-pair">
                <span><FaIdCard className="icon" /> Aadhaar Number:</span>
                <p>{tenant.aadhaarNumber}</p>
            </div>
        </div>

        <button className="edit-button" onClick={() => navigate("/edit-personal-info")}>Edit Info</button>
        <BottomNavBar links={bottomNavLinks}/>
    </div>

    ); 
};

export default ViewPersonalInfo;