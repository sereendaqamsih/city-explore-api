'use strict'
const axios = require('axios')



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

module.exports = getMoviesHandle;
