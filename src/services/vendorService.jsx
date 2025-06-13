import api from './authApi';

const createProperty = async (ownerId, propertyData) => {
    const response = await api.post(`/vendor/property/${ownerId}`, propertyData);
    return response.data;
};

const createRoom = async (propertyId, roomData) => {
    const response = await api.post(`/vendor/room/${propertyId}`, roomData);
    return response.data;
};

export default {
    createProperty,
    createRoom
};
