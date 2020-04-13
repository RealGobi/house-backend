const express = require('express');
const bodyPaser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyPaser.json());

// Connect to Mongo

mongoose
.connect('mongodb+srv://jimmy:' + process.env.db_pass + '@house-app-db-g49yq.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.use('/task', require('./routes/task'));

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});