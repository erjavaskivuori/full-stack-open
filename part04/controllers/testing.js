const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('supersecret', 10);
  const user = new User({
    username: 'root',
    name: 'Superuser',
    passwordHash
  });
  const savedUser = await user.save();

  const initialBlog = new Blog({
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 2,
    user: savedUser._id
  });
  const savedBlog = await initialBlog.save();

  savedUser.blogs = savedUser.blogs.concat(savedBlog._id);
  await savedUser.save();

  response.status(204).end();
});

module.exports = router;
