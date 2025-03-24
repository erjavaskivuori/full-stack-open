const Notification = ({ message, type }) => {
  const notificationStyle = {
      color: 'green',
      fontStyle: 'italic',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      margin: 10,
  }
  const errorStyle = {
      color: 'red',
      fontStyle: 'italic',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      margin: 10,
  }
  if (message === null) {
      return null
  }

  else if (type === 'success')
      return (
          <div style={notificationStyle}>
              <em>{message}</em>
          </div>
      )
  else if (type === 'error')
      return (
          <div style={errorStyle}>
              <em>{message}</em>
          </div>
      )
}

export default Notification