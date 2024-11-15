import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log("initial", initialPersons)
      })
  }, [])

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchName(event.target.value)
    if (searchName === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    console.log(persons)
    event.preventDefault()
    const isNew = persons.find(person => person.name === newName)
    if (isNew !== undefined && window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {
          name: newName,
          number: newNumber
        }
  
        personService
          .update(isNew.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== isNew.id ? person : returnedPerson))
            setMessage(`Updated ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
            console.log(returnedPerson)
          })
          .catch(error => {
            setMessageType('error')
            setMessage(error.response.data.error || 'An error occurred')
            setTimeout(() => {
            setMessage(null)
            setMessageType('')
            }, 5000)
          })
    }
    else if (isNew === undefined) {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessageType('success')
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
          console.log(persons)
        })
        .catch(error => {
          setMessageType('error')
          setMessage(error.response.data.error || 'An error occurred')
          setTimeout(() => {
          setMessage(null)
          setMessageType('')
          }, 5000)
        })
  }}

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(id)
      .then(result => {
        console.log(result)
        setPersons(persons.filter(p => {return p.id !== id}))
        setMessageType('success')
        setMessage(`Removed ${person.name}`)
        setTimeout(() => {
          setMessage(null)
          setMessageType('')
        }, 5000)
        console.log(persons)
      })
      .catch(error => {
        setMessageType('error')
        setMessage(`${person.name} was already removed`)
        setTimeout(() => {
        setMessage(null)
        setMessageType('')
        }, 5000)
        setPersons(persons.filter(p => {return p.id !== id}))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filter={searchName} handle={handleSearchChange}/>

      <h3>Add a new</h3>

      <PersonForm name={newName} nameHandle={handleNameChange} 
        number={newNumber} numberHandle={handleNumberChange} 
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} showAll={showAll} search={searchName} remove={removePerson}/>
    </div>
  )
}

export default App