const express = require('express');
const destinationController = require('../controllers/destinationController');
const userController = require('../controllers/userController');
const { auth } = require('../helpers/auth');

const router = express.Router();

// Destination routes
router.get('/destinations', destinationController.getAllDestinations);
router.post('/destinations', auth, destinationController.createDestination);
router.put('/destinations/:id', auth, destinationController.updateDestination);
router.delete('/destinations/:id', auth, destinationController.deleteDestination);

// Auth routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', auth, userController.logoutUser);

// Protected route to get the user profile
router.get('/profile', auth, userController.getUserProfile);

module.exports = router;
