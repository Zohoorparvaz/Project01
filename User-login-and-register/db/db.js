const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  password2: {
    type: String,
    required: false,
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
    default: '',
  },
});

const users = mongoose.model('Project1 V2.0', userSchema);
module.exports = users;
