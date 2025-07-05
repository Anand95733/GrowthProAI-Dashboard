// frontend/src/components/Navbar.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ isDarkMode, toggleDarkMode, setActiveView, clearActiveBusiness }) {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    setActiveView('home'); // Still keep setActiveView for internal app logic if needed
    clearActiveBusiness(); // Clear active business when navigating to home/dashboard
    navigate('/'); // Navigate to the root path
  };

  const handleBusinessesClick = () => {
    setActiveView('businesses_list'); // Still keep setActiveView if needed elsewhere
    navigate('/businesses'); // Navigate to the /businesses path
  };

  // The 'Settings' button remains removed as per your initial request
  // If you wish to re-add it, you'd define a similar handler and a button for /settings
  // const handleSettingsClick = () => {
  //   setActiveView('settings');
  //   navigate('/settings');
  // };

  return (
    <nav className="fixed top-0 left-0 w-full bg-theme-navbar-light dark:bg-theme-navbar-dark shadow-md dark:shadow-dark-lg z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand Name - Uses navigate to home path */}
        <div className="text-2xl font-bold text-theme-primary-light dark:text-theme-primary-dark cursor-pointer" onClick={handleDashboardClick}>
          GrowthProAI
        </div>

        {/* Navigation Links - Use navigate for routing */}
        <div className="flex space-x-6">
          <button
            className="text-theme-text-light dark:text-theme-text-dark hover:text-theme-primary-light dark:hover:text-theme-primary-dark text-lg font-medium transition-colors duration-300"
            onClick={handleDashboardClick}
          >
            Dashboard
          </button>
          <button
            className="text-theme-text-light dark:text-theme-text-dark hover:text-theme-primary-light dark:hover:text-theme-primary-dark text-lg font-medium transition-colors duration-300"
            onClick={handleBusinessesClick}
          >
            Businesses
          </button>
          {/* Settings button is intentionally omitted here */}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-theme-primary-light dark:focus:ring-theme-primary-dark transition-colors duration-300"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-7.757l-.707.707M5.332 18.007l-.707-.707m12.728 0l.707.707M6.003 6.003l-.707-.707M12 18a6 6 0 110-12 6 6 0 010 12z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;