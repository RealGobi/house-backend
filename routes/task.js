const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Task Model
const Task = require('../models/task-model');

// @route   GET task
// @desc    Get All task
// @access  All

router.get('/', (req, res) => {
  Task.find()
  .then(task => res.json(task));
});

// @route   GET task
// @desc    Get One task
// @access  All

router.get('/:id', (req, res) => {
  Task.findById(req.params.id)
  .then(task => res.json(task));
});

// @route   POST /Task
// @desc    Create An Task
// @access  All

router.post('/add', (req, res) => {
  const newTask = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    step: req.body.step,
    description: req.body.description,
  });

  newTask.save().then(task => res.json(task));
});

module.exports = router;
