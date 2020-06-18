import React, { useState, useEffect } from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ nameFilter, setNameFilter ] = useState('')

    const namesToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then(persons => {
                console.log('promise fulfilled')
                setPersons(persons)
            })
    }, [])

    const handleFilterChange = (event) => {
        setNameFilter(event.target.value)
    }

    const addNewPerson = (person) => {
        const existentPerson = persons.find(p => p.name === person.name)
        if(existentPerson)
        {
            if(window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`))
            {
                personService.update(existentPerson.id, person).then(new_person => {
                    setPersons(persons.map(p => p.id !== new_person.id ? p : new_person))
                })
            }
        }
        else
        {
            personService.create(person).then(person => {
                setPersons(persons.concat(person))
            })
        }
    }

    const removePerson = (person) => {
        if (window.confirm(`Delete ${person.name} ?`))
        {
            personService.remove(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter nameFilter={nameFilter} onChange={handleFilterChange}/>
            <h3>add a new</h3>
            <PersonForm persons={persons} addNewPerson={addNewPerson}/>
            <h3>Numbers</h3>
            <Persons persons={namesToShow} removeHandler={removePerson}/>
        </div>
    )
}

export default App