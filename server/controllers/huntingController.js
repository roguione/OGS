// controllers/huntingControllers.js

// Import the Hunting and Photo models
const Hunting = require('../models/Hunting');
const Photo = require('../models/photo.js');

// function to get all hunting entries
async function getAllHuntingEntries(req, res) {
  try {
    // Retrieve all hunting entries from the database using the Hunting model
    const huntingEntries = await Hunting.find();

    // Render Hunting Entry from views.ejs temp adn pass data to it
    res.render('huntingEntries', {huntingEntries }); // create a huntingEntries.ejs in /views
  } catch (error) {
    // Handle any errors and send an error response if necessary
    console.error('Error fetching hunting entries:', error);
    res.status(500).render({ error: 'Internal Server Error' }); // create error.ejs in /views
  }
}

// function to get a single hunting entry by ID
async function getHuntingEntry(req, res) {
  try {
    const huntingEntry = await Hunting.findById(req.params.id);

    if (!huntingEntry) {
      return res.status(404).render({ error: 'Hunting entry not found' });
    }

    res.render('hunting/view',  { entry: huntingEntry });
  } catch (error) {
    console.error('Error fetching hunting entry by ID:', error);
    res.status(500).render({ error: 'Internal Server Error' });
  }
}

// function to create a new hunting entry
async function createHuntingEntry(req, res) {
  try {
    await Hunting.create(req.body);
    res.redirect('/status');
  } catch (error) {
    console.error('Error creating hunting entry:', error);
    res.status(500).render('status/error', { error: 'Internal Server Error' });
  }
}

// function to update an existing hunting entry
async function updateHuntingEntry(req, res) {
  try {
    await Hunting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.render('status/updateSuccess');
  } catch (error) {
    console.error('Error updating hunting entry:', error);
    res.status(500).render('status/error', { error: 'Internal Server Error' });
  }
}

// function to delete a hunting entry by ID
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
  deleteHuntingEntry,
};
