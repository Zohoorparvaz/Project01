const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  dateSignedUp: {
    type: Date,
    require: true,
    default: Date.now,
  },
  lastPlayed: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project1.V1.3', userSchema);
