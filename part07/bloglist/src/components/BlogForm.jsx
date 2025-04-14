import { useState } from 'react'

const BlogForm = ({
  createBlog
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    createBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm