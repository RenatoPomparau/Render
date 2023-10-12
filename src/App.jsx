import { useState } from 'react'

const StatisticLine=(props)=>{
  return(
    <tr>
      <td>
        {props.text}
      </td> 
      <td>
        {props.value}
      </td> 
    </tr>
  )
  
}
const Statistic=(props)=>
{
  if (props.good===0 && props.neutral===0)
  {
    return(
      <p>no feedback</p>
    )

  }
  else
{
  return(
    <table>
       <StatisticLine text='good' value={props.good}></StatisticLine>
       <StatisticLine text='bad' value={props.bad}></StatisticLine>
       <StatisticLine text='neutral' value={props.neutral}></StatisticLine>
    </table>

   
  // <div>
  //     good {props.good}
  //   </div>
  //   <div>
  //     neutral {props.neutral}
  //   </div>
  //     <div>
  //     bad {props.bad}
  //   </div>
  //   <div>
  //     all {props.good+props.bad+props.neutral}
  //   </div>
  //   <div>
  //     avg {(props.good-props.bad)/(props.good+props.bad+props.neutral)}
  //   </div>
  //   <div>
  //     positive {props.good/(props.good+props.bad+props.neutral)}
  //   </div>
   
  )
}}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>
           give fedback
      </h1>
      <button onClick={()=>{setGood(good+1)}} >good</button> 
      <button onClick={()=>{setNeutral(neutral+1)}} >neutral</button> 
      <button onClick={()=>{setBad(bad+1)}} >bad</button> 
      <h1>
           statistic
      </h1>
    <Statistic good={good} bad={bad} neutral={neutral}></Statistic>
    
    </div>
  )
}

export default App