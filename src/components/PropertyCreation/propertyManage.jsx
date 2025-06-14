import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import PropertyModal from './propertyModel';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { BsBuildingFillAdd } from "react-icons/bs";
import useAuth from '../../hooks/useAuth';
import vendorService from '../../services/vendorService';
import { useProperty } from '../contexts/PropertyContext';

const PropertyManage = () => {

    const { user } = useAuth();
    const { setPropertyId } = useProperty();

    const vendorId = localStorage.getItem('userId');
    const VendorAccessToken = localStorage.getItem('accessToken');

    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = new useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    const fetchProperties = useCallback(async () => {
        if (!vendorId || !VendorAccessToken) {
            setError('User not authenticated or ID/token missing. Please log in to view properties.');
            setIsLoading(false);

            return;
        }

        setIsLoading(true);
        setError(null);

        try {

            const data = await vendorService.getProperty(vendorId, VendorAccessToken);
            setProperties(data);

        } catch (err) {
            console.error("Failed to fetch properties:", err);
            setError(err.message || 'Failed to fetch properties.');
            toast.error(err.message || 'Failed to fetch properties.');
            setProperties([]);
        } finally {
            setIsLoading(false);
        }
    }, [user])


    useEffect(() => {

        fetchProperties();
    }, [fetchProperties]); // Dependencies for useEffect: fetchProperties and authLoading

  

   

    const handlePropertyAdded = useCallback(() => {
        toast.success("Property added successfully", { autoClose: 2000 });
        handleCloseModal(); // Close the modal
        fetchProperties(); // Re-fetch the properties to show the newly added one
    }, [fetchProperties]);


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
                <h2>Your Properties</h2>
            </div>

            <PropertyModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                onPropertyAdded={handlePropertyAdded}
            />
            <div className='section-property'>
                <section >
                    <h2 style={{ color: '#055072' }}>Your Properties</h2>
                    {isLoading ? (
                        <p>Loading properties...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>Error: {error}</p>
                    ) : properties.length === 0 ? (
                        <p>No properties found. Add one!</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {properties.map((addr) => (
                                <li
                                    key={addr.id}
                                    className='pg-address-box'
                                
                                    // onClick={() => handleManageRoomsClick(prop.id)} // <-- Trigger navigation here
                                    // style={{ cursor: 'pointer', marginBottom: '10px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', transition: 'background-color 0.2s ease' }}
                                    // onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                                    // onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                    >
                                    <strong>{addr.name}</strong>
                                    <p style={{ margin: '5px 0 0 0', color: '#555' }}>{addr.address}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
                <button className="single-action-button" onClick={handleOpenModal}>

                    <div className='single-action-button-sub'>
                        <span className="button-icon"><BsBuildingFillAdd /></span>
                        <span className="button-label">Add Property</span>
                    </div>

                </button>
            </div>

        </div>
    );
};

export default PropertyManage;