import React, {useState} from "react";
import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'


const PersonForm = ({persons, addNewPerson}) => {

     const [ newName, setNewName ] = useState('')
     const [ newNumber, setNewNumber ] = useState('')

    const addName = (event) => {
        event.preventDefault()
        if(persons.find((name) => name.name === newName)){
            alert(`${newName} is already added to phonebook`)
            return
        }

        const nameObject = {
            name: newName,
            number: newNumber
        }

        const request = axios.post(baseUrl, nameObject)
        request.then(response => {
            addNewPerson(response.data)
            setNewName('')
            setNewNumber('')
        })
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