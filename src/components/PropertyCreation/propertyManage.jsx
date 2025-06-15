import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import PropertyModal from './propertyModel';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { BsBuildingFillAdd } from "react-icons/bs";
import useAuth from '../../hooks/useAuth';
import vendorService from '../../services/vendorService';
import { useProperty } from '../contexts/PropertyContext';
import { FaTrash } from "react-icons/fa6";

const PropertyManage = () => {

    const { user } = useAuth();
    const { setPropertyId } = useProperty();

    const vendorId = localStorage.getItem('userId');
    const VendorAccessToken = localStorage.getItem('accessToken');

    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deletingProperty, setDeletingProperty] = useState(null);

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

        }

        catch (err) {
            console.error("Failed to fetch properties:", err);
            setError(err.message || 'Failed to fetch properties.');
            toast.error(err.message || 'Failed to fetch properties.');
            setProperties([]);
        }

        finally {
            setIsLoading(false);
        }
    }, [user])

    useEffect(() => {

        fetchProperties();
    }, [fetchProperties]);

    const handlePropertyAdded = useCallback(() => {
        toast.success("Property added successfully", { autoClose: 2000 });
        handleCloseModal();
        fetchProperties();
    }, [fetchProperties]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteProperty = async (propertyId, propertyName) => {

        console.log(propertyId);

        if (!VendorAccessToken) {
            toast.error('Authentication token missing. Please log in again.');
            return;
        }


        if (deletingProperty === propertyId) {
            toast.info("Deletion already in progress...", { autoClose: 1500 });
            return;
        }

        setDeletingProperty(propertyId); 
        toast.info(`Deleting property "${propertyName}"...`, { autoClose: false, toastId: `delete-${propertyId}` });

        try {
            
            const response =  await vendorService.deleteProperty(propertyId, VendorAccessToken);

            toast.update(`delete-${propertyId}`, {
                render: response.message || `Property "${propertyName}" deleted successfully!`,
                type: 'success',
                autoClose: 3000,
            });

           
            setProperties(prevProperties => prevProperties.filter(p => p.propId !== propertyId));
            

        } catch (error) {
            console.error(`Failed to delete property ${propertyId}:`, error);
            const errorMessage = error.response?.data?.message || `Failed to delete property "${propertyName}".`;
            toast.update(`delete-${propertyId}`, {
                render: errorMessage,
                type: 'error',
                autoClose: 5000,
            });
        } finally {
            setDeletingProperty(null); 
        }
    }

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
                            {properties.map((property) => (
                                <li key={property.propId} className='pg-address-box' >
                                    <div className='property-details'>
                                        <strong>{property.name}</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{property.address}</p>
                                    </div>

                                    <div className='del-btn-property' onClick={() => handleDeleteProperty(property.propId, property.name)}><FaTrash /></div>

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