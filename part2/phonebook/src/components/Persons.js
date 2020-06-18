import React from "react";
import Button from "./Button";

const Person = ({person, removeHandler}) => {

    return (
        <div>{person.name} {person.number}
        <Button text="delete"
                handleClick={() => {
                   console.log("clicked")
                   removeHandler(person)
               }}/>
        </div>
    )
}

const Persons = ({persons, removeHandler}) => {
    return (
        <>
            {persons.map(person =>
                <Person key={person.name} person={person} removeHandler={removeHandler}/>
            )}
        </>
    )
}

export default Persons