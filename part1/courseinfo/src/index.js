import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
    <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.partName} {props.part.exercises}
    </p>
  )
}

const Content = (props) =>
{
  let parts = []
  props.content.forEach(element =>{
    parts.push(
      <Part part={element}/>
    )
  })

  return parts
}

const Total = (props) =>
{
  console.log(props.content)
  let sum = 0
  props.content.forEach(element => {
    sum += element.exercises
  });
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  const content = [
    {
      partName: 'Fundamentals of React',
      exercises: 10 
    },
    {
      partName: 'Using props to pass data',
      exercises: 7
    },
    {
      partName: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content content={content}/>
      <Total content={content}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))