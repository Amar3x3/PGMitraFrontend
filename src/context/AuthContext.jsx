import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import api from '../services/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null); 

    const decodeToken = useCallback((token) => {
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            const role = decoded.roles?.includes('ROLE_OWNER') ? 'OWNER' :
                decoded.roles?.includes('ROLE_TENANT') ? 'TENANT' : null;
            return { username: decoded.sub, role: role, id: decoded.userId };
        }

        catch (e) {
            console.error("Failed to decode token:", e);
            return null;
        }

    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decodedUser = decodeToken(accessToken);
            if (decodedUser) {
                setUser(decodedUser);
            } else {
                
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user'); 
            }
        }
        setLoading(false);
    }, [decodeToken]);

    const login = async (credentials) => {
        setError(null);
        try {
          const response = await api.post('/auth/login', credentials);
          const {userId, accessToken, refreshToken } = response.data;
          
          localStorage.setItem('userId', userId);
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          
          const decodedUser = decodeToken(accessToken);

          setUser(decodedUser);
          return decodedUser;



        } catch (err) {
          console.error("Login failed:", err.response?.data?.message || err.message);
          setError(err.response?.data?.message || "Login failed. Please check your credentials.");
          throw err;
        }

      };

      const registerOwner = async (ownerData) => {
        setError(null);
        try {
         
          const response = await api.post('/auth/register/owner', ownerData);
          return response.data; 
        } catch (err) {
          console.error("Owner registration failed:", err.response?.data?.message || err.message);
          setError(err.response?.data?.message || "Registration failed. Please try again.");
          throw err;
        }
      };

      const registerTenant = async (tenantData) => {
        setError(null);
        try {
        
          const response = await api.post('/auth/register/tenant', tenantData);
          return response.data;
        } catch (err) {
          console.error("Tenant registration failed:", err.response?.data?.message || err.message);
          setError(err.response?.data?.message || "Registration failed. Please try again.");
          throw err;
        }
      };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
      };


    const value = {
        user,
        loading,
        error,
        message,
        registerOwner,
        registerTenant,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

