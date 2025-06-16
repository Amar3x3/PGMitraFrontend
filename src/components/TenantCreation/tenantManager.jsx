import './tenantManager.css';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import vendorService from '../../services/vendorService';
import { IoIosArrowBack } from 'react-icons/io';
import { MdPersonAddAlt1 } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import TenantModal from './tenantModel';

const TenantManager = () => {
    const { user } = useAuth();
    const vendorId = localStorage.getItem('userId');
    const VendorAccessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const [tenants, setTenants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchType, setSearchType] = useState('all'); // 'all', 'state', 'company'
    const [searchQuery, setSearchQuery] = useState('');

    const fetchTenants = useCallback(async () => {
        if (!vendorId || !VendorAccessToken) {
            setError('User not authenticated or ID/token missing. Please log in to view properties.');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            let response;
            if (searchType === 'state' && searchQuery) {
                response = await vendorService.searchTenantsByState(vendorId, searchQuery, VendorAccessToken);
            } else if (searchType === 'company' && searchQuery) {
                response = await vendorService.searchTenantsByCompany(vendorId, searchQuery, VendorAccessToken);
            } else {
                response = await vendorService.getTenants(vendorId, VendorAccessToken);
            }
            setTenants(response);
            console.log(response);
        } catch (err) {
            console.error("Failed to fetch tenants:", err);
            setError(err.message || 'Failed to fetch tenants.');
            toast.error(err.message || 'Failed to fetch tenants.');
            setTenants([]);
        } finally {
            setIsLoading(false);
        }
    }, [vendorId, VendorAccessToken, searchType, searchQuery]);

    useEffect(() => {
        fetchTenants();
    }, [fetchTenants]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchTenants();
    };

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
        setSearchQuery('');
        if (type === 'all') {
            fetchTenants();
        }
    };


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

    const handleBack = () => {
        navigate(-1);
    };

    const handleNaviagteToRoomDetails = (roomId, propertyId) => {
        navigate(`/vendor/roomdetails/${roomId}/${propertyId}`);
    };

    return (
        <div className='property-container'>
            <div className="profile-header-pro">
                <IoIosArrowBack className="back-arrow" onClick={handleBack} />
                <h2>Your Tenants</h2>
            </div>

            <div className="search-section">
                <div className="search-type-buttons">
                    <button 
                        className={`search-type-btn ${searchType === 'all' ? 'active' : ''}`}
                        onClick={() => handleSearchTypeChange('all')}
                    >
                        All Tenants
                    </button>
                    <button 
                        className={`search-type-btn ${searchType === 'state' ? 'active' : ''}`}
                        onClick={() => handleSearchTypeChange('state')}
                    >
                        Search by State
                    </button>
                    <button 
                        className={`search-type-btn ${searchType === 'company' ? 'active' : ''}`}
                        onClick={() => handleSearchTypeChange('company')}
                    >
                        Search by Company
                    </button>
                </div>

                {(searchType === 'state' || searchType === 'company') && (
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={searchType === 'state' ? 'Enter state name...' : 'Enter company name...'}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            <FaSearch />
                        </button>
                    </form>
                )}
            </div>

            <TenantModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                onTenantAdded={handleTenantAdded}
            />

            <div className='section-property'>
                <section>
                    <h2 style={{ color: '#055072' }}>Your Tenants</h2>
                    {isLoading ? (
                        <p>Loading tenants...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>Error: {error}</p>
                    ) : tenants.length === 0 ? (
                        <p>No tenants found. Add one!</p>
                    ) : (
                        <div>
                            {tenants.map((tenant) => (
                                <div
                                    key={tenant.id}
                                    className='pg-address-box'
                                    onClick={() => handleNaviagteToRoomDetails(tenant.room_id, tenant.property_id)}
                                    
                                >
                                    <strong>{tenant.name}</strong>
                                    <p>Phone: {tenant.phone}</p>
                                </div>
                                
                            ))}
                        </div>
                    )}
                </section>
               
            </div>
        </div>
    );
};

export default TenantManager;