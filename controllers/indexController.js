const axios = require( 'axios' );
const geocode = require( '../utils/geocode' );
const forecast = require( '../utils/forecast' );


const getHomepageData = async ( req, res ) => {

    try {

        const clientIp  =  req.headers[ 'x-forwarded-for' ] || req.socket.remoteAddress; 

        const url = `http://www.geoplugin.net/extras/location.gp?ip=${clientIp}&format=json`;

        const { data } = await axios.get( url );

        const weatherData = await forecast( data.geoplugin_latitude, data.geoplugin_longitude );

        if ( weatherData.status !== 200 ) {
            res.render( 'index', { data: null, error: weatherData.data.message } );
            return;
        }
    
        res.render( 'index', { data: weatherData.data, error: null } );

    } catch ( err ) {
        res.render( 'index', { data: null, error: 'Something went wrong. Please try again!' } );
    }

};


const getSearchData = async ( req, res ) => {

    try {

        const location = req.body.input;

        const geoData = await geocode( location );

        if ( geoData.status !== 200 ) {
            res.json( { data: null, error: 'Error fetching location data!' } );
            return;
        }

        const lat  = geoData.data.features[ 0 ].center[ 1 ];
        const long = geoData.data.features[ 0 ].center[ 0 ];

        const weatherData = await forecast( lat, long );

        if ( weatherData.status !== 200 ) {
            res.json( { data: null, error: 'Error fetching weather data!' } );
            return;
        }

        res.json( { data: weatherData.data, error: null } );

    } catch ( err ) {
        res.json( { data: null, error: 'Something went wrong. Please try again!' } );
    }

};

module.exports = {
    getHomepageData,
    getSearchData
}
