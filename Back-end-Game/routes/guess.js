const express = require('express');
const router = express.Router();
const theGuessedNumber = require('../model/theGuessedNumber');
const theNumber = require('../model/theNumber');
const middle = require('../middlewares/middleware');
const signIn = require('../model/signin');

router.get('/:guess', middle.getUser, async (req, res) => {
  let guessedNumber = req.params.guess;
  const quote = theGuessedNumber.theGuessedNumber(guessedNumber);
  if (quote === `YOU WON!!!`) {
    user.score = user.score + 1;
    updatedUser = await user.save();
  }
  await res.json({ message: quote, 'Number of attempts': theNumber.tries });
});

module.exports = router;
