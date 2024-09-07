const Person = ({ person, remove }) => {
    return(
      <p>
        {person.name} {person.number} <button onClick={() => remove(person.id)}>delete</button>
      </p>
    )}

  export default Person