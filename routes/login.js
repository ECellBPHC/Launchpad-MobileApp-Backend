const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authenticate = require("../middleware/authentication")

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: 'No user found. Please sign up first' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, "process.env.JWT_SECRET");

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/signup', async (req, res) => {
  const { name, email, password, city, college } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({
      name,
      email,
      password,
      city,
      college,
      tickets: []
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      "process.env.JWT_SECRET",
      { expiresIn: '48h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, id: user.id });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/userDetails', authenticate, (req, res) => {
  const userId = req.user;
  // Find the user record in the database using the user ID from the token
  User.findById(userId)
    .then(user => {
      if (user) {
        // Send the user record to the client
        res.status(200).json(user);
      } else {
        // Send a not found response to the client
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(error => {
      // Send an error response to the client
      res.status(500).json({ error: error.message });
    });
});


module.exports = router;
