const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, blog) => accumulator + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const favorite = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current;
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorCounts = _.countBy(blogs, 'author');
  const authorWithMostBlogs = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author]);

  return {
    author: authorWithMostBlogs,
    blogs: authorCounts[authorWithMostBlogs]
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorLikes = _(blogs)
    .groupBy('author')
    .map((authorBlogs, author) => ({
      author: author,
      likes: _.sumBy(authorBlogs, 'likes')
    }))
    .maxBy('likes');

  return authorLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};