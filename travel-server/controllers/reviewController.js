const { Review, Destination, User } = require('../models');

// Get all reviews for a destination
const getReviewsForDestination = async (req, res) => {
    try {
        const { destinationId } = req.params;
        const destination = await Destination.findByPk(destinationId, {
            include: [{ model: Review, include: [User] }]
        });

        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        res.status(200).json(destination.Reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new review for a destination
const createReview = async (req, res) => {
    try {
        const { destinationId } = req.params;
        const { content, rating } = req.body;
        const userId = req.user.id;

        const destination = await Destination.findByPk(destinationId);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        const newReview = await Review.create({
            content,
            rating,
            UserId: userId,
            DestinationId: destinationId,
        });

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a review by ID
const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { content, rating } = req.body;
        const userId = req.user.id;

        const review = await Review.findOne({ where: { id: reviewId, UserId: userId } });
        if (!review) {
            return res.status(404).json({ message: 'Review not found or not owned by user' });
        }

        await Review.update({ content, rating }, { where: { id: reviewId } });
        const updatedReview = await Review.findByPk(reviewId);

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;

        const review = await Review.findOne({ where: { id: reviewId, UserId: userId } });
        if (!review) {
            return res.status(404).json({ message: 'Review not found or not owned by user' });
        }

        await Review.destroy({ where: { id: reviewId } });
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getReviewsForDestination,
    createReview,
    updateReview,
    deleteReview,
};
