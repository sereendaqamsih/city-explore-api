
'use strict'
const axios = require('axios')
let inMemory = {};


function getWeatherHandle (req, res) {
    let selectedData=[];
    const sQuery = req.query.cityName;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${sQuery}&key=${process.env.WEATHER_API_KEY}`;
    if(inMemory[sQuery] !== undefined) {
        console.log('we got the data from our server')
        res.send(inMemory[sQuery]);
    } else {
        axios.get(url).then( weather1 => {
            console.log(weather1.data.data);
                         selectedData =weather1.data.data.map(item => {
                            return new ForCast(item);
                        })
                        // inMemory[sQuery] = weather1.data.results;
                        console.log('send request to weather API')

                        inMemory[sQuery] = selectedData;

                        res.send(selectedData);
            // console.log(selectedData);
                    })
                    .catch(error => {
                        res.status(500).send(error);
                    })
            
            //   console.log('after axios')
    }
 

}

        class ForCast {
            constructor(item) {
            this.valid_date = item.valid_date;
            this.description = item.weather.description;
            }
            
          }

          module.exports = getWeatherHandle;
