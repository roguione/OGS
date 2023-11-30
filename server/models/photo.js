// models/photo.ejs
const mongoose = require('mongoose');

const huntingSchema = new mongoose.Schema({
  locationName: String,
  loadOut: String,
  date: Date,
  latitude: Number,
  longitude: Number,
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }], 
});

module.exports = mongoose.model('Hunting', huntingSchema);
