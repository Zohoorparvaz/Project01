const theNumber = require('./theNumber');
const middle = require('../middlewares/middleware');
// const getUserFromRouter = require('../routes/play');

//the function declaration to determine the response of this endpoint after each guess
function theGuessedNumber(newguessedNumber) {
  let quotes = [];
  let count = 0;
  const guessedNumber = Number(newguessedNumber); //making sure the query input is converted to number
  //in case the player enters any character which is not a number which would be NaN when ! operator applied
  function resWrongInput() {
    return `Enter all digit characters`;
  }
  if (Number.isNaN(guessedNumber)) {
    return resWrongInput();
  }

  //turning the guessed query into an array of number to compare each digit with the base number array
  let guessedArray = guessedNumber
    .toString()
    .split('')
    .map((elem) => parseInt(elem));

  const guessedNumberOfFigures = guessedArray.length;
  const numOfFigures = theNumber.getNumberOfFigures();

  //in case the user guess has different digit numbers as supposed to
  function resWrongNumOfDigits() {
    return `That is not a ${numOfFigures} digit number. You entered a ${guessedNumberOfFigures} digit number. Try again!`;
  }
  if (guessedNumberOfFigures !== numOfFigures) {
    return resWrongNumOfDigits();
  } else {
    theNumber.tries++;
    let baseNumber = theNumber.getNumber();
    for (let i = 0; i < numOfFigures; i++) {
      if (guessedArray[i] !== baseNumber[i]) {
        for (let j = 0; j < numOfFigures; j++) {
          if (guessedArray[i] === baseNumber[j]) {
            quotes[i] = `Digit number ${i + 1} (${
              guessedArray[i]
            }) is in the array but in the wrong position`;
          }
        }
        if (!quotes[i]) {
          quotes[i] = `That number ${guessedArray[i]} is not in the array`;
        }
      } else {
        count++;
        quotes[i] = `Digit number ${i + 1} (${
          guessedArray[i]
        }) is in correct position`;
      }
    }
  }

  if (count === numOfFigures) {
    quotes = `YOU WON!!!`;
    // quotes[1] = `Number of attempts: ${theNumber.tries}`;
    // theNumber.tries = 0;
  }

  console.log(theNumber.tries);
  return quotes;
}

module.exports = {
  theGuessedNumber,
};
