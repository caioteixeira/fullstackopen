import React, { useState, useEffect } from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter";
import personService from "./services/persons";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ nameFilter, setNameFilter ] = useState('')

    const [ successNotification, setSuccessNotification] = useState('')
    const [ errorNotification, setErrorNotification] = useState('')

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

    const showSuccessMessage = (message) => {
        setSuccessNotification(message)
        setTimeout(() => {
            setSuccessNotification('')
        }, 5000)
    }

    const showErrorMessage = (message) => {
        setErrorNotification(message)
        setTimeout(() => {
            setErrorNotification('')
        }, 5000)
    }

    const addNewPerson = (person) => {
        const existentPerson = persons.find(p => p.name === person.name)
        if(existentPerson)
        {
            if(window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`))
            {
                personService.update(existentPerson.id, person).then(new_person => {
                    setPersons(persons.map(p => p.id !== new_person.id ? p : new_person))
                    showSuccessMessage(`Updated '${person.name}'`)
                })
            }
        }
        else
        {
            personService.create(person).then(person => {
                setPersons(persons.concat(person))
                showSuccessMessage(`Added '${person.name}'`)
            })
        }
    }

    const removePerson = (person) => {
        if (window.confirm(`Delete ${person.name} ?`))
        {
            personService.remove(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                    showSuccessMessage(`Removed ${person.name}`)
                })
                .catch(() => {
                    showErrorMessage(`Information of ${person.name} has already been removed from server`)
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <SuccessNotification message={successNotification}/>
            <ErrorNotification message={errorNotification}/>
            <Filter nameFilter={nameFilter} onChange={handleFilterChange}/>
            <h3>add a new</h3>
            <PersonForm persons={persons} addNewPerson={addNewPerson}/>
            <h3>Numbers</h3>
            <Persons persons={namesToShow} removeHandler={removePerson}/>
        </div>
    )
}

export default App