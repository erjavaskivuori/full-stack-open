import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm';

const blog = {
  title: 'Testing is important',
  author: 'Bob Tester',
  url: 'https://example.com'
};

describe('<BlogForm />', () => {
  test('the form calls the event handler with the right details when a new blog is created', async () => {
    const user = userEvent.setup();
    const createBlog = vi.fn();

    render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getByLabelText('title');
    const authorInput = screen.getByLabelText('author');
    const urlInput = screen.getByLabelText('url');
    const createButton = screen.getByText('create');

    await user.type(titleInput, blog.title);
    await user.type(authorInput, blog.author);
    await user.type(urlInput, blog.url);
    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual(blog);
  });
});