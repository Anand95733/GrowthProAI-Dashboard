// frontend/src/context/BusinessDataProvider.jsx

import React, { useState, useCallback } from 'react';
import { BusinessDataContext } from './BusinessDataContext'; // <<< IMPORTANT: Imports from the new .js file

// Create the provider component
export const BusinessDataProvider = ({ children }) => {
  // State variables for the dashboard
  const [businesses, setBusinesses] = useState([]);
  const [activeBusinessId, setActiveBusinessId] = useState(null);
  const [businessNameInput, setBusinessNameInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHeadline, setIsLoadingHeadline] = useState(false);
  const [error, setError] = useState(null);

  // Function to clear errors, wrapped in useCallback for stability
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // The value object that will be provided to consumers of the context
  const value = {
    businesses,
    setBusinesses,
    activeBusinessId,
    setActiveBusinessId,
    businessNameInput,
    setBusinessNameInput,
    locationInput,
    setLocationInput,
    isLoading,
    setIsLoading,
    isLoadingHeadline,
    setIsLoadingHeadline,
    error,
    setError,
    clearError,
  };

  return (
    <BusinessDataContext.Provider value={value}>
      {children}
    </BusinessDataContext.Provider>
  );
};