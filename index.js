const express = require('express')
const app = express()
app.use(express.json())
const phonebook=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/phonebook', (request, response) => {
  response.json(phonebook)
})

// app.get('/api/phonebook/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const note = notes.find(note => note.id === id)
//     if(note){
//         response.json(note)
//     }
//     else {
//         response.status(404).end()
//     }
   
//   })
// app.delete('/api/phonebook/:id',(request, response) =>{
//     const id=Number(request.params.id)
//     note = notes.filter(note=>note.id!==id)
//     response.status(204).end()
// })
// app.post('/api/notes',(request, response) =>{
//     const note=request.body
//     console.log(note)
//     response.json(note)
// })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})