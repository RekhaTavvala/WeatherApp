const request = require("request");


const forecast = (latitude, longitude , callback) => {
    const weatherDomain = "https://api.darksky.net/forecast/9e9c7616d8ec409ff23d27060862c041/";
    const url = weatherDomain + latitude + "," + longitude;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect weather api");
        } else if(body.error){
            callback("Could not get weather information for the given location");
        } else{
            callback(undefined, 
                body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is " 
                + body.currently.precipProbability + " probability of rain" 
            );
        }
    })
}

module.exports = forecast;