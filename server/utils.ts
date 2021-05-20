import {tempData, countryData} from './temp-data'

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
 * find the index of the ticket with the
 * given id inside of the DataBase array
 */
export const findTicketIndex= (id: string) => {
    for(let i = 0; i < tempData.length; i += 1) {
        if(tempData[i].id === id) {
            return i;
        }
    }
    return -1;
}

/**
 * find the index of the country with the given id inside of the DataBase array
 */
export const findCountryIndex= (name: string) => {
    for(let i = 0; i < countryData.length; i += 1) {
        if(countryData[i].name === name) {
            return i;
        }
    }
    return -1;
}