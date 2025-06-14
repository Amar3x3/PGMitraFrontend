import './vendorDashboard.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";
import { FaBed, FaHome, FaDoorOpen,  FaBuilding, FaBullhorn, FaComments, FaUtensils } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { MdPeople } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import BottomNavBar from '../BottomNavbar/bottomNav';
import QuickActionButton from '../QuickActionButton/quickActionButton';
import { CgLogOut } from "react-icons/cg";
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { FaComment } from 'react-icons/fa6';


const VendorDashboard = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        { icon: <FaHome />, label: 'Home', path: '/vendor-dashboard' },
        { icon: <GiTakeMyMoney />, label: 'Payments', path: '/vendor-payments' },
        { icon: <MdPeople />, label: 'Members', path: '/vendor-members' },
        { icon: <FaBed />, label: 'Rooms', path: '/vendor-rooms' },
    ];


    const recentPayments = [
        { id: 1, name: 'Ethan Carter', room: 'Room 101', amount: '$500' },
        { id: 2, name: 'Sophia Clark', room: 'Room 202', amount: '$500' },
        { id: 3, name: 'Liam Harper', room: 'Room 301', amount: '$500' },
    ];

    const StatCard = ({ label, value }) => (
        <div className="stat-card">
            <p className="stat-label">{label}</p>
            <h3 className="stat-value">{value}</h3>
        </div>
    );

    const PaymentItem = ({ name, room, amount }) => (
        <div className="payment-item">
            <IoPersonCircle className="payment-avatar" />

            <div className="payment-details">
                <p className="payment-name">{name}</p>
                <p className="payment-room">{room}</p>
            </div>
            <span className="payment-amount">{amount}</span>
        </div>
    );


    const handleLogout = () => {
        logout()
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const handlePayClick = () => {
        navigate('/vendor-payments');
    };

    const handlePropertyRooms = () => {
        navigate('/create-property')
    }
    const handleManageRooms = () => {
        navigate('/create-rooms');
    };

    const handleManageMembers = () => {
        navigate('/add-members');
    };

    const handleAnnouncements = () => {
        navigate('/owners-announcement');
    };

    const handleComplaints = () => {
        navigate('/owners-complaints');
    };

    const handleMenu = () => {
        navigate('/owners-menu');
    };


    return (
        <div className="dashboard-container">

            <header className="dashboard-header">
                <p></p>
                <h2 className="dashboard-title">My PG</h2>
                <CgLogOut className="logout-icon" onClick={handleLogout} />
            </header>

            <section className="stats-section">
                <StatCard label="Occupancy" value="80%" />
                <StatCard label="Vacant" value="20%" />
            </section>


            <section className="recent-payments-section">
                <h2 className="section-title">Recent Payments</h2>
                <div className="payment-list">
                    {recentPayments.map((payment) => (
                        <PaymentItem
                            key={payment.id}
                            name={payment.name}
                            room={payment.room}
                            amount={payment.amount}
                        />
                    ))}
                </div>
            </section>

            <section className="quick-actions-section">
                <h2 className="section-title">Quick Actions</h2>
                <div className="quick-actions-grid">
                    <QuickActionButton icon={<FaBuilding />} label="Manage Properties" onClick={handlePropertyRooms} />
                    <QuickActionButton icon={<FaBed />} label="Manage Rooms" onClick={handleManageRooms} />
                    <QuickActionButton icon={<MdPeople />} label="Manage Members" onClick={handleManageMembers} />
                    <QuickActionButton icon={<GiTakeMyMoney />} label="Payments" onClick={handlePayClick} />
                    <QuickActionButton icon={<FaComments/>} label="Complaints" onClick={handleComplaints} />
                    <QuickActionButton icon={<FaBullhorn/>} label="Announcements" onClick={handleAnnouncements} />
                    <QuickActionButton icon={<FaUtensils/>} label="Add Menu" onClick={handleMenu} />
                    
                </div>
            </section>

            <BottomNavBar links={navItems} />
        </div>
    );
}

export default VendorDashboard;