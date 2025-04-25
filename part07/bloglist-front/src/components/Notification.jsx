import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)
  if (message === null) {
    return null
  } else if (type === 'success')
    return (
      <div className='text-green-700 border-2 rounded-lg p-3 mt-3'>
        <em>{message}</em>
      </div>
    )
  else if (type === 'error')
    return (
      <div className='text-red-700 border-2 rounded-lg p-3 mt-3'>
        <em>{message}</em>
      </div>
    )
}

export default Notification
