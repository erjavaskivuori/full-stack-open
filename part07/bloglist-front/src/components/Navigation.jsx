import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(resetUser())
  }
  return (
    <div>
      <Link to='/'>home</Link>
      <Link to='/users'>users</Link>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Navigation
