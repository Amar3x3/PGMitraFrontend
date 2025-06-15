import React, { useState, useEffect } from 'react';
import api from '../../services/authApi';
import './RoomTenants.css';

const RoomTenants = ({ roomId }) => {
  const [tenants, setTenants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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
                <h4>{tenant.name}</h4>
                <p>Phone: {tenant.phone}</p>
                <p>Room: {tenant.room_no}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomTenants; 