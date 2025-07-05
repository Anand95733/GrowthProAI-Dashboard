// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // This line is crucial for dark mode to work by toggling 'dark' class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Light Theme Colors (Inspired by growthproai.com/portfolios) ---
        'theme-background-light': '#EEF8F1', // The very light green background of the portfolio page
        'theme-card-light': '#FFFFFF',       // White for cards, forms, and general content backgrounds
        'theme-navbar-light': '#FFFFFF',     // White for Navbar background in light mode

        'theme-text-light': '#1F2937',       // Dark gray for general text
        'theme-heading-light': '#1F2937',    // Dark gray for headings

        'theme-primary-light': '#00A381',    // GrowthProAI's vibrant green accent for buttons, links, highlights
        'theme-secondary-light': '#6B46C1',  // A contrasting color (purple, from existing charts)
        'theme-border-light': '#E5E7EB',     // Light gray for borders

        // --- Dark Theme Colors (Custom dark palette) ---
        'theme-background-dark': '#1A202C',  // Deep charcoal for dark page background
        'theme-card-dark': '#2D3748',        // Slightly lighter charcoal for cards and forms in dark mode
        'theme-navbar-dark': '#2A303C',      // A distinct darker shade for the Navbar in dark mode

        'theme-text-dark': '#E2E8F0',        // Off-white for general text in dark mode
        'theme-heading-dark': '#E2E8F0',     // Off-white for headings in dark mode

        'theme-primary-dark': '#4FD1C5',     // Lighter teal/cyan for primary accent in dark mode
        'theme-secondary-dark': '#9F7AEA',   // Lighter purple for secondary in dark mode
        'theme-border-dark': '#4A5568',      // Darker gray for borders in dark mode

        // --- Standard semantic colors (can use theme-primary for main accents) ---
        'success': '#28a745',
        'error': '#dc3545',
        'warning': '#ffc107',
      },
      boxShadow: {
        // Define shadows that work well in both themes
        'theme-shadow-light': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'theme-shadow-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.15)',
        // You can adjust '3xl' and 'dark-lg' if you are using them directly
        '3xl': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        // If you want to use custom fonts, you would define them here.
        // For example: 'sans': ['Inter', 'sans-serif'],
        // 'heading': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}