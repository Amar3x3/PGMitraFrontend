import './tenantManager.css';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import vendorService from '../../services/vendorService';




const TenantModal = ({ isOpen, onRequestClose, onTenantAdded }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState('');



    const vendorId = localStorage.getItem('userId');
    const vendorAccessToken = localStorage.getItem('accessToken');

    const [formData, setFormData] = useState({
        room_id: '',
        property_id: '',
        tenant_id: ''
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


        if (!formData.room_id || !formData.property_id || !formData.tenant_id) {
            setFormError('All fields are required.');
            toast.error('All fields are required.');
            return;
        }

        if (isNaN(formData.room_id) || parseInt(formData.room_id) <= 0 ||
            isNaN(formData.property_id) || parseInt(formData.property_id) <= 0 ||
            isNaN(formData.tenant_id) || parseInt(formData.tenant_id) <= 0) {
            setFormError('All IDs must be positive numbers.');
            toast.error('All IDs must be positive numbers.');
            return;
        }

        if (!vendorAccessToken) {
            setFormError('Owner ID or authentication token missing. Cannot add property.');
            toast.error('Authentication error. Please log in again.');
            return;
        }

        setIsLoading(true);

        const payload = {
            room_id: parseInt(formData.room_id, 10),
            property_id: parseInt(formData.property_id, 10),
            tenant_id: parseInt(formData.tenant_id, 10)
        };

        try {

            const newTenant = await vendorService.createTenant(payload, vendorAccessToken);
            onTenantAdded(newTenant);

            setFormData({ room_id: '', property_id: '', tenant_id: '' });
            onRequestClose();
            toast.success("Tenant added successfully!");

        } catch (error) {

            setFormError(error.message || 'Failed to add tenant. Please try again.');
            toast.error(error.message || 'Failed to add tenant.');

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Tenant"
        >
            <h2>Add Tenant</h2>
            <form onSubmit={handleSubmit} className='form-add-property'>
                <div>
                    <label htmlFor="room_id" className='form-name-label-property' >Room ID: </label>
                    <input
                        type="number"
                        id="room_id"
                        value={formData.room_id}
                        onChange={handleChange}
                        className='form-name-in-property'
                        disabled={isLoading}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="property_id" className='form-name-label-property,'>Property ID:</label>
                    <input
                        type="number"
                        id="property_id"
                        value={formData.property_id}
                        onChange={handleChange}
                        className='form-address-in-property'
                        disabled={isLoading}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="tenant_id" className='form-name-label-property,'>Tenant ID:</label>
                    <input
                        type="number"
                        id="tenant_id"
                        value={formData.tenant_id}
                        onChange={handleChange}
                        className='form-address-in-property'
                        disabled={isLoading}
                        required
                    />
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

export default TenantModal;