const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');

// Task Model
const Task = require('../models/task-model');

// @route   GET task
// @desc    Get All task
// @access  All

router.get('/', (req, res) => {
  Task.find()
  .then(task => res.json(task));
});

module.exports = router;
