const express = require('express');
const destinationController = require('../controllers/destinationController');

const router = express.Router();

router.get('/', destinationController.getAllDestinations);
router.post('/', destinationController.createDestination);
router.put('/:id', destinationController.updateDestination);
router.delete('/:id', destinationController.deleteDestination);

module.exports = router;
