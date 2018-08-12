const request = require('request');

let geocodeAddress = (inputAddress, callback) => {
    let address = encodeURIComponent(inputAddress);
    request({
        uri: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
        json: true
    }, (error, response, body)=>{

        if(error !== null){
            callback('Unable to connect to Google server.');
        }else if(body.status === 'ZERO_RESULTS'){
            callback('Unable to find that address.')
        }else if(body.status === 'OK'){
            callback(undefined,{
                title: '##Location##',
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;