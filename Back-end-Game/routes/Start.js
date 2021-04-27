const express = require('express');
const router = express.Router();

//start page
router.get('/', (req, res) => {
  try {
    let quote = `Hello you! 
    To enter the game go to http://localhost:3000/play and enter your login information. 
    If this is your first time to play go to http://localhost:3000/user to sign up as new user`;
    res.json({ message: quote });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
