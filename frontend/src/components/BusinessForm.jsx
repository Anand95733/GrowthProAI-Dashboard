// frontend/src/components/BusinessForm.jsx

import React, { useState, useEffect } from 'react';
// No need to import useBusinessData here directly as props are passed from App.jsx

function BusinessForm({ onSubmit, initialBusinessName, initialLocation, activeBusinessId, isLoading }) { // NEW: Added isLoading prop
  // Use local state for form inputs, initialized from props
  const [businessName, setBusinessName] = useState(initialBusinessName || '');
  const [location, setLocation] = useState(initialLocation || '');

  // State for validation errors
  const [nameError, setNameError] = useState('');
  const [locationError, setLocationError] = useState('');

  // Update local state when initialBusinessName/initialLocation/activeBusinessId props change
  useEffect(() => {
    setBusinessName(initialBusinessName || '');
    setLocation(initialLocation || '');
    // Clear errors when inputs change due to external prop updates (e.g., selecting a new/different business)
    setNameError('');
    setLocationError('');
  }, [initialBusinessName, initialLocation, activeBusinessId]);

  const handleBusinessNameChange = (e) => {
    const value = e.target.value;
    setBusinessName(value);
    // Real-time validation for name
    if (value.trim() === '') {
      setNameError('Business Name cannot be empty.');
    } else if (value.length < 2) {
      setNameError('Business Name must be at least 2 characters.');
    } else {
      setNameError(''); // Clear error if valid
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    // Real-time validation for location
    if (value.trim() === '') {
      setLocationError('Location cannot be empty.');
    } else if (value.length < 2) {
      setLocationError('Location must be at least 2 characters.');
    } else {
      setLocationError(''); // Clear error if valid
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation before submission
    let isValid = true;
    if (businessName.trim() === '') {
      setNameError('Business Name cannot be empty.');
      isValid = false;
    } else if (businessName.length < 2) {
      setNameError('Business Name must be at least 2 characters.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (location.trim() === '') {
      setLocationError('Location cannot be empty.');
      isValid = false;
    } else if (location.length < 2) {
      setLocationError('Location must be at least 2 characters.');
      isValid = false;
    } else {
      setLocationError('');
    }

    if (!isValid) {
      return; // Stop submission if there are validation errors
    }

    // Call the onSubmit prop from parent (App.jsx), which now handles new vs. update logic
    onSubmit(businessName, location);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-theme-card-light dark:bg-theme-card-dark p-8 rounded-xl shadow-theme-shadow-light dark:shadow-theme-shadow-dark transition-colors duration-300"
    >
      <div className="mb-6">
        <label htmlFor="businessName" className="block text-theme-heading-light dark:text-theme-heading-dark text-lg font-semibold mb-2">
          Business Name
        </label>
        <input
          type="text"
          id="businessName"
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            nameError
              ? 'border-error focus:border-error focus:ring-error' // Using semantic error colors
              : 'border-theme-border-light focus:border-theme-primary-light focus:ring-theme-primary-light'
          } dark:bg-theme-background-dark dark:border-theme-border-dark dark:text-theme-text-dark`} // Adjusted dark mode input colors
          placeholder="e.g., My Awesome Cafe"
          value={businessName}
          onChange={handleBusinessNameChange}
          aria-describedby={nameError ? "businessNameError" : undefined}
          aria-invalid={!!nameError}
        />
        {nameError && (
          <p id="businessNameError" className="text-error text-sm mt-1 dark:text-error"> {/* Using semantic error colors */}
            {nameError}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="location" className="block text-theme-heading-light dark:text-theme-heading-dark text-lg font-semibold mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            locationError
              ? 'border-error focus:border-error focus:ring-error' // Using semantic error colors
              : 'border-theme-border-light focus:border-theme-primary-light focus:ring-theme-primary-light'
          } dark:bg-theme-background-dark dark:border-theme-border-dark dark:text-theme-text-dark`} // Adjusted dark mode input colors
          placeholder="e.g., Hyderabad"
          value={location}
          onChange={handleLocationChange}
          aria-describedby={locationError ? "locationError" : undefined}
          aria-invalid={!!locationError}
        />
        {locationError && (
          <p id="locationError" className="text-error text-sm mt-1 dark:text-error"> {/* Using semantic error colors */}
            {locationError}
          </p>
        )}
      </div>

      <button
        type="submit"
        className={`w-full text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
                   ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-theme-primary-dark'}
                   bg-theme-primary-light dark:bg-theme-primary-dark
                   focus:ring-theme-primary-light dark:focus:ring-theme-primary-dark
                   focus:ring-offset-theme-card-light dark:focus:ring-offset-theme-card-dark`} // Adjusted ring offset
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {activeBusinessId ? 'Saving...' : 'Analyzing...'}
          </div>
        ) : (
          activeBusinessId ? 'Save Changes' : 'Analyze My Business'
        )}
      </button>
    </form>
  );
}

export default BusinessForm;