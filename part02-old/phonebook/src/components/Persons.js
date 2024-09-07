import Person from "./Person"

const Persons = ({ persons, showAll, search, remove }) => {
    const personsToShow = showAll
      ? persons
      : persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  
    return(
      <div>
      {personsToShow.map(person =>
        <Person key={person.name} person={person} remove={remove}/>)}
      </div>
    )
  }

export default Persons