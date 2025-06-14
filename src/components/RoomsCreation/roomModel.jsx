import './roomModel.css';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
// import useAuth from '../../hooks/useAuth';
import { useParams , useNavigate } from 'react-router-dom';
import vendorService from '../../services/vendorService';


const RoomModal = ({ isOpen, onRequestClose, onRoomAdded }) => {

  // const { user } = useAuth();

  const { propertyId } = useParams();
  const navigate = useNavigate();
  

  // const vendorId = localStorage.getItem('userId');
  const vendorAccessToken = localStorage.getItem('accessToken');

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    room_no: '',
    capacity: '',
    rent:'',
    occupied:''
  });


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };


  const handleSubmit = async (e) => {

    e.preventDefault();
    setFormError('');

    if (!formData.room_no.trim() || !formData.capacity || !formData.rent) {
      setFormError('Room Number, Capacity, and Rent are required.');
      toast.error('Please fill in all required fields.');
      return;
    }
    if (isNaN(formData.capacity) || parseInt(formData.capacity) <= 0) {
      setFormError('Capacity must be a positive number.');
      toast.error('Capacity must be a positive number.');
      return;
    }
    if (isNaN(formData.rent) || parseFloat(formData.rent) <= 0) {
      setFormError('Rent must be a positive number.');
      toast.error('Rent must be a positive number.');
      return;
    }

    

    if (!propertyId) {
      setFormError('Error: Property ID not found in URL. Cannot add room.');
      toast.error('Missing Property ID. Please navigate from a property page.');
      return;
  }



    
    if (!vendorAccessToken) {
      setFormError('Authentication token missing. Cannot add room');
      toast.error('Authentication error. Please log in again.');
      return;
    }

    setLoading(true);

    try {

      const newRoom = await vendorService.createRoom(propertyId, formData, vendorAccessToken);

      onRoomAdded(newRoom); 
      setFormData({ room_no: '', capacity: '', occupied: '', rent: ''  }); 
      onRequestClose();
  

    }
    catch (error) {
      setFormError(error.message || 'Failed to add Room. Please try again.');
      toast.error(error.message || 'Failed to add Room.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add New Room"
    >
      <h2>Add New Room</h2>
      <form onSubmit={handleSubmit} className='form-add-property'>
        <div>
          <label htmlFor="room_no" className='form-name-label-property'>Room Number:</label>
          <input
            type="text"
            id="room_no"
            value={formData.room_no}
            onChange={handleChange}
            className='form-name-in-property'
            disabled={loading}
            required
          />
        </div>
        <div>
          <label htmlFor="capacity" className='form-name-label-property'>Capacity (e.g., 2 for double sharing):</label>
          <input
            type="number"
            id="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className='form-name-in-property'
            disabled={loading}
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="rent" className='form-name-label-property'>Monthly Rent:</label>
          <input
            type="number"
            id="rent"
            value={formData.rent}
            onChange={handleChange}
            className='form-name-in-property'
            disabled={loading}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label htmlFor="occupied" className='form-name-label-property'>Number of Beds Occupied:</label>
          <input
            type="number"
            id="occupied"
            value={formData.occupied}
            onChange={handleChange}
            className='form-name-in-property'
            disabled={loading}
            required
          />
        </div>
      

        {formError && <p className='property-form-error'>{formError}</p>}

        <div className='property-modal-btns'>
          <button
            type="submit"
            className='btn1-add'
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Room'}
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            
            className='btn1-add btn2-can'
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RoomModal;