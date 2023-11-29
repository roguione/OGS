const express = require('express');
const router = express.Router();

// Import the status controller
const statusController = require('../controllers/statusController');

// Define a route for the success page
router.get('/success', statusController.showSuccessPage);

module.exports = router;
