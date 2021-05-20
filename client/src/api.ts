import axios from 'axios';
import {APIPageLimitQuery, APIPageQuery, APIRootPagePath, APIRootPath, APISearchQuery} from './config';

export const PAGE_SIZE = 20  // PAGE_SIZE is now an API constant

export type Country = {
    name: string
    content: string
    update_date: string
    restrictions: string[]
    corona_policy: Corona_policy
    vaccination_rate: number
    risk_level: number
    ministry_of_health_link: string
    green_countries: string[]
}

export type Corona_policy = { // TODO consider changing to list
    green_certificate: boolean
    entry_test: boolean
    exit_test: boolean
}

export type Ticket = {
    id: string,
    title: string;
    content: string;
    creationTime: number;
    userEmail: string;
    labels?: string[];
}

export type ApiClient = {
    getPage: (page: number, searchVal: string) => Promise<Ticket[]>;
    getTickets: (searchVal: string) => Promise<Ticket[]>;
    clone: (ticket: Ticket) => Promise<Ticket>;
}

export const createApiClient = (): ApiClient => {
    return {
        getTickets: (searchVal: string) => {
            if(searchVal !== ''){
                return axios.get(`${APIRootPath}${APISearchQuery}${searchVal}`)
                    .then((res) => res.data);
            }
            return axios.get(APIRootPath).then((res) => res.data);
        },

        /**
         * Q2.b get request endpoint for a specific page
         */
        getPage: (page: number, searchVal: string) => {
            if(searchVal !== ''){
                // get paginated data with accordance to searchVal
                return axios.get(`${APIRootPath}${APISearchQuery}${searchVal}&${APIPageQuery}\
                ${page}${APIPageLimitQuery}${PAGE_SIZE}`)
                    .then((res) => res.data).catch(error => console.log(error));
            }
            return axios.get(`${APIRootPagePath}${page}${APIPageLimitQuery}${PAGE_SIZE}`)
                .then((res) => res.data).catch(error => console.log(error));
        },

        /**
         * Q2.a Clone method
         */
        clone: (obj) => {
            return axios.post(APIRootPath, obj).then((res) => res.data)
                .catch(error => console.log(error));
        }
    }
}
