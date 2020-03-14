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

  newTask.save().then(task => res.status(200).json(task));
});

// update

router.post('/update/:id', (req, res) => {
  console.log('höööööööör');
  Task.findById(req.params.id, (err, task) => {
    if (!task) {
      res.status(400).send('No matching data was found: ', err);
    } else 
      task.title = req.body.title;
      task.step = req.body.step;
      task.description = req.body.description;
    
      task.save().then(task => {
        res.json('Task updated')
        
      })
    
  });
})

module.exports = router;
