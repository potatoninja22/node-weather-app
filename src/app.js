const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Prasun Nayak',
        footer: 'Created by Prasun',
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        footer: 'Created by Prasun',
        help_text: 'This app runs on Nodejs to provide the forecast and weather for the location entered by the user.'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        footer: 'Created by Prasun',
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    // console.log(req.query.address)
    // res.send({
    //     forecast: 'It is raining',
    //     address: req.query.address
    // })
    // res.send('Here\'s the Weather')
    const addr = req.query.address
    geocode(addr,(error,{latitude,longitude,location}={})=>{
        if(error)
        return res.send({
            error: error,
        })
        weather(latitude,longitude,(error,data)=>{
            if(error)
            return res.send({
                error: error,
            })
            res.send({
                forecast: data,
                location,
                address: addr,
            })
        })

    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404 NOT FOUND',
        error_text: 'Help page not found',
        footer: 'Created by Prasun',
    })
})

app.get('/*',(req,res)=>{
    res.render('error',{
        title: ' 404 Page not found',
        error_text: 'Couldnt find page',
        footer: 'Created by Prasun'
    })
})


app.listen(port,()=>{
    console.log('Server is up and running on port '+port)
})