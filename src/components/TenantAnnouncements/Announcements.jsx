import React, { useEffect, useState } from 'react';
import './Announcements.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaFileAlt, FaComments } from 'react-icons/fa';
import BottomNav from '../BottomNav';
import { MdRestaurantMenu } from 'react-icons/md';
import BottomNavBar from '../BottomNavbar/bottomNav';
import api from '../../services/authApi';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();
    const tenantId = localStorage.getItem('userId'); 
    const accessToken = localStorage.getItem('accessToken');

    const bottomNavLinks = [
        {icon:<FaHome/>, label:"Home", path:"/tenant-dashboard"},
        // {icon:<FaFileAlt/>, label:"Payments", path:"/payment-dashboard"},
        {icon:<FaComments/>, label:"Complaints", path:"/raise-request"},
        {icon:<FaHome/>, label:"Profile", path:"/view-personal-info"},
        {icon:<MdRestaurantMenu/>, label:"Menu", path:"/food-menu"},

    ]

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const tenantId = localStorage.getItem('tenantId'); 
                const response = await api.get(`/announcement/tenant/${tenantId}`);
                const data = response.data;
    
                if (Array.isArray(data)) {
                    setAnnouncements(data);
                } else {
                    console.warn("No announcements or unexpected data format.");
                    setAnnouncements([]);
                }
            } catch (err) {
                console.error('Error fetching announcements:', err);
                setAnnouncements([]);
            } finally {
                setLoading(false);
            }
        };
    
        fetchAnnouncements();
    }, []);

    const handleBack = () => {
        navigate('/tenant-dashboard');
    };

    return (
        <div className="announcements-container">
            <div className="profile-header-pro">
                <button className='back-button' onClick={handleBack}>
                    <FaArrowLeft size={16}/>    
                </button>
                {/* <IoIosArrowBack className="back-arrow" onClick={handleBack} /> */}
                <h2>📢 Announcements</h2>
            </div> 

            <h1 className="announcements-header">📢 Announcements</h1>
            {loading ? (
                <p className="announcement-message">Loading...</p>
            ) : announcements.length === 0 ? (
                <p className="announcement-message">No announcements available.</p>
            ) : (
                <div className="announcement-list">
                {announcements.map((a) => (
                    <div key={a.id} className="announcement-card">
                    <h2 className="announcement-title">{a.title}</h2>
                    <p className="announcement-text">{a.text}</p>
                    <p className="announcement-date">
                        📅 {new Date(a.createdAt).toLocaleDateString()}
                    </p>
                    </div>
                ))}
                </div>
            )}
            <BottomNavBar links={bottomNavLinks}/>
        </div>
    );
};

export default Announcements;