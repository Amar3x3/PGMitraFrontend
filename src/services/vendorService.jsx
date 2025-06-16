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


            throw new Error(error.response.data.message || `Server responded with status ${error.response.status}`);
        } else if (error.request) {


            throw new Error('Network error. Please check your internet connection.');
        } else {


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

            throw new Error(error.response.data.message || `Server responded with status ${error.response.status}`);
        } else if (error.request) {

            throw new Error('Network error. Please check your internet connection.');
        } else {

            throw new Error(error.message || 'An unexpected error occurred.');
        }
    }
};


const getTenants = async (vendorId, tenantData, token) => {
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

        return response.data;
    } catch (error) {
        if (error.response) {


            throw new Error(error.response.data.message || 'Failed to load payment list. Server error.');
        } else if (error.request) {

            throw new Error('Failed to load payment list. No response from server.');
        } else {

            throw new Error(error.message || 'Failed to load payment list. An unexpected error occurred.');
        }
    }
};


const sendPaymentReminder = async (tenantId, token) => {
    try {
        const response = await api.post(`/vendor/send-reminder/${tenantId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error sending payment reminder to tenant ${tenantId}:`, error);
        throw error;

    }}

const setDueDate = async (vendorId, DueDate, token) => {
    try {
        const response = await api.post(`/vendor/setduedate/${vendorId}`, {dueDate:DueDate}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'
            }
        });
        console.log(response);
        return response.data; 
    } catch (error) {
        console.error("Failed to set due date and create payments:", error.message);

    }
};


const deleteProperty = async (propertyId, token) => {
    try {
        const response = await api.delete(`vendor/property/${propertyId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting property ${propertyId}:`, error);
        throw error;
    }
};

const searchTenantsByState = async (ownerId, state, token) => {
    try {
        const response = await api.get(`/vendor/search/state/${ownerId}?state=${state}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to search tenants.');
        } else {
            throw new Error(error.message || 'Failed to search tenants.');
        }
    }
};

const searchTenantsByCompany = async (ownerId, company, token) => {
    try {
        const response = await api.get(`/vendor/search/company/${ownerId}?company=${company}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to search tenants.');
        } else {
            throw new Error(error.message || 'Failed to search tenants.');
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
    getPaymentList,
    sendPaymentReminder,
    setDueDate,
    deleteProperty,
    searchTenantsByState,
    searchTenantsByCompany
};
