import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      console.error('Failed to fetch users:', action.payload)
    })
  }
})

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await usersService.getAll()
      return users
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export default usersSlice.reducer
