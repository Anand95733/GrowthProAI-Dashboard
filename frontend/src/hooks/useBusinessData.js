// frontend/src/hooks/useBusinessData.js

import { useContext, useState, useEffect, useCallback } from 'react';
import { BusinessDataContext } from '../context/BusinessDataContext';

// Define your API base URL here, using the deployed backend URL
const API_BASE_URL = 'https://growthproai-dashboard-sm5p.onrender.com'; // <<< UPDATED: Your live backend URL

export const useBusinessData = () => {
  const context = useContext(BusinessDataContext);
  if (!context) {
    throw new Error('useBusinessData must be used within a BusinessDataProvider');
  }

  // Destructure all necessary state and functions from the context
  const {
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
  } = context;


  // Function to fetch business data (wrapped in useCallback for performance)
  const fetchBusinessData = useCallback(async (name, location) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/business-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, location }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const newBusiness = {
        id: Date.now().toString(), // Simple unique ID
        name,
        location,
        rating: data.rating,
        reviews: data.reviews,
        aiGeneratedSEOHybridHeadline: data.headline,
        reviewVolumeTrends: data.reviewVolumeTrends || [], // Ensure it's an array
        sentimentDistribution: data.sentimentDistribution || {}, // Ensure it's an object
      };

      setBusinesses(prev => [...prev, newBusiness]);
      setActiveBusinessId(newBusiness.id);
      setBusinessNameInput('');
      setLocationInput('');

    } catch (err) {
      console.error("Error fetching business data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [setBusinesses, setActiveBusinessId, setBusinessNameInput, setLocationInput, setIsLoading, setError]);


  // Function to regenerate headline (wrapped in useCallback for performance)
  const regenerateHeadline = useCallback(async () => {
    if (!activeBusinessId) {
      setError("No active business selected to regenerate headline.");
      return;
    }

    setIsLoadingHeadline(true);
    setError(null);
    try {
      const activeBusiness = businesses.find(b => b.id === activeBusinessId);
      if (!activeBusiness) {
        throw new Error("Active business not found.");
      }

      // Encode URI components for name and location
      const response = await fetch(`${API_BASE_URL}/regenerate-headline?name=${encodeURIComponent(activeBusiness.name)}&location=${encodeURIComponent(activeBusiness.location)}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBusinesses(prev => prev.map(b =>
        b.id === activeBusinessId ? { ...b, aiGeneratedSEOHybridHeadline: data.headline } : b
      ));

    } catch (err) {
      console.error("Error regenerating headline:", err);
      setError(err.message);
    } finally {
      setIsLoadingHeadline(false);
    }
  }, [activeBusinessId, businesses, setBusinesses, setIsLoadingHeadline, setError]);


  // Function to select a business (wrapped in useCallback for performance)
  const selectBusiness = useCallback((id) => {
    setActiveBusinessId(id);
    clearError();
  }, [setActiveBusinessId, clearError]);

  // Function to clear active business (wrapped in useCallback for performance)
  const clearActiveBusiness = useCallback(() => {
    setActiveBusinessId(null);
    setBusinessNameInput(''); // Clear input fields too
    setLocationInput('');
    clearError();
  }, [setActiveBusinessId, setBusinessNameInput, setLocationInput, clearError]);

  // Function to select business for details (used by BusinessesListView, wrapped in useCallback for performance)
  const selectBusinessForDetails = useCallback((businessId) => {
    setActiveBusinessId(businessId);
    clearError();
  }, [setActiveBusinessId, clearError]);


  // Expose all necessary state and functions provided by the context
  return {
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
    clearActiveBusiness,
    selectBusinessForDetails,
  };
};