import { createSlice } from '@reduxjs/toolkit'

export const showNotification = (message) => {
  return (dispatch) => {
    dispatch(notificationChange(message))
    setTimeout(() => {
      dispatch(notificationReset())
    }, 5000)
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    notificationReset(state, action) {
      return ''
    },
  },
})

export const { notificationChange, notificationReset } = notificationSlice.actions
export default notificationSlice.reducer