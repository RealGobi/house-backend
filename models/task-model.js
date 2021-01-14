const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
/*     step: { type: String, required: true }, */ 
   description: { type: String, required: true },
   reg_date: { type: Date, default:Date.now }
});

module.exports = mongoose.model('Task', taskSchema);