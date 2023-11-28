const express = require('express');
const router = express.Router();
const huntingController = require('../controllers/huntingController');

// Create a new hunting entry (POST)
router.post('/hunting/create', huntingController.createHuntingEntry);

// Delete a hunting entry by ID (DELETE)
router.delete('/:id', huntingController.deleteHuntingEntry);

// Edit a hunting entry by ID (Edit Entry, GET)
router.get('/:id/edit', huntingController.editHuntingEntry);

// Update a hunting entry by ID (Update Entry, PUT)
router.put('/:id', huntingController.updateHuntingEntry);

// Get a specific hunting entry by ID (GET)
router.get('/:id', huntingController.getHuntingEntry);

// Get all hunting entries (View Entries, GET)
router.get('/', huntingController.getAllHuntingEntries);

module.exports = router;
