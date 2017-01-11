const mongoose = require('mongoose');

const landmarkSchema = new mongoose.Schema({
  'address': {type: String, trim: true},
  'postcode': {type: String, trim: true},
  'buildDate': {type: String, trim: true},
  'listed': {type: String, trim: true},
  'publicaccess': {type: String, trim: true},
  'nearestTube': {type: String, trim: true},
  'website': {type: String, trim: true},
  'image': {type: String, trim: true},
  'name': { type: String, trim: true, required: true},
  'description': {type: String, trim: true},
  'lat': {type: String, trim: true},
  'lng': {type: String, trim: true}
}, {
  timestamps: true
});

module.exports = mongoose.model('Landmark', landmarkSchema);
