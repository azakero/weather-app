require('dotenv').config()
const request = require("request");


//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/" + process.env.WEATHER_KEY + "/" + lat + "," + long + "?units=si";
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to weather service", undefined);
        }else if(body.error){
            callback("invalid location", undefined);
        }else{
            let temp = body.currently.temperature;
            let prec = body.currently.precipProbability;
            let tempHigh = body.daily.data[0].temperatureHigh;
            let tempLow = body.daily.data[0].temperatureLow;
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + temp + ' degrees out. There is ' + prec + '% chance of rain! The current high of the day is ' + tempHigh + ' and the current low is ' + tempLow + '.');
        }
    })
}

module.exports = forecast;

