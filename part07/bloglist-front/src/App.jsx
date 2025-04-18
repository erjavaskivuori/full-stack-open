import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch {
      dispatch(showNotification('wrong username or password', 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addLike = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
      dispatch(showNotification(`A like added to the blog ${updatedBlog.title}`, 'success'))
    } catch (exception) {
      dispatch(showNotification('Error occured while adding a like to the blog', 'error'))
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      showNotification('Blog deleted successfully', 'success')
    } catch (exception) {
      showNotification('Error occured while deleting the blog', 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Notification />
      <BlogForm />
      <div>
        <br />
        {blogs
          .map((blog) => (
            <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
          ))
          .sort((a, b) => b.props.blog.likes - a.props.blog.likes)}
      </div>
    </div>
  )
}

export default App
