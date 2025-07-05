// backend/index.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper function to simulate realistic-ish data with more variance
function getSimulatedBusinessData(name, location) {
    const lowerName = name.toLowerCase();
    const lowerLocation = location.toLowerCase();

    let rating;
    let reviews = Math.floor(100 + Math.random() * 900); // Base reviews

    // Generate a rating with more variability:
    // 15% chance for a lower rating (2.0-3.5)
    // 30% chance for a moderate rating (3.5-4.3)
    // 55% chance for a good rating (4.3-4.9)
    const randomRatingRoll = Math.random();
    if (randomRatingRoll < 0.15) {
        rating = 2.0 + Math.random() * 1.5; // Between 2.0 and 3.5
        reviews = Math.floor(reviews * (0.5 + Math.random() * 0.5)); // Fewer reviews for poor businesses
    } else if (randomRatingRoll < 0.45) {
        rating = 3.5 + Math.random() * 0.8; // Between 3.5 and 4.3
    } else {
        rating = 4.3 + Math.random() * 0.6; // Between 4.3 and 4.9
    }

    // Ensure minimum reviews, even for low-rated businesses
    if (reviews < 20) reviews = 20;

    let headline = `Revolutionize Your ${location} Presence with ${name}`;
    let positive, neutral, negative;
    let suggestions = [];

    // Dynamically set sentiment distribution and suggestions based on rating
    if (rating >= 4.5) {
        positive = Math.floor(reviews * (0.85 + Math.random() * 0.10)); // 85-95% positive
        neutral = Math.floor(reviews * (0.03 + Math.random() * 0.05)); // 3-8% neutral
        negative = reviews - positive - neutral;
        if (negative < 0) negative = 0;
        suggestions = [
            `Maintain high service standards to keep positive momentum.`,
            `Leverage positive reviews in marketing campaigns.`,
            `Continue engaging with customers to foster loyalty.`,
            `Explore new service offerings based on customer feedback.`,
        ];
    } else if (rating >= 3.8) {
        positive = Math.floor(reviews * (0.60 + Math.random() * 0.20)); // 60-80% positive
        neutral = Math.floor(reviews * (0.10 + Math.random() * 0.10)); // 10-20% neutral
        negative = reviews - positive - neutral;
        if (negative < 0) negative = 0;
        suggestions = [
            `Identify common themes in neutral/negative reviews for targeted improvements.`,
            `Proactively ask satisfied customers for reviews.`,
            `Enhance online presence with updated information and photos.`,
            `Consider a customer feedback survey to identify areas for growth.`,
            `Train staff on handling customer complaints effectively.`,
        ];
    } else if (rating >= 3.0) {
        positive = Math.floor(reviews * (0.40 + Math.random() * 0.20)); // 40-60% positive
        neutral = Math.floor(reviews * (0.15 + Math.random() * 0.10)); // 15-25% neutral
        negative = reviews - positive - neutral;
        if (negative < 0) negative = 0;
        suggestions = [
            `Address recurring negative feedback points immediately and publicly if appropriate.`,
            `Implement rigorous staff training to improve customer service.`,
            `Offer incentives for customers to provide detailed, constructive feedback.`,
            `Review your product/service quality based on critical reviews and adjust.`,
            `Consider a rebranding or a new service offering to boost perception and attract new customers.`,
            `Engage a mystery shopper program to identify service gaps.`,
        ];
    } else { // Rating < 3.0
        positive = Math.floor(reviews * (0.20 + Math.random() * 0.20)); // 20-40% positive
        neutral = Math.floor(reviews * (0.10 + Math.random() * 0.10)); // 10-20% neutral
        negative = reviews - positive - neutral;
        if (negative < 0) negative = 0;
        suggestions = [
            `Conduct a thorough internal review of all operations and customer touchpoints.`,
            `Engage with a reputation management specialist immediately.`,
            `Prioritize addressing all negative feedback with empathy, a clear action plan, and follow-up.`,
            `Consider a temporary pause on marketing and focus on resolving core issues.`,
            `Focus on regaining trust through visible improvements and transparent communication.`,
            `Offer refunds or compensation for significant negative experiences to mitigate damage.`,
            `Implement strict quality control measures for products/services.`,
        ];
    }

    // Specific headline variations based on name/location
    if (lowerName.includes('cafe') || lowerName.includes('coffee')) {
        headline = `Your Cozy ${name}: Best Coffee in ${location}`;
    } else if (lowerName.includes('tech') || lowerName.includes('solutions')) {
        headline = `Cutting-Edge ${name} for ${location}'s Digital Needs`;
    } else if (lowerName.includes('restaurant')) {
        headline = `Experience Culinary Delights at ${name} in ${location}`;
    }

    // Ensure sum of sentiments equals total reviews (adjust if needed)
    const currentSum = positive + neutral + negative;
    if (currentSum !== reviews) {
        positive += (reviews - currentSum); // Add/subtract difference from positive
        if (positive < 0) positive = 0;
    }

    // Simulate historical review data for a trend chart
    const reviewTrends = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    let currentMonthReviews = Math.floor(reviews * 0.8); // Start with a slightly lower base for trend

    for (let i = 0; i < 6; i++) { // Last 6 months
        let trendChange = (Math.random() * 50 - 25); // Base fluctuation +/- 25
        if (rating < 3.5) { // If rating is low, trend might be negative or stagnant
            trendChange -= (3.5 - rating) * 20; // More negative change for lower ratings
        } else if (rating > 4.5) { // If rating is high, more positive growth
            trendChange += (rating - 4.5) * 15;
        }

        currentMonthReviews = Math.floor(currentMonthReviews + trendChange);
        if (currentMonthReviews < 0) currentMonthReviews = 0; // Ensure no negative review counts

        reviewTrends.push({ month: months[i], count: currentMonthReviews });
    }
    // Force the last month's review count to closely match the current total reviews
    // This provides a clearer tie between the trend and the overall review count.
    reviewTrends[5].count = reviews;


    return {
        rating: parseFloat(rating.toFixed(1)), // Format rating to one decimal place
        reviews: reviews,
        headline: headline,
        sentiment: {
            positive: positive,
            neutral: neutral,
            negative: negative,
        },
        suggestions: suggestions,
        reviewTrends: reviewTrends,
    };
}

app.post('/business-data', (req, res) => {
    const { name, location } = req.body;
    if (!name || !location) {
        return res.status(400).json({ message: 'Business name and location are required.' });
    }

    const data = getSimulatedBusinessData(name, location);
    res.json(data);
});

app.get('/regenerate-headline', (req, res) => {
    const { name, location } = req.query;
    if (!name || !location) {
        return res.status(400).json({ message: 'Business name and location are required for headline regeneration.' });
    }

    const simulatedData = getSimulatedBusinessData(name, location);
    res.json({ headline: simulatedData.headline });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});