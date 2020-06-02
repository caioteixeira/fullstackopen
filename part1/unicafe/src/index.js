import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;

  if(total === 0) {
    return ( 
    <p>No feedback given</p>)
  }

  const average = (props.good + props.bad * -1) / total;
  const positive = props.good / total * 100

  return (
    <>
    <Header text="statistics"/>
  
    <table>
      <tbody>
        <Statistic text="good" value={props.good}/>
        <Statistic text="neutral" value={props.neutral}/>
        <Statistic text="bad" value={props.bad}/>
        <Statistic text="all" value={total}/>
        <Statistic text="average" value={average}/>
        <Statistic text="positive" value={positive + '%'}/>
      </tbody>
    </table>
    </>
  )
}

const Header = (props) => (
<h1>{props.text}</h1>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)