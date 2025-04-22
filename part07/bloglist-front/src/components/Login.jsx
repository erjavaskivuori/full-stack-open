import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import blogService from '../services/blogs'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await dispatch(loginUser({ username, password })).unwrap()
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch {
      dispatch(showNotification('wrong username or password', 'error'))
    }
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              name='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              name='password'
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
