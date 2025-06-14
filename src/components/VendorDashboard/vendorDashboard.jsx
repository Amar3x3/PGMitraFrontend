import './vendorDashboard.css';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";
import { FaBed, FaHome, FaDoorOpen,  FaBuilding } from "react-icons/fa";
import { FaBed, FaHome, FaDoorOpen, FaBuilding, FaBullhorn, FaComments, FaUtensils } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { MdPeople } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import BottomNavBar from '../BottomNavbar/bottomNav';
import QuickActionButton from '../QuickActionButton/quickActionButton';
import { CgLogOut } from "react-icons/cg";
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import vendorDashboardImage from '../../assets/vendorDa.png'
import vendorService from '../../services/vendorService';

const VendorDashboard = () => {

    const { user, logout } = useAuth();


    // const vendorId = user?.id;
    const vendorId = localStorage.getItem('userId');
    const VendorAccessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const navItems = [
        { icon: <FaHome />, label: 'Home', path: '/vendor-dashboard' },
        { icon: <GiTakeMyMoney />, label: 'Payments', path: '/vendor-payments' },
        { icon: <MdPeople />, label: 'Members', path: '/vendor-members' },
        { icon: <FaBed />, label: 'Rooms', path: '/vendor-rooms' },
    ];

    const [payments, setPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const fetchPayments = useCallback(async () => {
        if (!vendorId || !VendorAccessToken) {
            setError('User not authenticated or ID/token missing. Please log in to view properties.');
            setIsLoading(false);

            return;
        }

        setIsLoading(true);
        setError(null);

        try {

            const data = await vendorService.getPaymentList(vendorId, VendorAccessToken);
            setPayments(data);

        }

        catch (err) {
            console.error("Failed to fetch payments:", err);
            setError(err.message || 'Failed to fetch payments.');
            toast.error(err.message || 'Failed to fetch payments');
            setPayments([]);
        }

        finally {
            setIsLoading(false);
        }
    }, [user])


    useEffect(() => {

        fetchPayments();
    }, [fetchPayments]);

    const PaymentItem = ({ name, dueDate, amount }) => (
        <div className="payment-item">
            <IoPersonCircle className="payment-avatar" />

            <div className="payment-details">
                <p className="payment-name">{name}</p>
                <p className="payment-room">{dueDate}</p>
            </div>
            <span className="payment-amount">₹{amount}</span>
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
        navigate(`/vendor/property/${vendorId}`);
    };

    const handleManageMembers = () => {
        navigate('/create-tenant');
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
                <img className='splash-img' src={vendorDashboardImage} alt="Dashboard" />
            </section>

            
            <section className="recent-payments-section">
                {payments.length > 0 ? <h2 className="section-title">Recent Payments</h2> : ''}
                <div className="payment-list">
                    {payments.map((payment) => (
                        <PaymentItem
                            key={payment.id}
                            name={payment.tenantName}
                            dueDate={payment.dueDate}
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
                    <QuickActionButton icon={<FaComments />} label="Complaints" onClick={handleComplaints} />
                    <QuickActionButton icon={<FaBullhorn />} label="Announcements" onClick={handleAnnouncements} />
                    <QuickActionButton icon={<FaUtensils />} label="Add Menu" onClick={handleMenu} />

                </div>
            </section>

            <BottomNavBar links={navItems} />
        </div>
    );
}

export default VendorDashboard;