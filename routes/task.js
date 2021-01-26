const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

// Task Model
const Task = require('../models/task-model');
const userModel = require('../models/user-model');

// @route   GET task
// @desc    Get All task
// @access  private

router.get('/', (req, res) => {
  Task.find()
  .then(task => res.json(task));
});

// @route   GET task
// @desc    Get One task
// @access  private

router.get('/:id' ,auth , (req, res) => {
  Task.findById(req.params.id)
  .then(task => res.json(task));
});

// @route   POST /Task
// @desc    Create An Task
// @access  private
router.post('/add' ,auth , (req, res) => {
  const newTask = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    addedBy: req.body.userId,
    createdAt: new Date
  });

  newTask.save().then(task => res.status(200).json(task))
  .catch(err => console.log('Error in request', err)
  )
});

// update

router.post('/update/:id' ,auth , (req, res) => {
  Task.findById(req.params.id, (err, task) => {
    if (!task) {
      res.status(400).send('No matching data was found: ', err);
    } else 
      task.title = req.body.title;
      task.description = req.body.description;
    
      task.save().then(task => {
        res.json('Task updated')
        
      })
    
  });
})

// @route   Delete task
// @desc    Delete One task
// @access  private

router.delete('/delete/:id' ,auth , (req, res) => {
  Task.findById(req.params.id)
  .then(task => task.remove(() => res.json({success: true})))
  .catch(err=> res.status(404).json({success: false}))
});


module.exports = router;
