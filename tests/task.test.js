const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app');
const { mockUser, mockUserId, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
    .send({
      description: 'From my test',
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test('Should request all tasks for mock user', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${mockUser.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toBe(2);
});
