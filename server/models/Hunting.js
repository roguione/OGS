/* models/Hunting.js */
const mongoose = require('mongoose');

const huntingSchema = new mongoose.Schema({
  locationName: String,
  loadOut: String,
  date: Date,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model('Hunting', huntingSchema);
