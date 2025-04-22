import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { resetUser, setUser } from './reducers/userReducer'
import { fetchUsers } from './reducers/usersReducer'

const App = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(resetUser())
  }

  const match = useMatch('/users/:id')
  const userToShow = match
    ? users.find((user) => user.id === match.params.id)
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
    <div>
      <div>
        <Link to='/'>home</Link>
        <Link to='/users'>users</Link>
      </div>

      <div>
        <h2>Blogs</h2>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <Notification />
      </div>

      <Routes>
        <Route path='/users/:id' element={<User user={userToShow} />} />
        <Route path='/users' element={<Users />} />
        <Route path='/' element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App
