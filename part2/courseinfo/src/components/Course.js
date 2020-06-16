import React from "react";

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
const Content = ({course}) => {
    return (
        <>
            {course.parts.map(part =>
                <Part key={part.name} part={part}/>
            )}
        </>
    )
}
const Total = (props) => {
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

export default Course