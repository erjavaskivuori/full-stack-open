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
      const newComment = await dispatch(
        addComment({ id, commentObject })
      ).unwrap()
      dispatch(showNotification(`A new comment "${newComment.text}" added`))
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
      />
      <button type='submit'>add</button>
    </form>
  )
}

export default CommentForm
