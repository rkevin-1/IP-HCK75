const express = require('express');
const destinationController = require('../controllers/destinationController');
const userController = require('../controllers/userController');
const reviewController = require('../controllers/reviewController');
const { auth } = require('../auth/auth');

const router = express.Router();

// Destination routes
router.get('/destinations', destinationController.getAllDestinations);
router.post('/destinations', auth, destinationController.createDestination);
router.put('/destinations/:id', auth, destinationController.updateDestination);
router.delete('/destinations/:id', auth, destinationController.deleteDestination);

// Auth routes
router.post('/auth/google', userController.googleAuth);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', auth, userController.logoutUser);

// Register route
router.get('/destination/:destinationId/reviews', reviewController.getReviewsForDestination);
router.post('/destination/:destinationId/reviews', auth, reviewController.createReview);
router.put('/reviews/:reviewId', auth, reviewController.updateReview);
router.delete('/reviews/:reviewId', auth, reviewController.deleteReview);

// Protected route to get the user profile
router.get('/profile', auth, userController.getUserProfile);

module.exports = router;
