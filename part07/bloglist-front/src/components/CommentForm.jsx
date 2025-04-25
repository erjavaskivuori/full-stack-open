import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
import { addComment } from '../reducers/blogReducer'

const CommentForm = ({ id }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const commentObject = {
      text: comment
    }
    try {
      await dispatch(addComment({ id, commentObject })).unwrap()
      dispatch(showNotification(`A new comment "${comment}" added`, 'success'))
    } catch (exception) {
      dispatch(
        showNotification('Error occured while adding new comment.', 'error')
      )
    }

    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='Write a comment'
        type='text'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 mr-2'
      />
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg mb-2'
      >
        add
      </button>
    </form>
  )
}

export default CommentForm
