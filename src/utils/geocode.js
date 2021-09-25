const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJhc3VuMjIiLCJhIjoiY2t0aTV2cGczMHoxZDJ2cW41YXU5YjYwbSJ9.KyXx4pYF_d9chXLcZPgA9g'

    request({url: url,json: true},(error,{body}={})=>{     //used shorthand for destructuring response.body
           if(error){
        callback('Unable to connect to weather service!', undefined)
    }
    else if(body.error){
        callback('No matching results', undefined)
    }
    else{
        callback(undefined,{
            longitude: body.features[0].center[0],
            latitude : body.features[0].center[1],
            location: body.features[0].place_name,
        })
    } 
    })
}

module.exports = geocode