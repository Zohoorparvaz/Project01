//Declaring a global variable for converting the number to a string of its number digits
let theNumberStringified = [];
//Declaring a global variable for the original number of digits that our base number should have to start the game
let numberOfFigures = 0;
let tries = 0;
//Declaring a function to get random numbers between 0-9 for each digit of the base random number of the game
function getRandomArray() {
  let baseArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let randomKey = Math.floor(Math.random() * baseArray.length);
  let randomDigit = baseArray[randomKey];
  return randomDigit;
}

//Since the first digit can not be zero, the similar function would obtain the first digit
function getRandomFirstDigit() {
  let firstDigitArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let randomIndex = Math.floor(Math.random() * firstDigitArray.length);
  let randomFirstDigit = firstDigitArray[randomIndex];
  return randomFirstDigit;
}

//Declarig a function to generate the base number based on the number of figures the player asks
function generate(newNumberOfFigures) {
  theNumberStringified = [];
  numberOfFigures = parseInt(newNumberOfFigures);
  if (numberOfFigures > 1) {
    theNumberStringified[0] = getRandomFirstDigit(); //getting random first digit
  } else if (numberOfFigures === 1) {
    theNumberStringified[0] = getRandomArray();
  } else {
    console.log('enter a number between 1 to 10');
  }
  //getting the next random digits based on the number of figures less than 10 to be all different digits
  for (i = 1; i < numberOfFigures; i++) {
    let newDigit = getRandomArray();

    for (j = 0; j < i; j++) {
      if (newDigit !== theNumberStringified[j]) {
        theNumberStringified[i] = newDigit;
      } else {
        i--;
        break;
      }
    }
  }

  console.log(theNumberStringified);
}

function setNumber(num) {
  theNumber = num;
}

//Declaring a function to return the string of the random number as the base of the game
function getNumber() {
  return theNumberStringified;
}

//Declaring a function to return the number of digits the player wants to guess based of which app generated a random number
function getNumberOfFigures() {
  return numberOfFigures;
}

module.exports = {
  generate,
  getNumber,
  getNumberOfFigures,
  setNumber,
  theNumberStringified,
  tries,
};
