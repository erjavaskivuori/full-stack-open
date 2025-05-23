import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Navigation from './components/Navigation'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { fetchUsers } from './reducers/usersReducer'

const App = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const userToShow = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className='flex justify-center bg-blue-200 min-h-screen'>
      <div className='w-[900px] py-5'>
        <div className='text-left'>
          <Navigation />

          <div>
            <h1 className='text-2xl py-2'>Blog app</h1>
            <Notification />
          </div>

          <Routes>
            <Route path='/blogs/:id' element={<Blog blog={blog} />} />
            <Route path='/users/:id' element={<User user={userToShow} />} />
            <Route path='/users' element={<Users />} />
            <Route path='/' element={<BlogList />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
