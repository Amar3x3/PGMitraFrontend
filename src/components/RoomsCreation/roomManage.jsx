import './roomModel.css'; 
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import RoomModal from './roomModel';
import { useNavigate, useParams } from 'react-router-dom';
import { FaBed } from "react-icons/fa";
import { IoIosArrowBack } from 'react-icons/io';
import useAuth from '../../hooks/useAuth';
import vendorService from '../../services/vendorService';

const RoomManager = () => {

  const { user } = useAuth();
  const { propertyId } = useParams();

  // const vendorId = localStorage.getItem('userId');
  const vendorId = user?.id;
  const VendorAccessToken = localStorage.getItem('accessToken');
  // const VendorAccessToken = localStorage.getItem('accessToken');

  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const navigate = new useNavigate();

  const handleBack = () => {
    navigate(-1);
  }


  const fetchRooms = useCallback(async () => {
    if (!VendorAccessToken || !propertyId) {
      setFetchError('User not authenticated or ID/token missing. Please log in to view rooms.');
      setLoadingRooms(false);
      return;
    }

    setLoadingRooms(true);
    setFetchError(null);

    try {
      const data = await vendorService.getRoom(propertyId, VendorAccessToken);
      setRooms(data);

      toast.success('Rooms loaded successfully!', { autoClose: 1500 });
    }

    catch (err) {
      console.error("Failed to fetch rooms:", err);
      setFetchError(err.message || 'Failed to fetch rooms.');
      toast.error(err.message || 'Failed to fetch rooms.');
      setRooms([]);
    }

    finally {
      setLoadingRooms(false);
    }
  }, [propertyId, VendorAccessToken])

  useEffect(() => {

    fetchRooms();
  }, [fetchRooms]);



  const handleRoomAdded = useCallback(() => {
    toast.success("Room added successfully", { autoClose: 2000 });
    handleCloseModal();
    fetchRooms();
  }, [fetchRooms])

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleManageRoomDetailsClick = (roomId) =>{
    navigate(`/vendor/roomdetails/${roomId}`)
  }




  if (!propertyId && !loadingRooms) {
    return (
      <div className='room-manager-container p-6'>
        <h2 className="text-2xl font-bold text-red-600">No Property Selected</h2>
        <button onClick={() => navigate('/create-property')} className="">Go to Properties</button>
      </div>
    );
  }



  return (
    <div className='property-container'>


      <div className="profile-header-pro">
        <IoIosArrowBack className="back-arrow" onClick={handleBack} />
        <h2>Your Rooms</h2>
      </div>


      <RoomModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onRoomAdded={handleRoomAdded}
      />
      <div className='section-property'>
        <section>
          <h2 style={{ color: '#055072' }}>Available Rooms</h2>
          {loadingRooms ? (
            <p>Loading rooms...</p>
          ) : fetchError ? (
            <p style={{ color: 'red' }}>Error: {fetchError}</p>
          ) : rooms.length === 0 ? (
            <p>No rooms found. Add one!</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
              {rooms.map((room) => (
                <li
                  key={room.id}
                 

                  onClick={() => 
                    handleManageRoomDetailsClick(room.id)}
                    style={{ cursor: 'pointer',
                             marginBottom: '10px', 
                             padding: '15px', 
                             border: '1px solid #ddd', 
                             borderRadius: '8px', 
                             transition: 'background-color 0.2s ease', 
                             backgroundColor: '#fff'}}
                                    
                >
                  
                  <h3 className='room-number-btntype'>Room: {room.room_no}</h3>
                </li>
              ))}
            </ul>
          )}
        </section>
        <button className="single-action-button" onClick={handleOpenModal}>

          <div className='single-action-button-sub'>
            <span className="button-icon"><FaBed /></span>
            <span className="button-label">Add Room</span>
          </div>

        </button>
      </div>

    </div>
  );
};

export default RoomManager;