import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    login(username, password)
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
              name="username"
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
              name="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm