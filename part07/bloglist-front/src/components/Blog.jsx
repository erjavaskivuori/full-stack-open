import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLike = async () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    const id = blog.id
    try {
      const updatedBlog = await dispatch(likeBlog({ id, blogObject })).unwrap()
      dispatch(showNotification(`A like added to the blog ${updatedBlog.title}`, 'success'))
    } catch (exception) {
      dispatch(showNotification('Error occured while adding a like to the blog', 'error'))
    }
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const id = blog.id
      try {
        await dispatch(deleteBlog(id)).unwrap()
        dispatch(showNotification('Blog deleted successfully', 'success'))
      } catch (exception) {
        dispatch(showNotification('Error occured while deleting the blog', 'error'))
      }
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
    <div data-testid='blog-container' style={blogStyle}>
      <h3>
        {blog.title} by {blog.author}
      </h3>
      {!blogVisible && <button onClick={() => setBlogVisible(true)}>view</button>}
      {blogVisible && (
        <div>
          <div>{blog.url}</div>
          <div>
            <span data-testid='like-count'>likes {blog.likes}</span>
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={() => setBlogVisible(false)}>hide</button>
          {blog.user.username === user.username && (
            <button
              onClick={handleRemoveBlog}
              style={{
                backgroundColor: 'red',
                color: 'white'
              }}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
