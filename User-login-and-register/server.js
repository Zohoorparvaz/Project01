if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
let ejs = require('ejs');

const app = express();

//connec and configure Mongoose
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('MongoDB IS AVAILABLE'));

//MongooseSchema Database on MongoDB
const usersDb = require('./db/db');

// middlewares;
const middle = require('./middlewares/middlewares');

//Passport configuration
require('./passport-config')(passport);

//EJS requirements
app.set('view engine', 'ejs');

//Express Body Parser
app.use(express.urlencoded({ extended: false }));

//Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//Middlewares for Passport
app.use(passport.initialize());
app.use(passport.session());

//Connecting Flash
app.use(flash());

//Overriding DELETE by POST on forms
app.use(methodOverride('_method'));

// Global variables as middlewares
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Handlers;
app.get('/', middle.checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name });
});

app.get('/login', middle.checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

app.get('/register', middle.checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
});

app.post(
  '/login',
  middle.checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

app.post('/register', middle.checkNotAuthenticated, async (req, res) => {
  try {
    if (req.body.password !== req.body.password2) {
      console.log('Passwords not match');
      res.redirect('/register');
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user = await new usersDb({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        score: req.body.score,
        dateSignedUp: req.body.dateSignedUp,
        lastPlayed: req.body.lastPlayed,
      });
      user.save(function (err, user) {
        if (err) return console.error(err);
        console.log(`user ${user.name} registered successfully`);
      });
      res.redirect('/login');
    }
  } catch {
    res.redirect('/register');
  }
});

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

const PORT = process.env.PORT || 8181;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
