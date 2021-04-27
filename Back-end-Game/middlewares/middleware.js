const signIn = require('../model/signin');

//finding a user by name and password
async function getUser(req, res, next) {
  try {
    user = await signIn.findOne({ name: req.body.name });

    if (!user || req.body.password !== user.password) {
      return res.status(401).json({
        message:
          'Invalid username or password! Try again or go to http://localhost:3000/user and pass your name and password to create a new user',
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  req.user = user;
  next();
}

async function setUser(req, res, next) {
  try {
    user = await signIn.findOne({ name: req.params.name });
    if (user) {
      return res.status(405).json({
        message: `User already exist. Try a different name.`,
      });
    } else if (!user) {
      if (req.params.name === req.body.name) {
        user = new signIn({
          name: req.body.name,
          password: req.body.password,
          score: req.body.score,
          dateSignedUp: req.body.dateSignedUp,
          lastPlayed: req.body.lastPlayed,
        });
        newUser = await user.save();
        return res.status(201).json({
          message: `New User ${newUser.name} created.
          You can proceed to play. Go to http://localhost:3000/play`,
        });
      } else {
        return res.status(400).json({
          message: `Name contradiction. Name in the url (${req.params.name}) should be the same as the name in the body (${req.body.name}).`,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  req.user = user;
  next();
}

module.exports = {
  getUser,
  setUser,
};
