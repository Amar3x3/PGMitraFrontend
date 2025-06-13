import './propertyModel.css';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

const PropertyModal = ({ isOpen, onRequestClose, onPropertyAdded }) => {
 
  const [propertyName, setPropertyName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = () => {
    toast.info("Integration needed");
  }
  
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
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
            className='form-name-in-property'
            disabled={isLoading}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="address" className='form-address-label-property,'>Property Address:</label>
          <textarea
            id="address"
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
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