// frontend/src/components/BusinessDataCard.jsx

import React from 'react';

function BusinessDataCard({ data, onRegenerateHeadline, isLoadingHeadline }) {
  if (!data) {
    return null; // Don't render anything if no data
  }

  const sentimentPercentage = {
    positive: ((data.sentiment.positive / data.reviews) * 100).toFixed(1),
    neutral: ((data.sentiment.neutral / data.reviews) * 100).toFixed(1),
    negative: ((data.sentiment.negative / data.reviews) * 100).toFixed(1),
  };

  const getSentimentColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success-dark dark:text-green-300';
      case 'neutral': return 'text-warning dark:text-yellow-300';
      case 'negative': return 'text-error-dark dark:text-red-300';
      default: return 'text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md-light dark:shadow-dark-lg transition-colors duration-300">
      <h2 className="text-2xl font-heading font-bold text-neutral-dark dark:text-dark-text mb-4">
        {data.name} <span className="text-gray-500 text-lg">({data.location})</span>
      </h2>

      <div className="mb-4">
        <h3 className="text-xl font-heading font-semibold text-primary dark:text-dark-text flex items-center">
          Overview Headline:
          {isLoadingHeadline ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary ml-3"></div>
          ) : (
            <button
              onClick={onRegenerateHeadline}
              className="ml-3 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              title="Regenerate Headline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356-2A8.001 8.001 0 004 12v.622m15.356-2H15V9m15.356 7.422a8.001 8.001 0 01-15.356 2H9v-.622" />
              </svg>
              Regenerate
            </button>
          )}
        </h3>
        <p className="text-gray-700 dark:text-dark-text-secondary mt-2 text-lg italic">
          "{data.headline}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-neutral-light dark:bg-dark-background p-4 rounded-md shadow-sm">
          <p className="text-lg font-medium text-neutral-dark dark:text-dark-text-secondary">Google Rating:</p>
          <p className="text-3xl font-bold text-primary dark:text-secondary">{data.rating} ★</p>
        </div>
        <div className="bg-neutral-light dark:bg-dark-background p-4 rounded-md shadow-sm">
          <p className="text-lg font-medium text-neutral-dark dark:text-dark-text-secondary">Total Reviews:</p>
          <p className="text-3xl font-bold text-primary dark:text-secondary">{data.reviews}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-heading font-semibold text-neutral-dark dark:text-dark-text mb-3">Sentiment Analysis:</h3>
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

      <div>
        <h3 className="text-xl font-heading font-semibold text-neutral-dark dark:text-dark-text mb-3">Suggestions:</h3>
        <ul className="list-disc list-inside text-gray-700 dark:text-dark-text-secondary space-y-1">
          {data.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BusinessDataCard;