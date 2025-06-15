import React, { useState, useEffect } from 'react';
import api from '../../services/authApi';
import './RoomTenants.css';
import { BsBellFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import vendorService from '../../services/vendorService';

const RoomTenants = ({ roomId }) => {
  const [tenants, setTenants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingReminder, setSendingReminder] = useState(null);

  const vendorAccessToken = localStorage.getItem('accessToken');


  const handleSendReminder = async (tenantId, tenantName) => {

    if (!vendorAccessToken) {
      toast.error('Authentication token missing. Please log in again.');
      return;
    }

    if (sendingReminder === tenantId) {
      toast.info("Reminder already being sent...", { autoClose: 1500 });
      return;
    }

    setSendingReminder(tenantId);
    toast.info(`Sending reminder to ${tenantName}...`, { autoClose: true, toastId: `reminder-${tenantId}` });
    try {
     
      const response = await vendorService.sendPaymentReminder(tenantId, vendorAccessToken);
      toast.update(`reminder-${tenantId}`, {
        render: response.message || `Payment reminder sent to ${tenantName} successfully!`,
        type: 'success',
        autoClose: 3000,
    });
      
  
    } catch (error) {
      
      const errorMessage = error.response?.data?.message || `Failed to send reminder to ${tenantName}.`;
      toast.update(`reminder-${tenantId}`, {
        render: errorMessage,
        type: 'error',
        autoClose: 5000,
    });
    
    } finally {
      setSendingReminder(null);
    }
  }

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await api.get(`/vendor/tenants/${roomId}`);
        setTenants(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch tenants');
        setLoading(false);
      }
    };

    fetchTenants();
  }, [roomId]);

  if (loading) {
    return <div className="loading">Loading tenants...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="room-tenants">
      <h3>Tenants in Room</h3>
      {tenants.length === 0 ? (
        <p>No tenants in this room</p>
      ) : (
        <div className="tenants-list">
          {tenants.map((tenant) => (

            <div key={tenant.id} className="tenant-card">

              <div className="tenant-info">
                <div className='tenant-bell' onClick={() => handleSendReminder(tenant.id, tenant.name)}>
                  <BsBellFill />
                </div>
                <div className='tenant-details' >
                  <h4>{tenant.name}</h4>
                  <p>Phone: {tenant.phone}</p>
                  <p>Room: {tenant.room_no}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomTenants; 