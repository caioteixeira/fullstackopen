import React, {useState} from "react";
import personService from "../services/persons";


const PersonForm = ({persons, addNewPerson}) => {

     const [ newName, setNewName ] = useState('')
     const [ newNumber, setNewNumber ] = useState('')

    const addName = (event) => {
        event.preventDefault()

        const person = {
            name: newName,
            number: newNumber
        }

        addNewPerson(person)
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addName}>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm