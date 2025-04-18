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
    // Optional: handle pending and rejected if you want to show loading or errors
    builder.addCase(addBlog.rejected, (state, action) => {
      console.error('Failed to add blog:', action.payload)
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

export default blogSlice.reducer
