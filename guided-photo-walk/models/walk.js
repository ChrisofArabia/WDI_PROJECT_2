const mongoose = require('mongoose');

const walkSchema = new mongoose.Schema({
  'walkName': {type: String, trim: true},
  'origin': {type: Array, required: true},
  'wayPoints': {type: String, trim: true},
  'destination': {type: Array, required: true},
  'description': {type: String, trim: true}
}, {
  timestamps: true
});

module.exports = mongoose.model('Walk', walkSchema);
