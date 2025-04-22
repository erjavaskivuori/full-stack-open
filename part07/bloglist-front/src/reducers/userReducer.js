import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    resetUser(state, action) {
      return null
    },
    setUser(state, action) {
      return action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      console.error('Failed to login user:', action.payload)
    })
  }
})

export const { resetUser, setUser } = userSlice.actions

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const user = await loginService.login({ username, password })
      return user
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export default userSlice.reducer
