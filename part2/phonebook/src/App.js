import React, { useState } from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter";

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [ nameFilter, setNameFilter ] = useState('')

    const namesToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

    const handleFilterChange = (event) => {
        setNameFilter(event.target.value)
    }

    const addNewPerson = (person) => {
        setPersons(persons.concat(person))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter nameFilter={nameFilter} onChange={handleFilterChange}/>
            <h3>add a new</h3>
            <PersonForm persons={persons} addNewPerson={addNewPerson}/>
            <h3>Numbers</h3>
            <Persons persons={namesToShow} />
        </div>
    )
}

export default App