import './paymentsList.css'
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { BsBuildingFillAdd } from "react-icons/bs";
import useAuth from '../../hooks/useAuth';
import vendorService from '../../services/vendorService';
import { IoPersonCircle } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";

const PaymentList = () => {

    const { user } = useAuth();
    // const { setPropertyId } = useProperty();

    const vendorId = localStorage.getItem('userId');
    const VendorAccessToken = localStorage.getItem('accessToken');

    const [payments, setPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const navigate = new useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

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
            toast.error(err.message || 'Failed to fetch payments.');
            setPayments([]);
        }

        finally {
            setIsLoading(false);
        }
    }, [user])


    useEffect(() => {

        fetchPayments();
    }, [fetchPayments]);


    return (
        <div className='property-container'>
            <div className="profile-header-pro">
                <IoIosArrowBack className="back-arrow" onClick={handleBack} />
                <h2>Your Payments</h2>
            </div>
            <div className='section-property'>
                <section >
                    <h2 style={{ color: '#055072' }}>Your Payments</h2>
                    {isLoading ? (
                        <p>Loading payments...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>Error: {error}</p>
                    ) : payments.length === 0 ? (
                        <div><p>No Payments found.</p>

                        </div>
                    ) : (
                        <div className="container">
                            {payments.map((payment) => (
                                <div key={payment.id} className="tenant-item">
                                    <div className='tenant-left-details'>
                                        <div className="tenant-avatar">
                                            <IoPersonCircle size={60} color="#fff" />
                                        </div>
                                        <div className="tenant-details">
                                            <div className="tenant-name">{payment.tenantName}</div>
                                            <div className="tenant-room">{payment.dueDate}</div>
                                        </div>
                                    </div>
                                    <div className='tenant-right-details'>
                                        <div className="tenant-amount">${payment.amount}</div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </div>

        </div>
    );
};

export default PaymentList;