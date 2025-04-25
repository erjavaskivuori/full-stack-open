import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showNotification } from '../reducers/notificationReducer'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const handleLike = async () => {
    const updatedLikes = {
      likes: blog.likes + 1
    }
    const id = blog.id
    try {
      const updatedBlog = await dispatch(
        likeBlog({ id, updatedLikes })
      ).unwrap()
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
    <div data-testid='blog-container' className='pt-4'>
      {blog && (
        <div>
          <h3 className='text-2xl py-2'>
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
                className='text-blue-700 underline py-2'
              >
                {blog.url}
              </a>
            </div>
            <div className='py-2'>
              <button
                type='button'
                className='text-green-600 border border-green-600 hover:bg-green-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center'
              >
                <svg
                  onClick={handleLike}
                  className='w-4 h-4'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 18 18'
                >
                  <path d='M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z' />
                </svg>
                <span className='sr-only'>Add like</span>
              </button>
              <span data-testid='like-count' className='pl-3'>
                Likes: {blog.likes}
              </span>
            </div>
            <div className='py-2'>Added by {blog.user.name}</div>
            {blog.user.username === user.username && (
              <button
                onClick={handleRemoveBlog}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mb-2'
              >
                remove
              </button>
            )}
          </div>
          <h3 className='py-2 text-xl'>Comments</h3>
          <CommentForm id={blog.id} />
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment._id}>
                <div className='w-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm my-2'>
                  {comment.text}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Blog
