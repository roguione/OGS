// controllers/huntingControllers.js

// Import the Hunting and Photo models
const Hunting = require('../models/Hunting');
const Photo = require('../models/photo.js');

// Function to get all hunting entries
async function getAllHuntingEntries(req, res) {
  try {
    // Retrieve all hunting entries from the database using the Hunting model
    const huntingEntries = await Hunting.find();

    // Render the 'huntingEntries.ejs' template and pass data to it
    res.render('huntingEntries', { huntingEntries });
  } catch (error) {
    // Handle any errors and send an error response if necessary
    console.error('Error fetching hunting entries:', error);
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
}

// Function to get a single hunting entry by ID
async function getHuntingEntry(req, res) {
  try {
    const huntingEntry = await Hunting.findById(req.params.id);

    if (!huntingEntry) {
      return res.status(404).render('error', { error: 'Hunting entry not found' });
    }

    res.render('hunting/view', { entry: huntingEntry });
  } catch (error) {
    console.error('Error fetching hunting entry by ID:', error);
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
}

// Function to create a new hunting entry
async function createHuntingEntry(req, res) {
  try {
    await Hunting.create(req.body);
    res.redirect('/status');
  } catch (error) {
    console.error('Error creating hunting entry:', error);
    res.status(500).render('status/error', {
      errorCode: 500, // Add error code here
      errorMessage: 'Internal Server Error', // Add error message here
    });
  }
}

// Function to update an existing hunting entry
async function updateHuntingEntry(req, res) {
  try {
    await Hunting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.render('status/updateSuccess');
  } catch (error) {
    console.error('Error updating hunting entry:', error);
    res.status(500).render('status/error', { error: 'Internal Server Error' });
  }
}

// Function to edit an existing hunting entry
async function editHuntingEntry(req, res) {
  try {
    const huntingEntry = await Hunting.findById(req.params.id);

    if (!huntingEntry) {
      return res.status(404).render('status/error', { error: 'Hunting entry not found' });
    }

    res.render('hunting/edit', { entry: huntingEntry });
  } catch (error) {
    console.error('Error fetching hunting entry for editing:', error);
    res.status(500).render('status/error', { error: 'Internal Server Error' });
  }
}

// Function to delete a hunting entry by ID
async function deleteHuntingEntry(req, res) {
  try {
    await Hunting.findByIdAndDelete(req.params.id);
    res.render('status/deleteSuccess');
  } catch (error) {
    console.error('Error deleting hunting entry:', error);
    res.status(500).render('status/error', { error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllHuntingEntries,
  getHuntingEntry,
  createHuntingEntry,
  updateHuntingEntry,
  editHuntingEntry,
  deleteHuntingEntry,
};
