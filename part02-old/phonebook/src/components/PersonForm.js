const PersonForm = ({ name, nameHandle, number, numberHandle, addPerson }) => {
    return (
      <form onSubmit={addPerson}>
          <div>
            name: 
            <input 
              value={name}
              onChange={nameHandle}
            />
          </div>
          <div>
            number: 
            <input 
              value={number}
              onChange={numberHandle}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
    )
  }

export default PersonForm