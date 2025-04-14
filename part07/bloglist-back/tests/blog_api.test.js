const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const getToken = async () => {
  await helper.createOneUser()

  const user = {
    username: 'testuser',
    password: 'test_password'
  }

  const response = await api.post('/api/login').send(user)
  return response.body.token
}

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 6)
  })

  test('returned blogs have id field', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      assert.ok(blog.id)
      assert.strictEqual(blog._id, undefined)
    })
  })
  describe('adding a new blog', () => {
    test('succeeds if the blog is in correct format', async () => {
      const newBlog = {
        title: 'New blog',
        author: 'Test Author',
        url: 'test.com',
        likes: 10
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${await getToken()}`)
        .send(newBlog)

      const response = await api.get('/api/blogs')

      const titles = response.body.map((r) => r.title)
      const authors = response.body.map((r) => r.author)
      const urls = response.body.map((r) => r.url)

      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

      assert(titles.includes('New blog'))
      assert(authors.includes('Test Author'))
      assert(urls.includes('test.com'))
    })

    test('likes defaults to 0 if no value is given', async () => {
      const newBlog = {
        title: 'New blog',
        author: 'Test Author',
        url: 'test.com'
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${await getToken()}`)
        .send(newBlog)
        .expect(201)

      const savedBlog = response.body
      assert.strictEqual(savedBlog.likes, 0)
    })

    test('fails if there is no token', async () => {
      const newBlog = {
        title: 'New blog',
        author: 'Test Author',
        url: 'test.com',
        likes: 10
      }

      await api.post('/api/blogs').set('Authorization', 'Bearer ').send(newBlog).expect(401)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('fails if there is no title', async () => {
      const newBlog = {
        title: '',
        author: 'Test Author',
        url: 'test.com',
        likes: 10
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${await getToken()}`)
        .send(newBlog)
        .expect(400)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('fails if there is no url', async () => {
      const newBlog = {
        title: 'Test Title',
        author: 'Test Author',
        url: '',
        likes: 10
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${await getToken()}`)
        .send(newBlog)
        .expect(400)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })
  describe('deleting a blog', async () => {
    test('succees with status code 204 if id is valid', async () => {
      const newBlog = {
        title: 'New blog',
        author: 'Test Author',
        url: 'test.com',
        likes: 10
      }

      const token = await getToken()

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)

      const blogToDelete = response.body
      const blogsAtStart = await helper.blogsInDb()

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

      const titles = blogsAtEnd.map((b) => b.title)
      assert(!titles.includes(blogToDelete.title))
    })
    test('fails with status code 400 if id is not valid', async () => {
      await api
        .delete('/api/blogs/3')
        .set('Authorization', `Bearer ${await getToken()}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })
  describe('updating a blog', async () => {
    test('succees with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const newLikes = blogToUpdate.likes + 1

      await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: newLikes }).expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd[0]

      assert.strictEqual(updatedBlog.likes, newLikes)
    })
    test('fails with status 400 if id is not valid', async () => {
      await api.put('/api/blogs/3').send({ likes: 4 }).expect(400)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
