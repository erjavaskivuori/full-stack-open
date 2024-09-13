import Person from "./Person"

const Persons = ({ persons, showAll, search, remove }) => {
    console.log(persons)
    const personsToShow = showAll
      ? persons
      : persons.filter(person => person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    console.log(personsToShow)
    return(
      <div>
      {personsToShow.map(person =>
        <Person key={person.name} person={person} remove={remove}/>)}
      </div>
    )
  }

export default Persons