import React, { useState, useEffect } from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter";
import axios from 'axios'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ nameFilter, setNameFilter ] = useState('')

    const namesToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

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