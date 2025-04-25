import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <BlogForm />
      <br />
      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <div className='w-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm my-2'>
              <Link to={`/blogs/${blog.id}`}>
                <p className='text-xl'>{blog.title} by {blog.author}</p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
