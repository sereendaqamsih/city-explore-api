'use strict'
const axios = require('axios')
let inMemory = {};



function getMoviesHandle(req, res) {

    let moviesSelected = [];
    let sQuery = req.query.cityName
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${sQuery}`
    if (inMemory[sQuery] !== undefined) {
        console.log('we got the data from our server');
        res.send(inMemory[sQuery]);
    } else {
        axios.get(url).then(movies => {
            moviesSelected = movies.data.results.map(item => {
                return new Movie(item);
            })
            console.log('send request to movies API')
            inMemory[sQuery] = moviesSelected;
            res.send(moviesSelected);
        })
            .catch(error => {
                res.status(500).send(error)
            })
    }

}


class Movie {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;
    }
}

module.exports = getMoviesHandle;
