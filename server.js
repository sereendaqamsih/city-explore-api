'use strict';

// create a variable to use express library
const express = require('express'); // npm i express
const server = express();
const cors = require('cors'); // npm i cors
server.use(cors()); // make it open to any client
const weather  = require('./data/weather.json');
require('dotenv').config(); // npm i dotenv
const PORT = process.env.PORT;
console.log(PORT);

// localhost:3001/
server.get('/',(req,res)=>{
    res.status(200).send('home route')
});
// localhost:3001/test
server.get('/test',(req,res)=>{
    res.status(200).send('my server is working')
});
//http://localhost:3030/weather?cityName=Paris
server.get('/weather', (req, res) => {
//   let lon = req.query.lon;
//   let lat = req.query.lat;
//   let searchQuery = req.query.searchQuery;

let selectedCity = weather.find (city =>{
    let cityNameQuery=req.query.cityName;
      if(city.city_name === cityNameQuery) {
                return city;
                }
                // else { res.status(500).send('Error page not found'); }

            });
            //console.log(selectedCity);
      let weatherUpdate = selectedCity.data.map(item => {
            return new ForCast(item.weather.description,item.valid_date);
            })
            res.status(200).send(weatherUpdate);
        });

        class ForCast {
            constructor(description,date) {
            this.valid_date = date;
            this.description = description;
            }
          }


  // handle any route
  // localhost:3001/ANY_ROUTE
server.get('*',(req,res)=>{
    res.status(500).send('NOT FOUND')
});

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
});

