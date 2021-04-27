//dotenv
require('dotenv').config();

// const theNumber = require('./model/theNumber');
// const theGuessedNumber = require('./model/theGuessedNumber');

//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Mongoose config and conn
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('DATABASE "Project1.V.1.0.3" IS CONNECTED'));

//express JSON middleware
app.use(express.json());

//homepage
app.get('/', (req, res) => {
  res.status(201).json({
    message: `FIND THE NUMBER
    START ----> http://localhost:3000/start`,
  });
});

//Routes
const startRouter = require('./routes/start');
app.use('/start', startRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const playRouter = require('./routes/play');
app.use('/play', playRouter);

const guessRouter = require('./routes/guess');
app.use('/guess', guessRouter);

const port = 3000;
app.listen(port, () => console.log('GAME IS ON!'));
