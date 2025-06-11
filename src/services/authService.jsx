import api from './authApi';

const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data; 
};

const registerOwner = async (ownerData) => {
    const response = await api.post('/auth/register/owner', ownerData);
    return response.data; 
};

const registerTenant = async (tenantData) => {
  const response = await api.post('/auth/register/tenant', tenantData);
  return response.data;
};

const refreshToken = async (currentRefreshToken) => {
    const response = await api.post('/auth/refresh', {}, {
      headers: { 'Authorization': `Bearer ${currentRefreshToken}` }
    });
    return response.data;
  };

export default {
    login,
    registerOwner,
    registerTenant,
    refreshToken,
  };












































































// const authService = {
//     registerOwner: async (ownerData) => {
//         try {
//             const response = await fetch(API_ENDPOINTS.REGISTER_OWNER, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(ownerData),
//             });

//             const responseData = await response.json();

//             console.log('Response from registration:', responseData);

//             if (!response.ok) {
//                 // If the response status is not OK (e.g., 400, 401, 500)
//                 // The backend should return an error message in the JSON body
//                 throw new Error(responseData.message || 'Registration failed.');
//             }

//             // If the response is OK
//             return responseData; // This should contain the success message or user data
//         } catch (error) {
//             console.error('Error during owner registration:', error);
//             throw error; // Re-throw to be caught by the component or context that called this service
//         }
//     },

//     login: async (credentials) => { // <--- ADD THIS FUNCTION
//         try {
//             const response = await fetch(API_ENDPOINTS.LOGIN, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(credentials), // Expects { username, password }
//             });

//             console.log('Response from login:', response);
//             const responseData = await response.json();

//             if (!response.ok) {
//                 // Assuming your backend sends an error message on failure
//                 throw new Error(responseData.message || 'Login failed. Please check your credentials.');
//             }

//             if (responseData.accessToken) {
//                 localStorage.setItem('accessToken', responseData.accessToken);
//             }
//             if (responseData.refreshToken) {
//                 localStorage.setItem('refreshToken', responseData.refreshToken);
//             }

//             if (responseData.username) {
//                 localStorage.setItem('username', responseData.username);
//             }
//             // Assuming your backend sends a 'message' for successful login
//             if (responseData.message) {
//                 localStorage.setItem('loginMessage', responseData.message);
//             }

//             console.log('Login successful:', responseData);
//             return responseData; // Return user data and/or token
//         }

//         catch (error) {
//             console.error('Error during login:', error);
//             throw error; // Re-throw for context/component to handle
//         }
//     },

//     //   logout: () => { // <--- ADD A LOGOUT FUNCTION
//     //     localStorage.removeItem('authToken');
//     //     localStorage.removeItem('user');
//     //     // Any other cleanup like clearing specific state
//     //     console.log("User logged out.");
//     //   },

//     // Helper to get the current token
//     getAccessToken: () => {
//         return localStorage.getItem('accessToken');
//     },

//     getRefreshToken: () => {
//         return localStorage.getItem('refreshToken');
//     },
//     // Helper to get current user info
//     getUser: () => {
//         const username = localStorage.getItem('username');
//         return username ? { username } : null;
//         // return user ? JSON.parse(user) : null;
//     }
// };
