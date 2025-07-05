// frontend/src/components/BusinessForm.jsx

import React, { useState, useEffect } from 'react';
// No need to import useBusinessData here directly as props are passed from App.jsx

function BusinessForm({ onSubmit, initialBusinessName, initialLocation, activeBusinessId }) { // NEW: activeBusinessId prop
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
  }, [initialBusinessName, initialLocation, activeBusinessId]); // NEW: Added activeBusinessId to dependency array

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
      className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-3xl dark:shadow-dark-lg transition-colors duration-300"
    >
      <div className="mb-6">
        <label htmlFor="businessName" className="block text-neutral-dark dark:text-dark-text text-lg font-semibold mb-2">
          Business Name
        </label>
        <input
          type="text"
          id="businessName"
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            nameError
              ? 'border-error-dark focus:border-error-dark focus:ring-error-light'
              : 'border-gray-300 focus:border-primary focus:ring-primary'
          } dark:bg-dark-background dark:border-dark-border dark:text-dark-text`}
          placeholder="e.g., My Awesome Cafe"
          value={businessName}
          onChange={handleBusinessNameChange}
          aria-describedby={nameError ? "businessNameError" : undefined}
          aria-invalid={!!nameError}
        />
        {nameError && (
          <p id="businessNameError" className="text-error-dark text-sm mt-1 dark:text-red-400">
            {nameError}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="location" className="block text-neutral-dark dark:text-dark-text text-lg font-semibold mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
            locationError
              ? 'border-error-dark focus:border-error-dark focus:ring-error-light'
              : 'border-gray-300 focus:border-primary focus:ring-primary'
          } dark:bg-dark-background dark:border-dark-border dark:text-dark-text`}
          placeholder="e.g., Hyderabad"
          value={location}
          onChange={handleLocationChange}
          aria-describedby={locationError ? "locationError" : undefined}
          aria-invalid={!!locationError}
        />
        {locationError && (
          <p id="locationError" className="text-error-dark text-sm mt-1 dark:text-red-400">
            {locationError}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-offset-dark-background"
      >
        {activeBusinessId ? 'Save Changes' : 'Analyze My Business'} {/* NEW: Dynamic button text */}
      </button>
    </form>
  );
}

export default BusinessForm;