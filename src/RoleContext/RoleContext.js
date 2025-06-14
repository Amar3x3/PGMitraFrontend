// src/context/RoleContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const RoleContext = createContext();

// Define background colors
const BACKGROUND_COLORS = {
    default: '#def2fb', // Your original default
    tenant: '#d4edda',  // Shade of green for tenant
    owner: '#def2fb',   // Dark blue for owner
};

// Create a provider component
export const RoleProvider = ({ children }) => {
    const [selectedRole, setSelectedRole] = useState(null); // 'tenant', 'owner', or null

    // Effect to update the CSS variable on the <html> element
    useEffect(() => {
        const root = document.documentElement;
        let colorToApply = BACKGROUND_COLORS.default;

        if (selectedRole === 'tenant') {
            colorToApply = BACKGROUND_COLORS.tenant;
        } else if (selectedRole === 'owner') {
            colorToApply = BACKGROUND_COLORS.owner;
        }

        root.style.setProperty('--app-background-color', colorToApply);
    }, [selectedRole]);

    return (
        <RoleContext.Provider value={{ selectedRole, setSelectedRole }}>
            {children}
        </RoleContext.Provider>
    );
};

// Custom hook to easily use the context
export const useRole = () => {
    return useContext(RoleContext);
};