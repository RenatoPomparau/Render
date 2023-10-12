const Part=(props)=>{
    return(
    <li>
        {props.name} {props.exercises}
    </li>
    )

}
const Course=(props)=>{
    const initialValue=0
    const lista=props.course.parts.map(part=>part.exercises)
    console.log(props.course.parts.map(part=>part.exercises));
    //console.log(props.course.parts.map(part=> <Part key={part.id} name={part.name} exercises={part.exercises}></Part>));
    return(
        <div>
        <h1>
            {props.course.name}
        </h1>
        <ul>
           { props.course.parts.map(part=> <Part key={part.id} name={part.name} exercises={part.exercises}></Part>)}
           <li>{lista.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)}</li>
        </ul>
        
    </div>

)
}
    
const App1 = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares', 
              exercises: 7,
              id: 2
            }
          ]
        }
      ]
  
    return (
        courses.map(course=><Course course={course}></Course>)
    )
  }
  
  export default App1