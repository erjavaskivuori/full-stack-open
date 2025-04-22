import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const blogStyle = {
    padding: 5,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5
  }

  return (
    <div>
      <BlogForm />
      <br />
      <table>
        <tbody>
          {sortedBlogs.map((blog) => (
            <tr key={blog.id}>
              <td style={blogStyle}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BlogList
