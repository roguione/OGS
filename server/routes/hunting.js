// server/routes/hunting.js
const express = require('express');
const router = express.Router();
const huntingController = require('../controllers/huntingController');

// Create a new hunting entry
router.post('/', huntingController.createHuntingEntry);

// Delete a hunting entry by ID
router.delete('/:id', huntingController.deleteHuntingEntry);

// Edit a hunting entry (Edit Entry)
router.get('/:id/edit', huntingController.editHuntingEntry);

// Update a hunting entry by ID (Update Entry)
router.put('/:id', huntingController.updateHuntingEntry);

// Get a specific hunting entry by ID
router.get('/:id', huntingController.getHuntingEntry);

// Get all hunting entries (View Entries)
router.get('/', huntingController.getAllHuntingEntries);

module.exports = router;


