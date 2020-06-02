import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Value = (props) => (
<>{props.text} {props.value} <br/></>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  const average = (props.good + props.bad * -1) / total;
  const positive = props.good / total * 100

  return (
    <>
    <Header text="statistics"/>
  
    <Value text="good" value={props.good}/>
    <Value text="neutral" value={props.neutral}/>
    <Value text="bad" value={props.bad}/>
    <Value text="all" value={total}/>
    <Value text="average" value={average}/>
    <Value text="positive" value={positive + '%'}/>
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