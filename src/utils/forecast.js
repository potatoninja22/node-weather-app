const request = require('request')

const weather = (latitude, longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=fb8dac79d518d8ddb5bee1349c05444c&query='+latitude+','+longitude

    request({url, json:true},(error, {body})=>{    //used the shorthand object structuring propoerty for url and destructuring for body
        if(error){
            callback('Unable to connect to weather service')
        }
        else if(/*response.*/body.error){      //used the shorthand for body
            callback('Unable to find location')
        }
        else{
            let curr = body.current
            callback(undefined,`${curr.weather_descriptions[0]}`+`. It is ${curr.temperature} degreees outside. It feels like it is ${curr.feelslike} degrees outside.`)
        }
    })
}

module.exports = weather