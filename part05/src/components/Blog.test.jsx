import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
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