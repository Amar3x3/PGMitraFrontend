import './roomdetails.css'; 
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io'; 
import { MdPersonAddAlt1 } from "react-icons/md";
import BottomNavBar from '../BottomNavbar/bottomNav';
import { useState, useCallback, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import vendorService from '../../services/vendorService';
import { toast } from 'react-toastify';
import EditRoomModal from './roomDetailsModel';
import RoomTenants from '../RoomTenants/RoomTenants';
import TenantModal from '../TenantCreation/tenantModel';


const RoomDetailItem = ({ label, value, subLabel }) => (
    <div className="room-detail-item">
        <div className="detail-left">
            <p className="detail-label">{label}</p>
            {subLabel && <p className="detail-sub-label">{subLabel}</p>}
        </div>
        <div className="detail-right">
            <p className="detail-value">{value}</p>
        </div>
    </div>
);

const RoomDetailsPage = () => {

    const { user } = useAuth();
    const VendorAccessToken = localStorage.getItem('accessToken');

    const{ roomId, propertyId} = useParams();
    const navigate = useNavigate();

    const [room, setRoom] = useState(null);
    const [loadingRooms, setLoadingRooms] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false);


    const fetchRoomsDetails = useCallback(async () => {

        if (!VendorAccessToken || !roomId) {
            setFetchError('User not authenticated or ID/token missing. Please log in to view rooms.');
            setLoadingRooms(false);
            return;
        }

        setLoadingRooms(true);
        setFetchError(null);

        try {
            const data = await vendorService.getRoomDetailsByRoomId(roomId, VendorAccessToken);
            console.log(data);
            setRoom(data);

            toast.success('Rooms loaded successfully!', { autoClose: 1500 });
        }
        catch (err) {
            console.error("Failed to fetch rooms:", err);
            setFetchError(err.message || 'Failed to fetch rooms.');
            toast.error(err.message || 'Failed to fetch rooms.');
            setRoom(null);
          }
      
          finally {
            setLoadingRooms(false);
          }

    },  [roomId, VendorAccessToken])

    useEffect(() => {

        fetchRoomsDetails();
      }, [fetchRoomsDetails]);
    


    const handleBackClick = () => {
        navigate(-1); 
    };

    const handleEditRoom = () => {
        setIsEditModalOpen(true); 
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false); 
    };

    const handleRoomUpdated = (updatedRoomData) => {
        setRoom(updatedRoomData); 
        toast.success("Room updated successfully!", { autoClose: 2000 });
        handleCloseEditModal(); 
    };

    const handleAddTenant = () => {
        setIsAddTenantModalOpen(true);
    };

    const handleCloseAddTenantModal = () => {
        setIsAddTenantModalOpen(false);
    };

    const handleTenantAdded = useCallback(() => {
        toast.success("Tenant added successfully!", { autoClose: 2000 });
        handleCloseAddTenantModal();
        // Refresh room details to update occupied count
        fetchRoomsDetails();
    }, [fetchRoomsDetails]);


    if (!room) {
        return (
            <div className="room-details-container">
                <header className="room-details-header">
                    <IoIosArrowBack className="back-icon" onClick={handleBackClick} />
                    <h2 className="header-title">Room Details</h2>
                    <div style={{ width: '24px' }}></div>
                </header>
                <section className="room-details-section">
                    <p>Loading...</p>
                </section>
            </div>
        );
    }

    return (
        <div className="room-details-container">
          
            <header className="room-details-header">
                <IoIosArrowBack className="back-icon" onClick={handleBackClick} />
                <h2 className="header-title">Rooms</h2>
                <div style={{ width: '24px' }}></div>
            </header>


            <section className="room-details-section">
                <h3 className="section-title">Room Details</h3>
                <div className="details-list">
                    <RoomDetailItem label="Room Number" value={room.room_no} />
                    <RoomDetailItem label="Capacity" value={room.capacity} />
                    <RoomDetailItem label="Rent" value={`Rs ${room.rent}`} />
                    <RoomDetailItem label="Occupied" value={room.occupied} />
                    <RoomDetailItem label="Status" style={{color: room.capacity === room.occupied ? 'red' : 'green'}}  value={room.capacity === room.occupied ? 'Not Available' : 'Available'} />
                </div>
            </section>

            <RoomTenants roomId={roomId} />

            <footer className="room-details-footer-buttons">
                <button className="edit-button" onClick={handleEditRoom}>
                    Edit Room Details
                </button>
                {room.capacity > room.occupied && (
                    <button className="add-tenant-button" onClick={handleAddTenant}>
                        <div className='button-content'>
                            <span className="button-icon"><MdPersonAddAlt1 /></span>
                        </div>
                    </button>
                )}
            </footer>

            <EditRoomModal
                isOpen={isEditModalOpen}
                onRequestClose={handleCloseEditModal}
                onRoomUpdated={handleRoomUpdated}
                roomToEdit={room} 
            />

            <TenantModal
                isOpen={isAddTenantModalOpen}
                onRequestClose={handleCloseAddTenantModal}
                onTenantAdded={handleTenantAdded}
                roomId={roomId}
                propertyId={propertyId}
            />

            {/* <BottomNavBar /> */}

        </div>
    );
};

export default RoomDetailsPage;