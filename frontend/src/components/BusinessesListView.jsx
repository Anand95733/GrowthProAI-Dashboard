// frontend/src/components/BusinessesListView.jsx

import React from 'react';
import { useBusinessData } from '../hooks/useBusinessData'; // NEW: Import useBusinessData

function BusinessesListView({ businesses, selectBusinessForDetails, setActiveView }) {
  // NEW: Destructure deleteBusiness from context
  const { deleteBusiness } = useBusinessData();

  const handleDelete = (businessId, businessName, event) => {
    event.stopPropagation(); // Prevent triggering selectBusinessForDetails when clicking delete button
    if (window.confirm(`Are you sure you want to delete "${businessName}"?`)) {
      deleteBusiness(businessId);
      // Optional: After deleting, you might want to automatically navigate to the home view
      // or ensure the list view is refreshed. Context handles the data update.
      // If the deleted business was active, activeBusinessId will be null, and App.jsx
      // will handle the view change automatically to 'home'.
      // No need to explicitly call setActiveView('businesses_list') here unless desired.
    }
  };

  if (businesses.length === 0) {
    return (
      <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-3xl dark:shadow-dark-lg max-w-xl w-full transition-colors duration-300 text-center text-neutral-dark dark:text-dark-text py-12">
        <h2 className="text-2xl font-semibold mb-4">No Businesses Saved</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Start by adding a new business from the "Dashboard" tab!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-3xl dark:shadow-dark-lg max-w-xl w-full transition-colors duration-300">
      <ul className="space-y-4">
        {businesses.map((business) => (
          <li
            key={business.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-background rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-border transition-colors duration-200"
            onClick={() => {
              selectBusinessForDetails(business.id);
              setActiveView('business_detail'); // Navigate to detail view on click
            }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-neutral-dark dark:text-dark-text truncate">
                {business.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {business.location}
              </p>
            </div>
            <div className="flex items-center space-x-3 ml-4">
              <span className="flex items-center text-primary font-bold text-base">
                {business.rating ? business.rating.toFixed(1) : 'N/A'}★
              </span>
              {/* NEW: Delete Button */}
              <button
                onClick={(e) => handleDelete(business.id, business.name, e)}
                className="p-2 bg-error-dark text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
                aria-label={`Delete ${business.name}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 3a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm0 3a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BusinessesListView;