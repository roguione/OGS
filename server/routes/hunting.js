// server/routes/hunting.js
const express = require('express');
const router = express.Router();
const huntingController = require('../controllers/huntingController');

// Get all hunting entries
router.get('/', huntingController.getAllHuntingEntries);

// Get a specific hunting entry by ID
router.get('/:id', huntingController.getHuntingEntry);

// Create a new hunting entry
router.post('/', huntingController.createHuntingEntry);

// Update a hunting entry by ID
router.put('/:id', huntingController.updateHuntingEntry);

// Delete a hunting entry by ID
router.delete('/:id', huntingController.deleteHuntingEntry);

module.exports = router;

