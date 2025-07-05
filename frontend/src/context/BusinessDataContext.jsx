// frontend/src/context/BusinessDataContext.jsx

import React, { createContext, useState, useEffect, useCallback } from 'react';

const BusinessDataContext = createContext();

export const BusinessDataProvider = ({ children }) => {
  // Try to load businesses from localStorage on initial render
  const [businesses, setBusinesses] = useState(() => {
    try {
      const storedBusinesses = localStorage.getItem('growthpro_businesses');
      return storedBusinesses ? JSON.parse(storedBusinesses) : [];
    } catch (error) {
      console.error("Failed to load businesses from localStorage:", error);
      return []; // Return empty array on error
    }
  });

  const [activeBusinessId, setActiveBusinessId] = useState(null);
  const [businessNameInput, setBusinessNameInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHeadline, setIsLoadingHeadline] = useState(false);
  const [error, setError] = useState(null);

  // Effect to save businesses to localStorage whenever the businesses state changes
  useEffect(() => {
    try {
      localStorage.setItem('growthpro_businesses', JSON.stringify(businesses));
    } catch (error) {
      console.error("Failed to save businesses to localStorage:", error);
    }
  }, [businesses]);

  // When activeBusinessId changes, update the form inputs
  useEffect(() => {
    if (activeBusinessId) {
      const selectedBusiness = businesses.find(b => b.id === activeBusinessId);
      if (selectedBusiness) {
        setBusinessNameInput(selectedBusiness.name);
        setLocationInput(selectedBusiness.location);
      }
    } else {
      // If no active business, ensure form is clear
      setBusinessNameInput('');
      setLocationInput('');
    }
  }, [activeBusinessId, businesses]);


  const fetchBusinessData = useCallback(async (name, location) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/business-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, location }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch business data');
      }

      const data = await response.json();
      const newBusinessId = `biz-${Date.now()}`; // Unique ID for the new business
      const newBusiness = { id: newBusinessId, name, location, ...data };

      setBusinesses(prevBusinesses => {
        // Check if a business with the same name/location already exists
        const existingIndex = prevBusinesses.findIndex(
          b => b.name === name && b.location === location
        );

        if (existingIndex > -1) {
          // If exists, update it (though for 'new' path, we usually add)
          const updatedBusinesses = [...prevBusinesses];
          updatedBusinesses[existingIndex] = { ...updatedBusinesses[existingIndex], ...data }; // Update existing data but keep original ID
          setActiveBusinessId(updatedBusinesses[existingIndex].id);
          return updatedBusinesses;
        } else {
          // Otherwise, add new business
          setActiveBusinessId(newBusinessId);
          return [...prevBusinesses, newBusiness];
        }
      });
      return newBusiness; // Return the new business object
    } catch (err) {
      console.error('Error fetching business data:', err);
      setError(err.message);
      return null; // Return null on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const regenerateHeadline = useCallback(async () => {
    if (!activeBusinessId) return;

    setIsLoadingHeadline(true);
    setError(null);

    const currentBusiness = businesses.find(b => b.id === activeBusinessId);
    if (!currentBusiness) {
      setError('Active business not found for headline regeneration.');
      setIsLoadingHeadline(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/regenerate-headline?name=${currentBusiness.name}&location=${currentBusiness.location}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to regenerate headline');
      }

      const data = await response.json();
      setBusinesses(prevBusinesses =>
        prevBusinesses.map(b =>
          b.id === activeBusinessId ? { ...b, headline: data.headline } : b
        )
      );
    } catch (err) {
      console.error('Error regenerating headline:', err);
      setError(err.message);
    } finally {
      setIsLoadingHeadline(false);
    }
  }, [activeBusinessId, businesses]);

  const selectBusiness = useCallback((id) => {
    setActiveBusinessId(id);
  }, []);

  const selectBusinessForDetails = useCallback((businessId) => {
    setActiveBusinessId(businessId);
  }, []);

  const clearActiveBusiness = useCallback(() => {
    setActiveBusinessId(null);
  }, []);

  const updateBusiness = useCallback((id, newName, newLocation) => {
    setBusinesses(prevBusinesses =>
      prevBusinesses.map(b =>
        b.id === id ? { ...b, name: newName, location: newLocation } : b
      )
    );
  }, []);

  // NEW: Function to delete an existing business
  const deleteBusiness = useCallback((idToDelete) => {
    setBusinesses(prevBusinesses => {
      const updatedBusinesses = prevBusinesses.filter(b => b.id !== idToDelete);
      return updatedBusinesses;
    });

    // If the deleted business was the active one, clear activeBusinessId
    if (activeBusinessId === idToDelete) {
      setActiveBusinessId(null);
    }
  }, [activeBusinessId]);


  const contextValue = {
    businesses,
    activeBusinessId,
    businessNameInput,
    locationInput,
    isLoading,
    isLoadingHeadline,
    error,
    fetchBusinessData,
    regenerateHeadline,
    selectBusiness,
    selectBusinessForDetails,
    clearActiveBusiness,
    updateBusiness,
    deleteBusiness, // NEW: Add to context value
  };

  return (
    <BusinessDataContext.Provider value={contextValue}>
      {children}
    </BusinessDataContext.Provider>
  );
};

export { BusinessDataContext };