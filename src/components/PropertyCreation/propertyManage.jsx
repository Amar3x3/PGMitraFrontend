import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import PropertyModal from './propertyModel';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { BsBuildingFillAdd } from "react-icons/bs";
import useAuth from '../../hooks/useAuth';

const PropertyManage = () => {

    const { user } = useAuth();

    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const navigate = new useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    const handlePropertyAdded = () => {
        alert("Integration chahiyeee")
    }
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
                // onAddressAdded={handleAddressAdded}
                onPropertyAdded={handlePropertyAdded}
                vendorId={user?.id}
                vendorToken={user?.token}
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