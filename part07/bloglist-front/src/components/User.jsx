const User = ({ user }) => {
  const blogs = user?.blogs

  return (
    <div>
      {user ? (
        <div>
          <h2 className='text-2xl py-2'>{user.name}</h2>

          {blogs ? (
            <div>
              <h3>Added blogs:</h3>
              <ul>
                {blogs?.map((blog) => (
                  <li key={blog.id}>
                    <div className='w-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm my-2 text-xl'>
                      {blog.title}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h3>No added blogs</h3>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Unknown user</h2>
        </div>
      )}
    </div>
  )
}

export default User
