const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const User = require('../src/models/user');
const mongoose = require('mongoose');
const { mockUser, mockUserId, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Joe',
      email: 'joethelast@gmail.com',
      password: 'MyPass777!',
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    user: {
      name: 'Joe',
      email: 'joethelast@gmail.com',
    },
    token: user.tokens[0].token,
  });
});

test('Should login a new user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: mockUser.email,
      password: mockUser.password,
    })
    .expect(200);

  const loggedUser = await User.findById(mockUserId);
  expect(response.body.token).toBe(loggedUser.tokens[1].token);
});

test('User login should fail', async () => {
  await request(app)
    .post('/users/login')
    .send({ email: mockUser.email, password: 'wrongPass' })
    .expect(400);
});

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not retrieve account for unauthorized user', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(mockUser);
  expect(user).toBeNull();
});

test('Should not delete account for unauthorized user', async () => {
  await request(app).delete('/users/me').send().expect(401);
});

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/meaning.jpg')
    .expect(200);

  const user = await User.findById(mockUserId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
    .send({
      name: 'kewyn',
    })
    .expect(200);

  const user = await User.findById(mockUserId);
  expect(user.name).toEqual('kewyn');
});

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
    .send({
      location: 'Submundo',
    })
    .expect(400);
});
