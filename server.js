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
const axios = require('axios')



// localhost:3001/
server.get('/',(req,res)=>{
    res.status(200).send('home route')
});
// localhost:3001/test
server.get('/test',(req,res)=>{
    res.status(200).send('my server is working')
});
//http://localhost:3030/weather?cityName=Paris
// server.get('/weather', (req, res) => {
//   let lon = req.query.lon;
//   let lat = req.query.lat;
//   let searchQuery = req.query.searchQuery;

// let selectedCity = weather.find (city =>{
//     let cityNameQuery=req.query.cityName;
//       if(city.city_name === cityNameQuery) {
//                 return city;
//                 }
//                 // else { res.status(500).send('Error page not found'); }

//             });
//             //console.log(selectedCity);
//       let weatherUpdate = selectedCity.data.map(item => {
//             return new ForCast(item.weather.description,item.valid_date);
//             })
//             res.status(200).send(weatherUpdate);
//         });

//http://localhost:3030/weather?cityName=Paris

server.get('/weather', getWeatherHandle);

function getWeatherHandle (req, res) {
    let selectedData=[];
    const sQuery = req.query.cityName;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${sQuery}&key=${process.env.WEATHER_API_KEY}`;

    axios.get(url).then( weather1 => {
console.log(weather1.data.data);
             selectedData =weather1.data.data.map(item => {
                return new ForCast(item);
            })
            res.send(selectedData);
// console.log(selectedData);
        })
        .catch(error => {
            res.status(500).send(error);
        })

//   console.log('after axios')

}

        class ForCast {
            constructor(item) {
            this.valid_date = item.valid_date;
            this.description = item.weather.description;
            }
            
          }
//http://localhost:3030/movies?cityName=Paris

 server.get('/movies', getMoviesHandle);
 function getMoviesHandle(req, res) {

     let moviesSelected=[];
        let sQuery = req.query.cityName
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${sQuery}`
    axios.get(url).then(movies =>{
        moviesSelected= movies.data.results.map(item => {
            return new Movie(item);
        })
        res.send(moviesSelected);
    })
        .catch(error => {
            res.status(500).send(error)
        })
    

 }


class Movie {
    constructor(item){
        this.title = item.original_title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;
    }
}



  // handle any route
  // localhost:3001/ANY_ROUTE
server.get('*',(req,res)=>{
    res.status(500).send('NOT FOUND');
});

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
});

