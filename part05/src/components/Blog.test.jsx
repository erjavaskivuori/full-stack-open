import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Blog from './Blog';

test('only title and author are rendered initially', () => {
  const blog = {
    title: 'Testing is important',
    author: 'Bob Tester',
    url: 'https://example.com',
    likes: 42,
    user: {
      username: 'ada',
      name: 'Ada Lovelace',
    },
  };

  const user = {
    username: 'ada',
    name: 'Ada Lovelace',
  };

  render(<Blog blog={blog} user={user} />);
  expect(screen.queryByText('Testing is important by Bob Tester')).toBeInTheDocument();
  expect(screen.queryByText('https://example.com')).not.toBeInTheDocument();
  expect(screen.queryByText('likes 42')).not.toBeInTheDocument();
  expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument();
});

test('url, likes and user are rendered after clicking the view button', async () => {
  const blog = {
    title: 'Testing is important',
    author: 'Bob Tester',
    url: 'https://example.com',
    likes: 42,
    user: {
      username: 'ada',
      name: 'Ada Lovelace',
    },
  };

  const blogUser = {
    username: 'ada',
    name: 'Ada Lovelace',
  };

  render(<Blog blog={blog} user={blogUser} />);

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  expect(screen.queryByText('Testing is important by Bob Tester')).toBeInTheDocument();
  expect(screen.queryByText('https://example.com')).toBeInTheDocument();
  expect(screen.queryByText('likes 42')).toBeInTheDocument();
  expect(screen.queryByText('Ada Lovelace')).toBeInTheDocument();
});