const Blog = ({ blog }) => {
  const blogStyle = {
    padding: 5,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5
  }
  return (
  <div style={blogStyle}>
    <h3>{blog.title} by {blog.author}</h3>
  </div>
)}

export default Blog