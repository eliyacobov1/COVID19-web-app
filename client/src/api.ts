import axios from 'axios';
import { APIPageLimitQuery, APIPageQuery, APIRootPagePath, APIRootPath, APISearchQuery } from './config';

export const PAGE_SIZE = 20  // PAGE_SIZE is now an API constant

export type Country = {
    name: string
    content?: string
    update_date: string
    restrictions: string[]
    corona_policy: string[]
    vaccination_percentage: number
    risk_rate: number
    ministry_of_health_link: string
    red_countries: string[]
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
    getPage: (page: number, searchVal: string) => Promise<Country[]>;
    getCountries: (searchVal: string) => Promise<Country[]>;
}

export const createApiClient = (): ApiClient => {
    return {
        getCountries: (searchVal: string) => {
            if(searchVal !== ''){
                return axios.get(`${APIRootPath}${APISearchQuery}${searchVal}`)
                    .then((res) => res.data);
            }
            return axios.get(APIRootPath).then((res) => res.data);
        },


        /**
         * get request endpoint for a specific page
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
    }
}
