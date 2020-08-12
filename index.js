const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (req, res) { 
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
    {
        name : 'Arto Hellas',
        number : '040-123456',
        id : 1
    },
    {
        name : 'Ada Lovelace',
        number : '39-44-215456',
        id : 2
    },
    {
        name : 'Matti Katainen',
        number : '040-123456',
        id : 3
    },
    {
        name : 'Aku Ankka',
        number : '040-123456',
        id : 4
    },
]






app.get('/api/persons' , (req,res) => {
    res.json(persons)
})

app.get('/api/info' , (req,res) => {
    res.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`)
})



app.get('/api/persons/:id' , (req,res) => {
    const person = persons.find(person => Number(person.id) === Number(req.params.id))
    if (person) {
        res.json(person)
    } else {
        res.status(404).send({error : "Person not found"})
    }
    
})

app.delete('/api/persons/:id' , (req,res) => {
    persons = persons.filter(person => Number(person.id) !== Number(req.params.id))
    res.status(204).end()
})

app.post('/api/persons', (req,res) => {
    const body = req.body

    if (!body.number || !body.name) {
        res.status(400).send({error : "Name or number missing"})
        return
    }

    const nameExists = persons.map(person => person.name).includes(body.name)
    if (nameExists){
        res.status(400).send({error : "Name already exists"})
        return
    }

    const person = {
        name : body.name,
        number : body.number,
        id : Math.floor(Math.random() * 1000)
    }
  
    persons = persons.concat(person)
    res.json(person)
})



const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})