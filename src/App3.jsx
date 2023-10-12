import { useState,useEffect } from 'react'
import axios from 'axios'
import services from './services/persons.js'
import './index.css'
const PersonForm=(props)=>{
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  
  const handleOnchange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  } 
  const handleNumberOnchange=(event)=>{
    console.log(event.target.value);
    setnewNumber(event.target.value)
  }

  const addPerson=(event)=>{
    event.preventDefault() 
 
    var ok=0
    for (const element of props.persons) {
      if (element.name === newName) {
        ok = 1
        console.log(`Same name ${ok} ${element.name} ${element.name}`)
      }
    }
    var index=1
    var size=props.persons.length
 
    if (ok === 0) {
      services.create({name: newName,
        number:newNumber,
     }).then(respone=> {
      console.log(`person added` , respone)
      
      props.setPersons(props.persons.concat(respone.data))
  
     
      }).then(()=>{console.log(props.persons[0])}).then((response)=>
      {
        props.setError(`${newName} was added to the database`)
        setNewName("")
      setnewNumber("")
        setTimeout(()=>{
          props.setError(null)
        },5000)
      })
      // .catch(error=>
      //   alert(`the person ${person.name} already exist in the database`))
    }
    else
    {
      alert(`${newName} already exist`)
    }

  }
  // useEffect(() => {
  //   console.log(props.persons[0]);
  // }, [props.persons]);
  return(
    <form onSubmit={addPerson}>
    <div>
      name: 
      <input  value={newName} onChange={handleOnchange}/>
    </div>
    <div>
      number: 
      <input  value={newNumber} onChange={handleNumberOnchange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

  )
}
const Filter=(props)=>{
  const handleFilterOnchange=(event)=>{
  props.setNewFilter(event.target.value)
  }
 
  return(
    <input  value={props.newFilter} onChange={handleFilterOnchange}/>
  )
}
const DeleteButton=(props)=>
{
  const onClickEvent=(id)=>{
    
    console.log(id)
    confirm(`are your sure you want to delete ${props.name}?`)
    services.deleteObj(id).then(response=>console.log(`Deleted ${id}` ))
    services.getAll().then(response=>props.setPersons(response.data))
  }
 
  return(
  <button onClick={()=>{onClickEvent(props.id)}}> delete </button>)
}
const Person=(props)=>{
  
  return(
    <div>
      <p>{props.person.name} {props.person.number} {props.person.id}  </p>
    </div>
    
  )
}
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
const AllPersons=(props)=>{
  const persToDisplay=(props.persons).filter(person=>person.name.includes(props.newFilter)|| person.number.includes(props.newFilter))
  return(
    <div>
  {persToDisplay.map(person=> 
    <div key={person.name}>
    <Person person={person} />
    <DeleteButton persons={persToDisplay} setPersons={props.setPersons} name={person.name} id={person.id}/>
    
    </div>
  )
  }
  </div>
  )
}
const App3 = () => {
  const [newFilter,setNewFilter]=useState('')
  const [persons, setPersons] = useState([])
  const [errorMessage,setError]=useState(null)

  useEffect(()=>{
  console.log('effect')
  axios
  .get('http://localhost:3001/persons')
  .then(response=>{
    console.log('promised fulfilled')
    setPersons(response.data)
  })
},[])

  return (
    <div>
    
    <Notification message={errorMessage}></Notification>
    <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} setError={setError}></PersonForm>
      <h2>Numbers</h2>
    <Filter  setNewFilter={setNewFilter} ></Filter>
    <AllPersons persons={persons} setPersons={setPersons} newFilter={newFilter}></AllPersons>
    </div>
  )
}

export default App3