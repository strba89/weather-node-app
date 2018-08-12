const request = require('request');


let getWeather = (lat,lng,callback) => {
    let key = 'a962216cd7e8b267dbe202c8d217426f';
    request({
        uri: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
        json: true
    }, (error, response, body)=>{
        if(!error && response.statusCode === 200){
            callback(undefined,{
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        }else {
            callback('Unable to fetch a weather.')
        }
    });
};

module.exports.getWeather = getWeather;