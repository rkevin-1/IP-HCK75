const express = require('express');
const destinationController = require('../controllers/destinationController');
const { auth } = require('../helpers/auth');

const router = express.Router();

router.get('/', destinationController.getAllDestinations);
router.post('/', auth, destinationController.createDestination);
router.put('/:id', auth, destinationController.updateDestination);
router.delete('/:id', auth, destinationController.deleteDestination);

module.exports = router;
