import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { showNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      const newBlog = await dispatch(addBlog(blogObject)).unwrap()
      blogFormRef.current.toggleVisibility()
      dispatch(
        showNotification(
          `A new blog ${newBlog.title} by ${newBlog.author} added`,
          'success'
        )
      )
    } catch (exception) {
      dispatch(
        showNotification(
          'Error occurred while creating a new blog. Did you fill all the fields?',
          'error'
        )
      )
    }

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <div>
        <h2>Create new</h2>
        <form onSubmit={handleSubmit}>
          <div className='my-2'>
            <label>
              title
              <input
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 ml-3'
              />
            </label>
          </div>
          <div className='my-2'>
            <label>
              author
              <input
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 ml-3'
              />
            </label>
          </div>
          <div className='my-2'>
            <label>
              url
              <input
                value={url}
                onChange={({ target }) => setUrl(target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 ml-3'
              />
            </label>
          </div>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mb-2'
          >
            create
          </button>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm
