const bcrypt = require('bcrypt');
const User = require('../models/user');
const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);


describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  describe('creation of user', () => {

    test('succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'testname',
        name: 'Test User',
        password: 'secretysecret',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

      const usernames = usersAtEnd.map(u => u.username);
      assert(usernames.includes(newUser.username));
    });

    test('fails with status 400 and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert(result.body.error.includes('expected `username` to be unique'));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test('fails with status 400 and message if username not at least 3 characters', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'te',
        name: 'Test User',
        password: 'secret',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert(result.body.error.includes('User validation failed: username: has to be at least 3 characters'));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
    test('fails with status 400 and message if password not at least 3 characters', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'test_user',
        name: 'Test User',
        password: 'se',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert(result.body.error.includes('password has to be at least 3 chracters'));

      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});