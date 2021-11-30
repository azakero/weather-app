const axios = require( 'axios' );

const forecast = async ( lat, long ) => {

    const url      = `https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${lat},${long}?units=si`;
    const response = await axios.get( url );

    return response;

}

module.exports = forecast;

