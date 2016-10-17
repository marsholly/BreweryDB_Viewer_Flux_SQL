const axios = require('axios');


exports.getRandomBeer = (cb) => {
  axios.get(`http://api.brewerydb.com/v2/beer/random?key=${process.env.BEER_API_KEY}&format=json`)
  .then( beers=> {
    let beersData = beers.data;
    cb(null, beersData);
  })
  .catch(console.error);
}
