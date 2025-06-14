import './propertyModel.css';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import vendorService from '../../services/vendorService';



const PropertyModal = ({ isOpen, onRequestClose, onPropertyAdded }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const vendorId = localStorage.getItem('userId');
  const vendorAccessToken = localStorage.getItem('accessToken');

  const [formData, setFormData] = useState({
    name: '',
    address: ''
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


    if (!formData.name.trim() || !formData.address.trim()) {
      setFormError('Property Name and Address are required.');
      toast.error('Both Property Name and Address are required.');
      return;
    }

    if (!vendorId || !vendorAccessToken) {
      setFormError('Owner ID or authentication token missing. Cannot add property.');
      toast.error('Authentication error. Please log in again.');
      return;
    }

    setIsLoading(true);

    try {

      const newProperty = await vendorService.createProperty(vendorId, formData, vendorAccessToken);
      onPropertyAdded(newProperty);

      setFormData({ name: '', address: '' });
      onRequestClose();

    } catch (error) {
      
      setFormError(error.message || 'Failed to add property. Please try again.');
      toast.error(error.message || 'Failed to add property.');
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Property"
    >
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit} className='form-add-property'>
        <div>
          <label htmlFor="name" className='form-name-label-property' >Property Name: </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className='form-name-in-property'
            disabled={isLoading}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="address" className='form-address-label-property,'>Property Address:</label>
          <textarea
            id="address"
            value={formData.address}
            onChange={handleChange}
            rows="4"
            className='form-address-in-property'
            disabled={isLoading}
          ></textarea>
        </div>
        {formError && <p className='property-form-error'>{formError}</p>}
        <div className='property-modal-btns'>
          <button
            type="submit"
            className='btn1-add'
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Property'}
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className='btn1-add btn2-can'
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
};

export default PropertyModal;