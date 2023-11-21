// server/routes/hunting.js
const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const path = require('path');
const Hunting = require('../models/Hunting'); // Assuming you have a Hunting model

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: './public/images/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create a new hunting entry (POST)
router.post('/', upload.array('photos', 5), async (req, res) => {
  try {
    const { locationName, loadOut, date, latitude, longitude } = req.body;
    const photos = req.files.map((file) => `/public/images/${file.filename}`);

    const newHuntingEntry = new Hunting({
      locationName,
      loadOut,
      date,
      latitude,
      longitude,
      photos,
    });

    await newHuntingEntry.save();

    res.redirect('/'); // Redirect to the homepage or a success page
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Retrieve a list of all hunting entries (GET)
router.get('/', async (req, res) => {
  try {
    const huntingEntries = await Hunting.find();
    res.render('hunting/index', { huntingEntries });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Retrieve a specific hunting entry by ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const huntingEntry = await Hunting.findById(req.params.id);
    res.render('hunting/view', { entry: huntingEntry });
  } catch (error) {
    console.error(error);
    res.status(404).send('Hunting Entry not found');
  }
});

// Update a specific hunting entry by ID (PUT)
router.put('/:id', async (req, res) => {
  try {
    const { locationName, loadOut, date, latitude, longitude } = req.body;
    const photos = req.files.map((file) => `/public/images/${file.filename}`);

    await Hunting.findByIdAndUpdate(req.params.id, {
      locationName,
      loadOut,
      date,
      latitude,
      longitude,
      photos,
    });

    res.redirect('/'); // Redirect to the updated entry's page
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete a specific hunting entry by ID (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await Hunting.findByIdAndRemove(req.params.id);
    res.redirect('/'); // Redirect to the homepage or a success page
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
