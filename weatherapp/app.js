const request = require('request');

request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.KEY}&location=1301%20lombard%20street%20philadelphia`,
    json: true    
},(err, res, body) => {
    console.log(JSON.stringify(body, undefined, 2));
    console.log("lat", body.results[0].locations[0].latLng.lat);
    console.log("lng", body.results[0].locations[0].latLng.lng);
});