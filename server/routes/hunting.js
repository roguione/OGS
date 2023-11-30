const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const upload = multer({ dest: 'public/css/images/' });
const huntingController = require('../controllers/huntingController');

// Define a route handler for /status/updateSuccess
router.get('/updateSuccess', (req, res) => {
  res.render('status/updateSuccess'); // Render the "updateSuccess" template
});

// Create a new hunting entry form (GET)
router.get('/create', huntingController.renderCreateForm);

// Create a new hunting entry (POST)
router.post('/create', huntingController.createHuntingEntry);

// Delete a hunting entry by ID (DELETE)
router.delete('/:id', huntingController.deleteHuntingEntry);

// Edit a hunting entry by ID (Edit Entry, GET)
router.get('/:id/edit', huntingController.editHuntingEntry);

// Update a hunting entry by ID (Update Entry, PUT)
router.put('/:id', huntingController.updateHuntingEntry);

// Photo upload route (POST) - Place it here
router.post(
  "/:id/photos/single-file",
  upload.single("imageUpload"),
  huntingController.uploadPhoto 
);

// Get a specific hunting entry by ID (GET)
router.get('/:id', huntingController.getHuntingEntry);

// Get all hunting entries (View Entries, GET)
router.get('/', huntingController.getAllHuntingEntries);

router.post(
  "/:id/photos/single-file",
  upload.single("imageUpload"),
	huntingController.uploadPhoto
);

module.exports = router;
