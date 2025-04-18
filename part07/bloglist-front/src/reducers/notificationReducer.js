import { createSlice } from '@reduxjs/toolkit'

export const showNotification = (message, type, timeout = 5) => {
  return (dispatch) => {
    dispatch(notificationChange({ message: message, type: type }))
    setTimeout(() => {
      dispatch(notificationReset())
    }, timeout * 1000)
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: '' },
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    notificationReset(state, action) {
      return { message: '', type: '' }
    }
  }
})

export const { notificationChange, notificationReset } = notificationSlice.actions
export default notificationSlice.reducer
