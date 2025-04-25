import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addBlog.fulfilled, (state, action) => {
      state.push(action.payload)
    })
    builder.addCase(addBlog.rejected, (state, action) => {
      console.error('Failed to add blog:', action.payload)
    })
    builder.addCase(likeBlog.fulfilled, (state, action) => {
      const likedBlog = action.payload
      return state.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog))
    })
    builder.addCase(likeBlog.rejected, (state, action) => {
      console.error('Failed to like blog:', action.payload)
    })
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      return state.filter((blog) => blog.id !== action.payload.id)
    })
    builder.addCase(deleteBlog.rejected, (state, action) => {
      console.error('Failed to remove blog:', action.payload)
    })
    builder.addCase(addComment.fulfilled, (state, action) => {
      const commentedBlog = action.payload
      return state.map((blog) =>
        blog.id !== commentedBlog.id ? blog : commentedBlog
      )
    })
    builder.addCase(addComment.rejected, (state, action) => {
      console.error('Failed to add comment:', action.payload)
    })
  }
})

export const { setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = createAsyncThunk(
  'blogs/addBlog',
  async (blogObject, { rejectWithValue }) => {
    try {
      const newBlog = await blogService.create(blogObject)
      return newBlog
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const likeBlog = createAsyncThunk(
  'blogs/likeBlog',
  async ({ id, updatedLikes }, { rejectWithValue }) => {
    try {
      const data = await blogService.update(id, updatedLikes)
      return data
    } catch {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (id, { rejectWithValue }) => {
    try {
      await blogService.remove(id)
      return { id }
    } catch {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const addComment = createAsyncThunk(
  'blogs/addComment',
  async ({ id, commentObject }, { rejectWithValue }) => {
    try {
      const data = await blogService.createComment(id, commentObject)
      return data
    } catch {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export default blogSlice.reducer
