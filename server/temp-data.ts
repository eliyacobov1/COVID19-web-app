import {Country} from '../client/src/api';
import {checkResNotInCountry} from "./utils";


const country_data = require('./country_data.json');

export const countryData = country_data as Country[];
export const restrictionsArray = [
    "Recreation sites closed (like cinema, restaurant)",
    "outdoor mask wearing",
    "indoor mask wearing",
    "night lockdown",
    "Recreation sites open: for vaccinated individuals only",
    "Recreation sites open: for vaccinated citizens or tourist",
    "gathering limitation",
    "green/vaccine certification needed",
    "negative COVID19 entry test needed",
    "Self-quarantine upon arrival"
]