const axios = require( 'axios' );

const geocode = async ( address ) => {

    const url      = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=${process.env.MAPBOX_KEY}`;
    const response = await axios.get( url );

    return response;

}

module.exports = geocode;