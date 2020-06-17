import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import axios from 'axios'
import Countries from "./components/Countries";

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ nameFilter, setNameFilter ] = useState('')

    const namesToShow = countries.filter(country => country.name.toLowerCase().includes(nameFilter.toLowerCase()))

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setNameFilter(event.target.value)
    }

    return (
        <div>
            <Filter nameFilter={nameFilter} onChange={handleFilterChange}/>
            <Countries countries={namesToShow} />
        </div>
    )
}

export default App