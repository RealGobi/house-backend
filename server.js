const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to Mongo
const db = config.get('mongoURI');
mongoose
.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.use('/task', require('./routes/task'));
app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});