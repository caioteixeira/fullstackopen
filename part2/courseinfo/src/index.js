import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
  return (
    <>
    <h1>{course.name}</h1>
    </>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({course}) =>
{
  return (
    <>
      {course.parts.map(part =>
          <Part key={part.name} part={part}/>
      )}
    </>
  )
}

const Total = (props) =>
{
  const sum = props.course.parts.reduce((accumulator, part) => part.exercises + accumulator, 0)
  return (
      <p><b>Total of {sum} exercises</b></p>
  )
}

const Course = ({course}) => {
  return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
  )
}

const App = () => {
  const course = 
  {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10 
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <Course course={course}/>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))