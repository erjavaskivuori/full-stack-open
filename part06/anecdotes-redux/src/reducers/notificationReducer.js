import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'this is a test notification',
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    notificationReset(state, action) {
      return initialState
    },
  },
})

export const { notificationChange, notificationReset } = notificationSlice.actions
export default notificationSlice.reducer