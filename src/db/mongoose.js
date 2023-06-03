const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost:27017/task-manager-db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
