import React, {useState} from "react";
import Button from "./Button";

const Country = ({country}) => {
    const [ showDetails, setDetails ] = useState(false)

    return (
        <div>
            {country.name}
            <Button handleClick={() => setDetails(!showDetails)} text={showDetails ? "hide" : "show"}/>
            { showDetails ? <CountryInfo country={country}/> : ""}
        </div>
    )
}

const CountryInfo = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>

            <h2>languages</h2>
            <ul>
                {country.languages.map(language =>
                    <div key={language.name}>{language.name}</div>
                )}
            </ul>

            <img src={country.flag} alt={country.name} width="300" height="200"/>
        </div>
    )
}

const Countries = ({countries}) => {
    if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

    if (countries.length === 1){
        return (
            <CountryInfo key={countries[0].name} country={countries[0]}/>
        )
    }

    return (
        <>
            {countries.map(country =>
                <Country key={country.name} country={country}/>
            )}
        </>
    )
}

export default Countries