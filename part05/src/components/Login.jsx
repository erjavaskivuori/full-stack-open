import { useState } from 'react'

const LoginForm = ({
    login
  }) => {
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
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                style={{ marginLeft: '10px'}}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
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

export default LoginForm