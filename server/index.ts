import express from 'express';
import bodyParser = require('body-parser');
import {countryData, restrictionsArray} from './temp-data';
import { serverAPIPort, APIPath, restrictionsPath } from '../configuration';
import {searchTerm, unrestrictedCountries} from './utils'
console.log('starting server', { serverAPIPort, APIPath });

const app = express();

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.get(APIPath, (req, res) => {
  // @ts-ignore
  const page: number = parseInt(req.query.page);
  // @ts-ignore
  const pageSize: number = parseInt(req.query.PageLimit);
  // @ts-ignore
  const searchParam: string = req.query.superSearch;
  // @ts-ignore
  const restSearchParam: string = req.query.rest;

  // search mechanism implementation
  if (searchParam) {
    // cache search results for near future use
    const countries = searchTerm(searchParam);
    if (!page) {
      res.send(countries);
    }
    else{ // return requested search data
      const paginatedData = countries.slice((page - 1) * pageSize, page * pageSize);
      res.send(paginatedData);
    }
  }
  else if(restSearchParam){
    let restrictions = restSearchParam.split('1').map(res => {
      return res.replace(new RegExp("~", "g"), " ");
    })
    let countries = unrestrictedCountries(restrictions)
    res.send(countries)
  }
  else if (!page){ // return all available ticket data
    res.send(countryData);
  }
  else{ // return requested page
    const paginatedData = countryData.slice((page - 1) * pageSize, page * pageSize);
    res.send(paginatedData);
  }
});


app.get(restrictionsPath, (req, res) => {
  res.send(restrictionsArray);
});

app.listen(serverAPIPort);
console.log('server running', serverAPIPort)


