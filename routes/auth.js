const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('config');
const jwt = require('jsonwebtoken');
 const auth = require('../middleware/auth');

const User = require('../models/user-model');

// @route   Post auth
// @desc    auth user
// @access  All

router.post('/', (req, res) => {
  // get data from front end
  const { email, password } = req.body;
  // validation
  if(!email || !password){
    res.status(400).json({msg:'Fyll i Email och Lösenord'});
  }

  // check for user
  User.findOne({ email })
  .then(user => {
    if(!user) return res.status(400).json({msg:'Användare finns ej.'})

  //validate
  bcrypt.compare(password, user.password)
  .then(isMatch =>{
    if(!isMatch) return res.status(400).json({msg: 'Inloggning misslyckades'});
    jwt.sign(
      { id:user._id },
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
});
});

// @route   GET auth/user
// @desc    get user data
// @access  private

router.get('/user',auth, (req,res) => {
  User.findById(req.user._id)
  .select('-password')
  .then(user => res.status(200).json(user));
});

module.exports = router;
