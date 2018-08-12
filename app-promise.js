const yargs = require('yargs');
const axios = require('axios');
const argv = yargs
    .options({
        a:{
            demand: true,
            alias: 'address',
            describe:'Address to fetch weather from',
            string: true
        }

    })
    .help()
    .alias('help','h')
    .argv;


let encodeAddress = encodeURIComponent(argv.address);
let geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

axios.get(geocodeURL).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw Error('Unable to find that address.')
    }else{
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        let key = 'a962216cd7e8b267dbe202c8d217426f';
        let weatherURL = `https://api.darksky.net/forecast/${key}/${lat},${lng}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherURL);
    }
}).then((response)=>{
    let temperature = response.data.currently.temperature;
    let apparentTemperature =  response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`)
}).catch((e)=>{
    if(e.response !== undefined && response.status === 404) {
        console.log('Unable to connect to API servers')
    }else {
        console.log(e.message)
    }
});

