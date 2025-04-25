import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetUser } from '../reducers/userReducer'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(resetUser())
  }
  return (
    <div className='border-b-0 pb-2 flex'>
      <Link
        to='/'
        className='mr-3 text-blue-700 py-1 px-2 font-bold hover:font-extrabold'
      >
        Home
      </Link>
      <Link
        to='/users'
        className='mr-10 text-blue-700 py-1 px-2 font-bold hover:font-extrabold'
      >
        Users
      </Link>
      <p className='py-1 mr-3 text-gray-700'>{user.name} logged in</p>
      <button
        onClick={handleLogout}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'
      >
        logout
      </button>
    </div>
  )
}

export default Navigation
