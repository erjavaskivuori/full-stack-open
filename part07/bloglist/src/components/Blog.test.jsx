import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Testing is important',
  author: 'Bob Tester',
  url: 'https://example.com',
  likes: 42,
  user: {
    username: 'ada',
    name: 'Ada Lovelace',
  },
}

const blogUser = {
  username: 'ada',
  name: 'Ada Lovelace',
}

describe('<Blog />', () => {
  test('only title and author are rendered initially', () => {
    render(<Blog blog={blog} user={blogUser} />)

    expect(screen.queryByText('Testing is important by Bob Tester')).toBeInTheDocument()
    expect(screen.queryByText('https://example.com')).not.toBeInTheDocument()
    expect(screen.queryByText('likes 42')).not.toBeInTheDocument()
    expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument()
  })

  test('url, likes and user are rendered after clicking the view button', async () => {
    render(<Blog blog={blog} user={blogUser} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.queryByText('Testing is important by Bob Tester')).toBeInTheDocument()
    expect(screen.queryByText('https://example.com')).toBeInTheDocument()
    expect(screen.queryByText('likes 42')).toBeInTheDocument()
    expect(screen.queryByText('Ada Lovelace')).toBeInTheDocument()
  })

  test('clicking the like button twice calls the event handler twice', async () => {
    const addLike = vi.fn()

    render(<Blog blog={blog} user={blogUser} addLike={addLike} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})