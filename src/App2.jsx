import { useState,useEffect } from 'react'
import noteService from './services/notes.js'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li>
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
const App2 = (props) => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 

  const [showAll,setShowAll]=useState(false) 
const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  console.log('render', notes.length, 'notes')

  const handleOnChange=(event)=>{
        console.log(event.target.value)
        setNewNote(event.target.value)
  }
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }


    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }  
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
    const url=`http://localhost:3001/notes/${id.id}`
    const note= notes.find(n=>n.id===id)
    const changedNote= {...note, important :!note.important}
    
    noteService
    .update(id, changedNote).then(response => {
      setNotes(notes.map((note) => note.id !== id ? note : response.data))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note}  toggleImportance={()=>{toggleImportanceOf(note.id)}}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleOnChange} />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App2;