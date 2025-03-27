import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const handleLike = async () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    addLike(blog.id, blogObject)
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  const blogStyle = {
    padding: 5,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <h3>{blog.title} by {blog.author}</h3>
      {!blogVisible && (
        <button onClick={() => setBlogVisible(true)}>view</button>
      )}
      {blogVisible && (
        <div>
          <div>{blog.url}</div>
          <div>
            <span data-testid='like-count'>likes {blog.likes}</span>
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user ? blog.user.name : 'Unknown User'}</div>
          <button onClick={() => setBlogVisible(false)}>hide</button>
          {blog.user && blog.user.username === user.username && (
            <button
              onClick={handleRemoveBlog}
              style={{
                backgroundColor: 'red',
                color: 'white',
              }}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )}

export default Blog