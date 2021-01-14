const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Task Model
const User = require('../models/user-model');

// @route   GET User
// @desc    reg now user
// @access  All

router.post('/', (req, res) => {
  // get data from front end
  const { name, email, password } = req.body;
  // validation
  if(!name || !email || !password){
    res.status(400).json({msg:'Fyll i Namn, Email och Lösenord'});
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
    password
    });

  // Hash, salt

bcrypt.genSalt(10, (err, salt)=> {
  bcrypt.hash(newUser.password, salt, (err, hash)=> {
    if(err) throw err;
    newUser.password = hash;
    newUser.save()
    .then(user => {
      res.json({
        user: {
          _id: user.id,
          name: user.name,
          email:user.email
        }
      })
    })
  })
})
});

module.exports = router;
