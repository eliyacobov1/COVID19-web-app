import {countryData} from './temp-data'
import {Country} from "../client/src/api";

/**
 * (Q2.c + 2.d) this function performs a search over the data-base
 * given a query parameter and returns the matching ticket objects.
 */
export const searchTerm = (searchParam: string) => {
    return countryData.filter((c) => (c.name.toLowerCase()).includes(searchParam));
}

/**
 * UUID generator
 */
export const uniqueID = () => {
    function chr4(){
        return Math.random().toString(16).slice(-4);
    }
    return chr4() + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() + chr4() + chr4();
}

/**
 * find the index of the country with the given id inside of the DataBase array
 */
export const findCountryIndex = (name: string) => {
    for(let i = 0; i < countryData.length; i += 1) {
        if(countryData[i].name === name) {
            return i;
        }
    }
    return -1;
}

export const checkResNotInCountry = (country: Country, restriction : string)=>
{
    let countryRests = country.restrictions;
    return countryRests.every(element => {
        return element.localeCompare(restriction) != 0
    })
}

export const unrestrictedCountries = (restrictions : string[]) => {
    let output = Array();
    countryData.forEach((currCountry : Country) => {
            if (restrictions.every(res => checkResNotInCountry(currCountry, res)))
                output.push(currCountry);
        }
    )
    return output
}