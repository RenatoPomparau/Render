
const express = require('express')
const cors=require('cors')
const mongoose = require('mongoose')


//var morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
//app.use(morgan('tiny'))


const url =
  `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }

]
 
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(note => {
    response.json(note)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const note = notes.find(note=>note.id===Number(request.params.id))

      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    app.use(requestLogger)


app.delete('/api/notes/:id',(request, response) =>{
    const id=Number(request.params.id)
    note = notes.filter(note=>note.id!==id)
    response.status(204).end()
})
app.post('/api/notes',(request, response) =>{
    const note=request.body
    console.log(note)
    response.json(note)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})