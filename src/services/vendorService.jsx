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
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to load Properties.');
        } else {
            throw new Error(error.message || 'Failed to load Properties');
        }
    }
};

const getPropertiesByVendorId = async (vendorId, token) => {
    try {
        const response = await api.get(`/vendor/property/${vendorId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data; 
    } catch (error) {
      
        if (error.response) {
            
            console.error('API Error fetching properties:', error.response.data);
            throw new Error(error.response.data.message || `Server responded with status ${error.response.status}`);
        } else if (error.request) {
           
            console.error('Network Error fetching properties:', error.request);
            throw new Error('Network error. Please check your internet connection.');
        } else {
           
            console.error('Client-side Error fetching properties:', error.message);
            throw new Error(error.message || 'An unexpected error occurred.');
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
            
            throw new Error(error.response.data.message || 'Failed to create a room.');
        } else {
            
            throw new Error(error.message || 'Failed to create a room.');
        }
    }
};

const getRoom = async (propertyId, roomData, token) => { 
    try {
        const response = await api.get(`/vendor/room/${propertyId}`, roomData, {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            
            throw new Error(error.response.data.message || 'Failed to load rooms.');
        } else {
            
            throw new Error(error.message || 'Failed to load rooms.');
        }
    }
};

const getRoomDetailsByRoomId = async (roomId, roomData, token) => { 
    try {
        const response = await api.get(`/vendor/roomdetails/${roomId}`, roomData, {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            
            throw new Error(error.response.data.message || 'Failed to load rooms.');
        } else {
            
            throw new Error(error.message || 'Failed to load rooms.');
        }
    }
};

const updateRoom = async (roomId, roomData, token) => {
    try {
       
        const response = await api.put(`/vendor/room/${roomId}`, roomData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'application/json' // Ensure content type is set
            }
        });
        return response.data; 
    } catch (error) {
        if (error.response) {
            console.error('API Error updating room:', error.response.data);
            throw new Error(error.response.data.message || `Server responded with status ${error.response.status}`);
        } else if (error.request) {
            console.error('Network Error updating room:', error.request);
            throw new Error('Network error. Please check your internet connection.');
        } else {
            console.error('Client-side Error updating room:', error.message);
            throw new Error(error.message || 'An unexpected error occurred.');
        }
    }
};


const getTenants= async (vendorId, tenantData, token) => { 
    try {
        const response = await api.get(`/vendor/allTenants/${vendorId}`, tenantData, {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            
            throw new Error(error.response.data.message || 'Failed to load rooms.');
        } else {
            
            throw new Error(error.message || 'Failed to load rooms.');
        }
    }
};


const createTenant = async (tenantData, token) => { 
    try {
        const response = await api.post('/vendor/addNewTenant', tenantData, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        return response.data;   
    } catch (error) {
        if (error.response) {
            
            throw new Error(error.response.data.message || 'Failed to load rooms.');
        } else {
            
            throw new Error(error.message || 'Failed to load rooms.');
        }
    }
};

const getPaymentList = async (vendorId, token) => {
    try {
        const response = await api.get(`/vendor/payments/${vendorId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        return response.data; 
    } catch (error) {
        if (error.response) {
           
            console.error("Payment list fetching failed with response error:", error.response.data);
            throw new Error(error.response.data.message || 'Failed to load payment list. Server error.');
        } else if (error.request) {
            console.error("Payment list fetching failed: No response received from server.");
            throw new Error('Failed to load payment list. No response from server.');
        } else {
            console.error("Payment list fetching failed with request setup error:", error.message);
            throw new Error(error.message || 'Failed to load payment list. An unexpected error occurred.');
        }
    }
};


export default {
    createProperty,
    getProperty,
    getPropertiesByVendorId,
    createRoom,
    getRoom,
    getRoomDetailsByRoomId,
    updateRoom,
    getTenants,
    createTenant,
    getPaymentList
};
