import './roomdetails.css';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import vendorService from '../../services/vendorService';
import useAuth from '../../hooks/useAuth';


const EditRoomModal = ({ isOpen, onRequestClose, onRoomUpdated, roomToEdit }) => {

    const { user } = useAuth();

    const vendorAccessToken = localStorage.getItem('accessToken');

    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');


    const [formData, setFormData] = useState({
        room_no: '',
        capacity: '',
        rent: '',
        occupied: ''
    });

    useEffect(() => {
        if (roomToEdit) {
            setFormData({
                room_no: roomToEdit.room_no || '',
                capacity: roomToEdit.capacity || '',
                rent: roomToEdit.rent || '',
                occupied: roomToEdit.occupied || ''
            });
        }
    }, [roomToEdit]);

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


        if (!formData.capacity || !formData.rent || formData.occupied === '') {
            setFormError('All fields are required.');
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


        if (parseInt(formData.occupied) > parseInt(formData.capacity)) {
            setFormError('Occupied beds cannot exceed capacity.');
            toast.error('Occupied beds cannot exceed capacity.');
            return;
        }
        if (isNaN(formData.occupied) || parseInt(formData.occupied) < 0) {
            setFormError('Occupied beds must be a non-negative number.');
            toast.error('Occupied beds must be a non-negative number.');
            return;
        }


        if (!roomToEdit || !roomToEdit.id) {
            setFormError('Error: Room ID to edit is missing.');
            toast.error('Cannot update room: Room ID not found.');
            return;
        }
        if (!vendorAccessToken) {
            setFormError('Authentication token missing. Cannot update room');
            toast.error('Authentication error. Please log in again.');
            return;
        }

        setLoading(true);

        try {

            const updatedRoom = await vendorService.updateRoom(roomToEdit.id, formData, vendorAccessToken);

            onRoomUpdated(updatedRoom);
            onRequestClose();

        } catch (error) {
            setFormError(error.message || 'Failed to update Room. Please try again.');
            toast.error(error.message || 'Failed to update Room.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Room Details"

        >
            <h2>Edit Room Details</h2>
            <form onSubmit={handleSubmit} className='form-add-property'>
                <div>
                    <h2 style={{ color: '#055072' }}>Room No: {formData.room_no}</h2>
                </div>
                <div>
                    <label htmlFor="capacity" className='form-name-label-property'>Capacity:</label>
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
                        max={formData.capacity || ''}
                    />
                </div>

                {formError && <p className='property-form-error'>{formError}</p>}

                <div className='property-modal-btns'>
                    <button
                        type="submit"
                        className='btn1-add'
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Save Changes'}
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

export default EditRoomModal;