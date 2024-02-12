const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

morgan.token('data', function (req, res) {
    const person = req.body
    return JSON.stringify(person)
})
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.static('build'))


let persons = [
    { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
    },
    { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
    },
    { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
    },
    { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => {return person.id === id})
    
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const notUnique = persons.find(person => person.name === body.name)
    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (notUnique){
        return res.status(400).json({
            error: 'name must be unique'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'name missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000)
    }

    persons = persons.concat(person)
    res.json(person)
})

app.get('/info', (req, res) => {
    const lenPersons = persons.length
    const date = new Date()
    res.send(`<p>Phonebook has info for ${lenPersons} people<br>${date}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})