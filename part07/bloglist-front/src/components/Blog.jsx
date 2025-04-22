import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showNotification } from '../reducers/notificationReducer'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      dispatch(
        showNotification(
          `A like added to the blog ${updatedBlog.title}`,
          'success'
        )
      )
    } catch (exception) {
      dispatch(
        showNotification(
          'Error occured while adding a like to the blog',
          'error'
        )
      )
    }
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const id = blog.id
      try {
        await dispatch(deleteBlog(id)).unwrap()
        dispatch(showNotification('Blog deleted successfully', 'success'))
        navigate('/')
      } catch (exception) {
        dispatch(
          showNotification('Error occured while deleting the blog', 'error')
        )
      }
    }
  }

  return (
    <div data-testid='blog-container'>
      {blog && (
        <div>
          <h3>
            {blog.title} by {blog.author}
          </h3>
          <div>
            <div>
              <a
                href={
                  blog.url.startsWith('http') ? blog.url : `https://${blog.url}`
                }
                target='_blank'
                rel='noopener noreferrer'
              >
                {blog.url}
              </a>
            </div>
            <div>
              <span data-testid='like-count'>Likes: {blog.likes}</span>
              <button onClick={handleLike}>like</button>
            </div>
            <div>Added by {blog.user.name}</div>
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
        </div>
      )}
    </div>
  )
}

export default Blog
