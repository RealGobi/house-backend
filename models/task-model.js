const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
/*     step: { type: String, required: true }, */ 
   description: { type: String, required: true },
   addedBy: { type: String, required: true },
   photo: {type: String},
   createdAt: { type: Date }
});

module.exports = mongoose.model('Task', taskSchema);