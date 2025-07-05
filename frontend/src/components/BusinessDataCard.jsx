// frontend/src/components/BusinessDataCard.jsx

import React from 'react';
import { FaSpinner } from 'react-icons/fa';

function BusinessDataCard({ data, onRegenerateHeadline, isLoadingHeadline }) {
  if (!data) {
    console.log("BusinessDataCard: No data prop received.");
    return null;
  }

  // Add these console logs:
  console.log("BusinessDataCard: Data received:", data);
  console.log("BusinessDataCard: data.sentiment:", data.sentiment);
  console.log("BusinessDataCard: data.reviews:", data.reviews);


  // Calculate sentiment percentages (ensure data.sentiment and data.reviews exist)
  const sentimentPercentage = {
    positive: data.sentiment && data.reviews ? ((data.sentiment.positive / data.reviews) * 100).toFixed(1) : '0.0',
    neutral: data.sentiment && data.reviews ? ((data.sentiment.neutral / data.reviews) * 100).toFixed(1) : '0.0',
    negative: data.sentiment && data.reviews ? ((data.sentiment.negative / data.reviews) * 100).toFixed(1) : '0.0',
  };

  // Add this console log:
  console.log("BusinessDataCard: Calculated sentimentPercentage:", sentimentPercentage);

  // Function to get sentiment color using theme variables
  const getSentimentColor = (type) => {
    switch (type) {
      case 'positive': return 'text-theme-success dark:text-theme-success-dark';
      case 'neutral': return 'text-theme-warning dark:text-theme-warning-dark';
      case 'negative': return 'text-theme-error dark:text-theme-error-dark';
      default: return 'text-theme-text-light dark:text-theme-text-dark';
    }
  };

  return (
    <div className="bg-theme-card-light dark:bg-theme-card-dark p-6 rounded-lg shadow-theme-shadow-light dark:shadow-theme-shadow-dark transition-colors duration-300">
      {/* ... (rest of your component JSX) ... */}
      {/* Ensure the sentiment display part is still structured like this: */}
      <div className="mb-6">
        <h3 className="text-xl font-heading font-semibold text-theme-heading-light dark:text-theme-heading-dark mb-3">Sentiment Analysis:</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-lg">
            <span className={`font-semibold ${getSentimentColor('positive')}`}>Positive:</span>
            <span className={`${getSentimentColor('positive')}`}>{sentimentPercentage.positive}%</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className={`font-semibold ${getSentimentColor('neutral')}`}>Neutral:</span>
            <span className={`${getSentimentColor('neutral')}`}>{sentimentPercentage.neutral}%</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className={`font-semibold ${getSentimentColor('negative')}`}>Negative:</span>
            <span className={`${getSentimentColor('negative')}`}>{sentimentPercentage.negative}%</span>
          </div>
        </div>
      </div>
      {/* ... (rest of your component JSX) ... */}
    </div>
  );
}

export default BusinessDataCard;