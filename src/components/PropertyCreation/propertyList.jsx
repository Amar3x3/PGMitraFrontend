import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import PropertyModal from './propertyModel';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { BsBuildingFillAdd } from "react-icons/bs";
import useAuth from '../../hooks/useAuth';
import vendorService from '../../services/vendorService';
import { useProperty } from '../contexts/PropertyContext';
import { MdArrowOutward } from "react-icons/md";

const PropertyList = () => {

    const { user } = useAuth();
    const { setPropertyId } = useProperty();

    const vendorId = localStorage.getItem('userId');
    const VendorAccessToken = localStorage.getItem('accessToken');

    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


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



    const handleNavigateToCreateproperty = () => {
        navigate('/create-property')
    };



    const handleManageRoomsClick = (propertyId) => {
        setPropertyId(propertyId);
        navigate(`/vendor/room/${propertyId}`);
    };


    return (
        <div className='property-container'>
            <div className="profile-header-pro">
                <IoIosArrowBack className="back-arrow" onClick={handleBack} />
                <h2>Your Rooms</h2>
            </div>
            <div className='section-property'>
                <section >
                    <h2 style={{ color: '#055072' }}>Select a Property</h2>
                    {isLoading ? (
                        <p>Loading properties...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>Error: {error}</p>
                    ) : properties.length === 0 ? (
                        <div><p>No properties found. Go to Manage Properties section to add your property</p>

                            <button className="single-action-button" onClick={handleNavigateToCreateproperty}>

                                <div className='single-action-button-sub'>
                                    <span className="button-icon"><MdArrowOutward /></span>
                                    <span className="button-label">Go to manage Property</span>
                                </div>

                            </button></div>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {properties.map((property) => (
                                // console.log("Property ID:", property.id);
                                <li
                                    key={property.propId}

                                    className='pg-address-box'

                                    onClick={() => handleManageRoomsClick(property.propId)}
                                    style={{ cursor: 'pointer', marginBottom: '10px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', transition: 'background-color 0.2s ease' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                    {/* <strong>{property.propId}</strong> */}
                                    <strong>{property.name}</strong>
                                    <p className='pg-address-box-p' style={{margin: '5px 0 0 0'}}>{property.address}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

            </div>

        </div>
    );
};

export default PropertyList;