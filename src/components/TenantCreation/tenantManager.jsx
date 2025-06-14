import './tenantManager.css';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import vendorService from '../../services/vendorService';
import { IoIosArrowBack } from 'react-icons/io';
import { MdPersonAddAlt1 } from "react-icons/md";
import TenantModal from './tenantModel';



const TenantManager = () => {

    const { user } = useAuth();

    const vendorId = localStorage.getItem('userId');
    const VendorAccessToken = localStorage.getItem('accessToken');

    const [tenants, setTenants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = new useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    const fetchTenants = useCallback(async () => {
        if (!vendorId || !VendorAccessToken) {
            setError('User not authenticated or ID/token missing. Please log in to view properties.');
            setIsLoading(false);

            return;
        }

        setIsLoading(true);
        setError(null);

        try {

            const data = await vendorService.getTenants(vendorId, VendorAccessToken);
            setTenants(data);

        }

        catch (err) {
            console.error("Failed to fetch tenants:", err);
            setError(err.message || 'Failed to fetch tenants.');
            toast.error(err.message || 'Failed to fetch tenants.');
            setTenants([]);
        }

        finally {
            setIsLoading(false);
        }
    }, [user])

    useEffect(() => {

        fetchTenants();
    }, [fetchTenants]);

    const handleTenantAdded = useCallback(() => {
        toast.success("Tenant added successfully", { autoClose: 2000 });
        handleCloseModal();
        fetchTenants();
    }, [fetchTenants]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };



    return (
        <div className='property-container'>
            <div className="profile-header-pro">
                <IoIosArrowBack className="back-arrow" onClick={handleBack} />
                <h2>Your Tenants</h2>
            </div>

            <TenantModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                onPropertyAdded={handleTenantAdded}
            />
            <div className='section-property'>
                <section >
                    <h2 style={{ color: '#055072' }}>Your Tenants</h2>
                    {isLoading ? (
                        <p>Loading tenants...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>Error: {error}</p>
                    ) : tenants.length === 0 ? (
                        <p>No tenants found. Add one!</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {tenants.map((tenant) => (
                                <li
                                    key={tenant.id}
                                    className='pg-address-box'
                                >
                                    <strong>{tenant.room_id}</strong>
                                    <p style={{ margin: '5px 0 0 0', color: '#555' }}>{tenant.property_id}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
                <button className="single-action-button" onClick={handleOpenModal}>
                    <div className='single-action-button-sub'>
                        <span className="button-icon"><MdPersonAddAlt1 /></span>
                        <span className="button-label">Add a Tenant</span>
                    </div>

                </button>
            </div>
        </div>
    )
}

export default TenantManager;