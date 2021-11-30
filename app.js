const path       = require("path");
const express    = require("express");
const dotenv     = require( 'dotenv' );
const app        = express();
const port       = process.env.PORT || 4600;
const indexRoute = require( './routes/indexRoute' );

dotenv.config();

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( __dirname + '/public' ) );
app.set( 'view engine', 'ejs' );

app.use( '/', indexRoute );

app.listen( port, () => {
    console.log( `Server running on port ${port}` );
} );