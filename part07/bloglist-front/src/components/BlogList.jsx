import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  return (
    <div>
      <BlogForm />
      <br />
      {blogs
        .map((blog) => <Blog key={blog.id} blog={blog} user={user} />)
        .sort((a, b) => b.props.blog.likes - a.props.blog.likes)}
    </div>
  )
}

export default BlogList
