require('dotenv').config()
const request = require("request");

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

