const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const Blog = require('../models/blog');
const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there is correct number of blogs', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, 6);
});

test('returned blogs have id field', async () => {
  const response = await api.get('/api/blogs');
  response.body.forEach(blog => {
    assert.ok(blog.id);
    assert.strictEqual(blog._id, undefined);
  });
});

test('a blog can be added', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'Test Author',
    url: 'test.com',
    likes: 10
  };

  await api.post('/api/blogs').send(newBlog);

  const response = await api.get('/api/blogs');

  const titles = response.body.map(r => r.title);
  const authors = response.body.map(r => r.author);
  const urls = response.body.map(r => r.url);

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);

  assert(titles.includes('New blog'));
  assert(authors.includes('Test Author'));
  assert(urls.includes('test.com'))
})

test('likes defaults to 0 if no value is given', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'Test Author',
    url: 'test.com'
  };

  const response = await api.post('/api/blogs').send(newBlog).expect(201);

  const savedBlog = response.body;
  assert.strictEqual(savedBlog.likes, 0);
});

after(async () => {
  await mongoose.connection.close()
});