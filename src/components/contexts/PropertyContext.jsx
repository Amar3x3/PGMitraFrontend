import React, { createContext, useState, useContext } from 'react';

const PropertyContext = createContext(undefined);
console.log('Context value in useProperty:', PropertyContext);

export const useProperty = () => {
    const context = useContext(PropertyContext);
    if (context === undefined) {
        throw new Error('useProperty must be used within a PropertyProvider');
    }
    return context;
};
export const PropertyProvider = ({ children }) => {
    const [propertyId, setPropertyId] = useState(null);
    console.log('Providing context with:', { propertyId, setPropertyId });

    return (
        <PropertyContext.Provider value={{ propertyId, setPropertyId }}>
            {children}
        </PropertyContext.Provider>
    );
};