const express     = require( 'express' );
const router      = express.Router();
const { 
    getHomepageData,
    getSearchData
} = require( '../controllers/indexController.js' );

router
    .route( '/' )
    .get( getHomepageData )
    .post( getSearchData );

module.exports = router;