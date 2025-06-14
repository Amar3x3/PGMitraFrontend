// import React, { useState, useEffect, useCallback } from 'react';
// import { toast } from 'react-toastify';
// import PropertyModal from './propertyModel'; // Assuming this is your AddPropertyModal
// import { IoIosArrowBack } from 'react-icons/io';
// import { useNavigate } from 'react-router-dom';
// import { BsBuildingFillAdd } from "react-icons/bs";
// import useAuth from '../../hooks/useAuth';
// import vendorService from '../../services/vendorService';
// import { useProperty } from '../contexts/PropertyContext';


// const dummyProperty = {
//   id: "3", 
//   name: "Greenwood Residences",
//   address: "Dodda-nekunddi, Bengaluru",
// };

// const PropertyManage = () => {
//     const { user } = useAuth();

//     const { setPropertyId } = useProperty();

    
//     const currentOwnerId = user?.id;
//     const currentAccessToken = user?.token;

    
//     const [properties, setProperties] = useState([dummyProperty]);
//     const [isLoading, setIsLoading] = useState(false); 
//     const [error, setError] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const navigate = useNavigate(); 

//     const handleBack = () => {
//         navigate(-1);
//     }

//     const fetchProperties = useCallback(async () => {
        
//         if (!currentOwnerId || !currentAccessToken) {
//             setError('User not authenticated or ID/token missing. Please log in to view properties.');
//             setIsLoading(false);
//             return;
//         }

//         setIsLoading(true); 
//         setError(null);

//         try {
            
//         } catch (err) {
//             console.error("Failed to fetch properties:", err);
//             setError(err.message || 'Failed to fetch properties.');
//             toast.error(err.message || 'Failed to fetch properties.');
//             setProperties([]); 
//         } finally {
//             setIsLoading(false); 
//         }
//     }, [currentOwnerId, currentAccessToken]);


//     useEffect(() => {
       
//     }, [fetchProperties]);

//     const handlePropertyAdded = useCallback((newProperty) => {
//         toast.success(`Property "${newProperty.name}" added successfully! Refreshing list...`, { autoClose: 2000 });
//         handleCloseModal();
//         setProperties(prevProperties => [...prevProperties, { id: newProperty.id || Math.random().toString(36).substring(7), name: newProperty.name, address: newProperty.address }]);
        
//     }, [fetchProperties]);


//     const handleOpenModal = () => {
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

    
//     const handleManageRoomsClick = (propertyId) => {
//         setPropertyId(propertyId); 
//         navigate(`/vendor/room/${propertyId}`); 
//     };

//     return (
//         <div className='property-container'>
//             <div className="profile-header-pro">
//                 <IoIosArrowBack className="back-arrow" onClick={handleBack} />
//                 <h2>Your Properties</h2>
//             </div>

          
//             <PropertyModal
//                 isOpen={isModalOpen}
//                 onRequestClose={handleCloseModal}
//                 onPropertyAdded={handlePropertyAdded}
//                 ownerId={currentOwnerId}      
//                 ownerToken={currentAccessToken} 
//             />
//             <div className='section-property'>
//                 <section >
//                     <h2 style={{ color: '#055072' }}>Your Properties</h2>
                   
//                     {isLoading ? (
//                         <p>Loading properties...</p>
//                     ) : error ? (
//                         <p style={{ color: 'red' }}>Error: {error}</p>
//                     ) : properties.length === 0 ? (
//                         <p>No properties found. Add one!</p>
//                     ) : (
//                         <ul style={{ listStyle: 'none', padding: 0 }}>
//                             {properties.map((prop) => (
//                                 <li
//                                     key={prop.id}
//                                     className='pg-address-box'
//                                     onClick={() => handleManageRoomsClick(prop.id)} 
//                                     style={{ cursor: 'pointer', marginBottom: '10px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', transition: 'background-color 0.2s ease' }}
//                                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
//                                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
//                                 >
//                                     <strong>{prop.name}</strong>
//                                     <p style={{ margin: '5px 0 0 0', color: '#555' }}>{prop.address}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </section>
//                 <button className="single-action-button" onClick={handleOpenModal}>
//                     <div className='single-action-button-sub'>
//                         <span className="button-icon"><BsBuildingFillAdd /></span>
//                         <span className="button-label">Add Property</span>
//                     </div>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PropertyManage;