import './tenantManager.css';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import vendorService from '../../services/vendorService';
import { useParams } from 'react-router-dom';

const TenantModal = ({ isOpen, onRequestClose, onTenantAdded , roomId, propertyId }) => {
    // const { roomId, propertyId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const vendorAccessToken = localStorage.getItem('accessToken');

    const [formData, setFormData] = useState({
        room_id: roomId,
        property_id: propertyId,
        tenant_id: ''
    });

    // Update formData when roomId or propertyId changes
    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            room_id: roomId,
            property_id: propertyId
        }));
    }, [roomId, propertyId]);

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

        if (!formData.tenant_id) {
            setFormError('Tenant ID is required.');
            toast.error('Tenant ID is required.');
            return;
        }

        if (isNaN(formData.tenant_id) || parseInt(formData.tenant_id) <= 0) {
            setFormError('Tenant ID must be a positive number.');
            toast.error('Tenant ID must be a positive number.');
            return;
        }

        if (!vendorAccessToken) {
            setFormError('Authentication token missing. Please log in again.');
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
            setFormData(prevData => ({ ...prevData, tenant_id: '' }));
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
                    <label htmlFor="tenant_id" className='form-name-label-property'>Tenant ID:</label>
                    <input
                        type="number"
                        id="tenant_id"
                        value={formData.tenant_id}
                        onChange={handleChange}
                        className='form-address-in-property'
                        disabled={isLoading}
                        required
                        placeholder="Enter tenant ID"
                    />
                </div>
                {formError && <p className='property-form-error'>{formError}</p>}
                <div className='property-modal-btns'>
                    <button
                        type="submit"
                        className='btn1-add'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding...' : 'Add Tenant'}
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
    );
};

export default TenantModal;