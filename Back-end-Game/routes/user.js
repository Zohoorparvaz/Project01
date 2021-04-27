const express = require('express');
const router = express.Router();
const signIn = require('../model/signin');
const middle = require('../middlewares/middleware');
let user = [];
let messageToDisplay = '';
let newUser = [];

router.get('/', (req, res) => {
  try {
    return res.status(200).json({
      message: `Please sign up by posting your info.
      Post your name and password in a JSON body in below link. put your name (same as name in body) instead of XXX.
      http://localhost:3000/user/XXX`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:name', middle.setUser, async (req, res) => {
  try {
    res.status(201).json({ message: messageToDisplay });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
