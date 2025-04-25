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
    <div className='flex justify-center bg-blue-200 min-h-screen'>
      <div className='w-[900px] py-5'>
        <div className='text-left'>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className='my-2'>
              <label>
                username
                <input
                  name='username'
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 ml-3'
                />
              </label>
            </div>
            <div className='my-2'>
              <label>
                password
                <input
                  name='password'
                  type='password'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 ml-3'
                />
              </label>
            </div>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mb-2'
            >
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
