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

export const check_res_not_in_country = (country: Country, restriction : string)=>
{
    let country_rests = country.restrictions;
    country_rests.forEach((element)=> {
            if(element === restriction) {
                return false;
            }
        }
    )
    return true;
}

export const unrestrictedCountries = (restrictions : string[]) => {
    let output = Array();
    countryData.forEach((curr_country : Country) => {
            restrictions.forEach(curr_res => {
                if(check_res_not_in_country(curr_country, curr_res)) {
                    output.push(curr_country)
                }
            })
        }
    )
    return output
}