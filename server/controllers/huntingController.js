// Import required models
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
    res.status(500).render('error', { errorCode: 500 });
  }
}

// Function to get a single hunting entry by ID
async function getHuntingEntry(req, res) {
  try {
    const huntingEntry = await Hunting.findById(req.params.id);

    if (!huntingEntry) {
      return res.status(404).render('error', { errorCode: 404 });
    }

    // Render the 'hunting/view.ejs' template and pass data to it
    res.render('hunting/view', { entry: huntingEntry });
  } catch (error) {
    console.error('Error fetching hunting entry by ID:', error);
    res.status(500).render('error', { errorCode: 500 });
  }
}

// Function to render the create form
function renderCreateForm(req, res) {
  // Render the create form when the request method is GET
  res.render('hunting/create');
}

// Function to create a new hunting entry
async function createHuntingEntry(req, res) {
  // Create a new hunting entry when the request method is POST
  try {
    await Hunting.create(req.body);
    res.redirect('/status/updateSuccess');
  } catch (error) {
    console.error('Error creating hunting entry:', error);
    res.status(500).render('status/error', {
      errorCode: 500, 
      errorMessage: 'Internal Server Error', 
    });
  }
}

// Function to update an existing hunting entry
async function updateHuntingEntry(req, res) {
  try {
    // Update the hunting entry by ID with the data from the request body
    await Hunting.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Render the 'status/updateSuccess.ejs' template for a successful update
    res.render('status/updateSuccess');
  } catch (error) {
    console.error('Error updating hunting entry:', error);

    // Render the 'status/error.ejs' template with error details
    res.status(500).render('status/error', { errorCode: 500 });
  }
}

// Function to edit an existing hunting entry
async function editHuntingEntry(req, res) {
  try {
    const huntingEntry = await Hunting.findById(req.params.id);

    if (!huntingEntry) {
      return res.status(404).render('status/error', { errorCode: 404 });
    }

    // Render the 'hunting/edit.ejs' template and pass data to it
    res.render('hunting/edit', { entry: huntingEntry });
  } catch (error) {
    console.error('Error fetching hunting entry for editing:', error);

    // Render the 'status/error.ejs' template with error details
    res.status(500).render('status/error', { errorCode: 500 });
  }
}

// Function to delete a hunting entry by ID
async function deleteHuntingEntry(req, res) {
  try {
    // Delete the hunting entry by ID
    await Hunting.findByIdAndDelete(req.params.id);

    // Render the 'status/deleteSuccess.ejs' template for a successful deletion
    res.render('status/deleteSuccess');
  } catch (error) {
    console.error('Error deleting hunting entry:', error);

    // Render the 'status/error.ejs' template with error details
    res.status(500).render('status/error', { errorCode: 500 });
  }
}

module.exports = {
  getAllHuntingEntries,
  getHuntingEntry,
  renderCreateForm,
  createHuntingEntry,
  updateHuntingEntry,
  editHuntingEntry,
  deleteHuntingEntry,
};
