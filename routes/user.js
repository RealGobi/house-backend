const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('config');
const jwt = require('jsonwebtoken');


// user Model
const User = require('../models/user-model');

// @route   POST User
// @desc    reg now user
// @access  All

router.post('/', (req, res) => {
  // get data from front end
  const { name, email, password, street } = req.body;
  // validation
  if(!name || !email || !password || !street){
    res.status(400).json({msg:'Fyll i Namn, Email, Lösenord och gatunamn '});
  }

  // check for user
  User.findOne({ email })
  .then(user => {
    if(user) return res.status(400).json({msg:'Användare med den email finns redan.'})
  });
  const newUser = User({
     _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password,
    street
    });

  // Hash, salt

bcrypt.genSalt(10, (err, salt)=> {
  bcrypt.hash(newUser.password, salt, (err, hash)=> {
    if(err) throw err;
    newUser.password = hash;
    newUser.save()
    .then(user => {
      // jsonwebtoken
      jwt.sign(
        { _id:user.id },
        config.get('jwt_key'),
        { expiresIn: 3600 }, 
        (err, token)=> {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email:user.email,
              street: user.street
            }
          })
        }
      )
    })
  })
})
});

module.exports = router;
