// frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import BusinessForm from './components/BusinessForm';
import BusinessDataCard from './components/BusinessDataCard';
import Navbar from './components/Navbar';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import BusinessesListView from './components/BusinessesListView';
import { useBusinessData } from './hooks/useBusinessData';
import { BusinessDataProvider } from './context/BusinessDataProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function DashboardContent() {
  const {
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
  } = useBusinessData();

  const activeBusinessData = businesses.find(b => b.id === activeBusinessId);

  // Console Logs for Debugging (can be removed later)
  console.log("DashboardContent: businesses array:", businesses);
  console.log("DashboardContent: activeBusinessId:", activeBusinessId);
  console.log("DashboardContent: activeBusinessData:", activeBusinessData);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const [activeView, setActiveView] = useState('home');

  useEffect(() => {
    if (activeBusinessId) {
      if (activeView !== 'businesses_list') {
        setActiveView('business_detail');
      }
    } else {
      if (activeView !== 'businesses_list') {
        setActiveView('home');
      }
      clearActiveBusiness();
    }
  }, [activeBusinessId, activeView, clearActiveBusiness]);

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <>
            <h1 className="text-4xl font-heading font-extrabold text-theme-heading-light dark:text-theme-heading-dark text-center mb-8">
              GrowthProAI Dashboard
            </h1>
            <div className="flex border-b border-theme-border-light dark:border-theme-border-dark mb-6 overflow-x-auto pb-2">
              <button
                className={`py-3 px-6 text-lg font-semibold transition-all duration-300 whitespace-nowrap
                  ${!activeBusinessId
                    ? 'border-b-4 border-theme-primary-light text-theme-primary-light dark:text-theme-primary-dark dark:border-theme-primary-dark'
                    : 'text-theme-text-light hover:text-theme-text-light dark:text-theme-text-dark dark:hover:text-theme-text-dark hover:border-theme-border-light dark:hover:border-theme-border-dark'}` // Adjusted hover colors
                }
                onClick={() => { clearActiveBusiness(); setActiveView('home'); }}
              >
                New Business
              </button>
              {businesses.map(business => (
                <button
                  key={business.id}
                  className={`py-3 px-6 text-lg font-semibold transition-all duration-300 whitespace-nowrap
                    ${activeBusinessId === business.id
                      ? 'border-b-4 border-theme-primary-light text-theme-primary-light dark:text-theme-primary-dark dark:border-theme-primary-dark'
                      : 'text-theme-text-light hover:text-theme-text-light dark:text-theme-text-dark dark:hover:text-theme-text-dark hover:border-theme-border-light dark:hover:border-theme-border-dark'}` // Adjusted hover colors
                  }
                  onClick={() => selectBusiness(business.id)}
                >
                  {business.name}
                </button>
              ))}
            </div>

            <div className="min-h-[300px] flex flex-col justify-center">
              <div className="mb-8">
                <BusinessForm
                  onSubmit={fetchBusinessData}
                  initialBusinessName={businessNameInput}
                  initialLocation={locationInput}
                />
              </div>

              {isLoading && (activeView === 'home') && (
                <div className="text-center py-4 text-theme-primary-light font-medium dark:text-theme-primary-dark">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-theme-primary-light mx-auto mb-2"></div>
                  Loading business data...
                </div>
              )}
              {error && (activeView === 'home') && (
                <div className="bg-error border border-error text-error-dark px-4 py-3 rounded relative mb-4 dark:bg-error dark:border-error dark:text-red-300" role="alert">
                  <strong className="font-bold">Error! </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              {!isLoading && !error && !activeBusinessId && (
                  <div className="text-center text-theme-text-light py-4 dark:text-theme-text-dark">
                    Enter business details above to generate data for a new business.
                  </div>
              )}
            </div>
          </>
        );

      case 'businesses_list':
        return (
          <>
            <h1 className="text-4xl font-heading font-extrabold text-theme-heading-light dark:text-theme-heading-dark text-center mb-8">
              Your Saved Businesses
            </h1>
            <BusinessesListView
              businesses={businesses}
              selectBusinessForDetails={selectBusinessForDetails}
              setActiveView={setActiveView}
            />
          </>
        );

      case 'business_detail':
        return (
          <>
            <h1 className="text-4xl font-heading font-extrabold text-theme-heading-light dark:text-theme-heading-dark text-center mb-8">
              Business Details
            </h1>
            <div className="min-h-[300px] flex flex-col justify-center">
              {isLoading && (
                <div className="text-center py-4 text-theme-primary-light font-medium dark:text-theme-primary-dark">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-theme-primary-light mx-auto mb-2"></div>
                  Loading details...
                </div>
              )}
              {error && (
                <div className="bg-error border border-error text-error-dark px-4 py-3 rounded relative mb-4 dark:bg-error dark:border-error dark:text-red-300" role="alert">
                  <strong className="font-bold">Error! </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              {!isLoading && !error && activeBusinessData ? (
                <>
                  <BusinessDataCard
                    data={activeBusinessData}
                    onRegenerateHeadline={regenerateHeadline}
                    isLoadingHeadline={isLoadingHeadline}
                  />
                  <div className="mt-8">
                    <AnalyticsDashboard
                      businessData={{
                        ...activeBusinessData,
                        // NEW: Simulated Review Volume Data
                        reviewVolumeTrends: [
                            { month: 'Jan', count: 50 },
                            { month: 'Feb', count: 65 },
                            { month: 'Mar', count: 70 },
                            { month: 'Apr', count: 55 },
                            { month: 'May', count: 80 },
                            { month: 'Jun', count: 95 },
                        ],
                      }}
                    />
                  </div>
                </>
              ) : (
                !isLoading && !error && activeBusinessId && (
                  <div className="text-center text-error py-4 dark:text-error">
                    Error: Could not load data for selected business.
                  </div>
                )
              )}
                {!isLoading && !error && !activeBusinessId && (
                   <div className="text-center text-theme-text-light py-4 dark:text-theme-text-dark">
                    Please select a business from the "Businesses" list to view its details.
                   </div>
                )}
            </div>
          </>
        );

      case 'settings':
        return (
          <div className="bg-theme-card-light dark:bg-theme-card-dark p-8 rounded-xl shadow-theme-shadow-light dark:shadow-theme-shadow-dark max-w-xl w-full transition-colors duration-300 text-theme-text-light dark:text-theme-text-dark text-center py-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Settings</h2>
            <p>User settings and preferences will go here. Coming soon!</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-theme-background-light dark:bg-theme-background-dark font-sans transition-colors duration-300">
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        setActiveView={setActiveView}
        clearActiveBusiness={clearActiveBusiness}
      />

      <div className="pt-24 flex items-center justify-center p-4">
        <div className="max-w-xl w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <BusinessDataProvider>
        <DashboardContent />
      </BusinessDataProvider>
    </Router>
  );
}

export default App;