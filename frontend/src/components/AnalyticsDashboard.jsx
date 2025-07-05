// frontend/src/components/AnalyticsDashboard.jsx

import React from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell, // Keep BarChart and Bar for volume chart
  // Removed AreaChart, Area as we are replacing it
} from 'recharts';

const COLORS = {
  positive: '#28a745',
  neutral: '#ffc107',
  negative: '#dc3545',
  // New color for Review Volume Chart
  volumeBar: '#6B46C1' // A purple color for volume bars
};

function AnalyticsDashboard({ businessData }) {
  // Console Logs for Debugging (can be removed after charts work)
  console.log("AnalyticsDashboard: Received businessData:", businessData);

  if (!businessData) {
    return (
      <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-3xl dark:shadow-dark-lg max-w-xl w-full transition-colors duration-300 text-center text-neutral-dark dark:text-dark-text py-12">
        <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">
          No business data available to display analytics.
        </p>
      </div>
    );
  }

  const sentimentData = [
    { name: 'Positive', value: businessData.sentiment?.positive || 0 },
    { name: 'Neutral', value: businessData.sentiment?.neutral || 0 },
    { name: 'Negative', value: businessData.sentiment?.negative || 0 },
  ];

  // Console Logs for Debugging (can be removed after charts work)
  console.log("AnalyticsDashboard: Constructed sentimentData:", sentimentData);
  const filteredSentimentData = sentimentData.filter(entry => entry.value > 0);
  console.log("AnalyticsDashboard: Filtered sentimentData:", filteredSentimentData);

  // Custom Tooltip for Review Volume Chart
  const CustomVolumeTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-dark-background border border-dark-border rounded shadow-lg text-dark-text">
          <p className="font-semibold">{`Month: ${label}`}</p>
          <p className="text-primary">{`Reviews: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-2 bg-dark-background border border-dark-border rounded shadow-lg text-dark-text">
          <p className="font-semibold">{`${data.name}: ${data.value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-3xl dark:shadow-dark-lg transition-colors duration-300 text-neutral-dark dark:text-dark-text">
      <h2 className="text-3xl font-heading font-bold mb-6 text-center">In-depth Analytics</h2>

      {/* Dynamic AI-Generated SEO Headline Section - DISPLAY ONLY (No button) */}
      <div className="mb-8 p-6 border border-gray-200 dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-background">
        <h3 className="text-2xl font-semibold mb-4 text-center">AI-Generated SEO Headline</h3>
        <div className="text-center p-3 bg-white dark:bg-dark-card rounded-md shadow-sm">
          <p className="text-xl font-medium text-primary-dark dark:text-dark-text italic">
            "{businessData.aiGeneratedSEOHybridHeadline || 'No headline available'}"
          </p>
        </div>
      </div>

      {/* NEW CHART: Review Volume Over Time (Bar Chart) */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-center">Review Volume Over Time</h3>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Shows the number of new reviews received each month.
        </p>
        {businessData.reviewVolumeTrends && businessData.reviewVolumeTrends.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart // Changed to BarChart
              data={businessData.reviewVolumeTrends} // Using new data
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-dark-border" />
              <XAxis dataKey="month" stroke="#8884d8" className="dark:text-dark-text" tick={{ fill: 'currentColor' }} />
              <YAxis stroke="#8884d8" className="dark:text-dark-text" tick={{ fill: 'currentColor' }} />
              <Tooltip content={<CustomVolumeTooltip />} /> {/* Custom tooltip for volume */}
              <Legend />
              <Bar dataKey="count" fill={COLORS.volumeBar} /> {/* Using 'count' dataKey and new color */}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No review volume data available.</p>
        )}
      </div>

      {/* Sentiment Distribution Bar Chart (remains the same) */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-center">Customer Sentiment Distribution</h3>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Breakdown of customer reviews by sentiment category.
        </p>
        {filteredSentimentData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={filteredSentimentData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-dark-border" />
              <XAxis type="number" stroke="#8884d8" className="dark:text-dark-text" tick={{ fill: 'currentColor' }} />
              <YAxis type="category" dataKey="name" stroke="#8884d8" className="dark:text-dark-text" tick={{ fill: 'currentColor' }} />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend />
              <Bar dataKey="value" name="Review Count">
                {filteredSentimentData.map((entry, index) => (
                  <Cell
                    key={`bar-cell-${index}`}
                    fill={
                      entry.name === 'Positive'
                        ? COLORS.positive
                        : entry.name === 'Neutral'
                        ? COLORS.neutral
                        : COLORS.negative
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No sentiment data available.</p>
        )}
      </div>

      {/* Actionable Suggestions (remains the same) */}
      {businessData.actionableSuggestions && businessData.actionableSuggestions.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-border">
          <h3 className="2xl font-semibold mb-4 text-center">Actionable Suggestions</h3>
          <ul className="list-disc list-inside space-y-2 text-neutral-dark dark:text-dark-text">
            {businessData.actionableSuggestions.map((suggestion, index) => (
              <li key={index} className="text-lg">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AnalyticsDashboard;