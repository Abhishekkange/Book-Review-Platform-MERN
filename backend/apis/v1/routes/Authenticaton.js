const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const key = "shaharukkKhan";

router.post('/register', async (req, res) => {

  //get the user details
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log(existingUser);
    res.json({ "message": "User already exists" });
  }
  else {

    bcrypt.hash(password, salt, async (err, hash) => {

      const newUser = new User({

        "username": username,
        "email": email,
        "password": hash

      });

      await newUser.save().then(() => {

        res.json({ "message": "Registered Successfully" });


      }).catch(err => {

        res.json({ "message": "failed to register" });

      });

    });
  }

});


router.post('/login', async (req, res) => {

  //get user details for login
  const email = req.body.email;
  const password = req.body.password;

  //check if user is present or not 
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log(userExists);

      // Correct order: plaintext password first, then hashed password
      const isMatch =  bcrypt.compare(password, userExists.password);

      if (isMatch) {
        const userDetails = {
          id: userExists._id,
          email: userExists.email,
          username: userExists.username
        };

        // Generate JWT token
        const jwtToken = jwt.sign(userDetails, key);
        return res.json({ message: jwtToken,type: 'JWT' });
      } else {
        return res.json({ message: 'Invalid login credentials',type: 'error' });
      }
    } else {
      return res.json({ message: 'Invalid login credentials',type: 'error' });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: 'An error occurred during login',type: 'error' });
  }

});

router.get('/verifyJwtToken/:token', (req, res) => {
  const jwtToken = req.params.token;

  jwt.verify(jwtToken, key, (err, decoded) => {
    if (err) {

      return res.status(401).json({ message: err.message });
    }

    res.json({ message: decoded });
  });
});

module.exports = router;