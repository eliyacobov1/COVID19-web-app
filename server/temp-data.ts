import {Country, Ticket} from '../client/src/api';


const data = require('./data.json');
const country_data = require('./country_data.json');

export const tempData = data as Ticket[];
export const countryData = country_data as Country[];