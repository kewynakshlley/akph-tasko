const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const mockUserId = new mongoose.Types.ObjectId();
const mockUser = {
  _id: mockUserId,
  name: 'raze',
  email: 'razevalorant@gmail.com',
  password: 'MyPass777!',
  tokens: [
    {
      token: jwt.sign({ _id: mockUserId }, 'mycourse'),
    },
  ],
};

const mockUserIdTwo = new mongoose.Types.ObjectId();
const mockUserTwo = {
  _id: mockUserIdTwo,
  name: 'Reyna',
  email: 'reynavalorant@gmail.com',
  password: 'MyPass777!',
  tokens: [
    {
      token: jwt.sign({ _id: mockUserId }, 'mycourse'),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'My task',
  completed: false,
  owner: mockUser._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'My second task',
  completed: false,
  owner: mockUser._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'My third task',
  completed: true,
  owner: mockUserTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(mockUser).save();
  await new User(mockUserTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  mockUserId,
  mockUser,
  setupDatabase,
};
