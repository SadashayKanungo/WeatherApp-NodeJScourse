const request = require('request')

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?types=place&access_token=pk.eyJ1Ijoic2FkYXNoYXkiLCJhIjoiY2twZWQ3OWs4MDZ2YTJwcml0anJzMDVlMiJ9.NxUjKLE57VPS_nJTFYKXSw&limit=1`

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Location service', undefined)
        }
        else if(!(body.features) || body.features.length === 0){
            callback('Unable to find Location', undefined)
        }
        else{
            const data = body.features[0]
            callback(undefined, {
                location: data.place_name,
                latitude: data.center[1],
                longitude: data.center[0]
            })
        }    
    })
}

module.exports = geocode