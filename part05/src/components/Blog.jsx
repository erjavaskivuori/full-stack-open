import { useState } from 'react'

const Blog = ({ blog, addLike }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

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
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user ? blog.user.name : 'Unknown User'}</div>
        <button onClick={() => setBlogVisible(false)}>hide</button>
      </div>
    </div>
)}

export default Blog