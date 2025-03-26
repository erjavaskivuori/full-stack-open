import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch {
        setMessage('wrong username or password')
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
          setMessageType('')
        }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(
        blogObject
      )
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blog))

      setMessage(`A new blog ${blog.title} by ${blog.author} added`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType('')
      }, 5000)
    } catch (exception) {
      setMessage('Error occured while creating a new blog. Did you fill all the fields?')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType('')
      }, 5000
      )
    }
  }

  const addLike = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(
        id, blogObject
      )
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
      setMessage(`A like added to the blog ${updatedBlog.title}`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType('')
      }
      , 500
      )
    } catch (exception) {
      setMessage('Error occured while adding a like to the blog')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType('')
      }, 500
      )
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} type={messageType} />
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Notification message={message} type={messageType} />
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <div>
        <br />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} />
        )}
      </div>
    </div>
  )
}

export default App