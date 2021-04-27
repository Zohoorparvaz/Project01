const express = require('express');
const router = express.Router();
const theNumber = require('../model/theNumber');
const middle = require('../middlewares/middleware');

router.get('/', (req, res) => {
  res.status(201).json({
    message: `Post you name and password and the number of digits between 1 and 10.`,
  });
});

router.post('/', middle.getUser, (req, res) => {
  const numberOfFigures = req.body.digits;
  theNumber.generate(numberOfFigures);
  res.json({
    message: `user ${user.name} is logged in. Your last score is ${user.score}. guess the ${numberOfFigures} digit number! 
      You can pass your guess by entering it instead of XXX to http://localhost:3000/guess/XXX`,
    'Last Time Played': user.lastPlayed.toString(),
    'Last Score': user.score,
  });
});

module.exports = router;
