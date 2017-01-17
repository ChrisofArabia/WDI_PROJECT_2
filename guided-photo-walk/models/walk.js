const mongoose = require('mongoose');

const walkSchema = new mongoose.Schema({
  walkName: { type: String, trim: true },
  origin: { type: String, trim: true },
  destination: { type: String, required: true },
  wayPoints: { type: Array, required: true },
  description: { type: String, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Walk', walkSchema);
