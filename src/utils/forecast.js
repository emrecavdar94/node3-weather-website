const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8013bbaf993c366c7eca74caa58e5ed7/' + latitude + ',' + longitude + '?lang=tr&units=si'
    console.log(url)
    request({
        url: url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback("Unable to connect to forecast service", undefined)
        } else if (body.error) {
            callback("Coordinate not found", undefined)
        } else {
            callback(undefined, body.timezone + ' ------> ' + body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + ' % chance of rain.')
        }
    })
}
module.exports = forecast