const request = require('request')

const weather = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c5fb85c27328bceddd4f8466e0dacc59&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Weather service', undefined)
        }
        else if(body.error){
            callback('Unable to check Weather', undefined)
        }
        else{
            const data = body.current
            callback(undefined, {
                description: data.weather_descriptions[0],
                temperature: data.temperature,
                feelslike: data.feelslike
            })
        }    
    })
}

module.exports = weather