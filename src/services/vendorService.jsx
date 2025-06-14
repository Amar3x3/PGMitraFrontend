import api from './authApi';

const createProperty = async (vendorId, propertyData, token) => { 
    try {
        const response = await api.post(`/vendor/property/${vendorId}`, propertyData, { 
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to create property.');
        } else {
            throw new Error(error.message || 'Failed to create property.');
        }
    }
};

const getProperty = async (vendorId, propertyData, token) => { 
    try {
        const response = await api.get(`/vendor/property/${vendorId}`, propertyData, { 
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to create property.');
        } else {
            throw new Error(error.message || 'Failed to create property.');
        }
    }
};

const createRoom = async (propertyId, roomData, token) => { 
    try {
        const response = await api.post(`/vendor/room/${propertyId}`, roomData, {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            
            throw new Error(error.response.data.message || 'Failed to create room.');
        } else {
            
            throw new Error(error.message || 'Failed to create room.');
        }
    }
};

export default {
    createProperty,
    getProperty,
    createRoom
};
