const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

const app = express()

//Paths for Express config
const partialspath = path.join(__dirname, '../views/partials')
const viewspath = path.join(__dirname, '../views')
const publicdir = path.join(__dirname, '../public')

//Setup Handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//Setup static directory
app.use(express.static(publicdir))

app.get('/', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'SK'
    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About',
        name: 'SK'
    })
})
app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        name: 'SK',
        message: "This is the help page for this app."
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Address query not found"
        })
    }

    geocode(req.query.address, (error, {location,latitude,longitude} = {})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        
        weather(latitude, longitude, (error, response)=>{
            if(error){
                return res.send({
                    error: error
                })
            }

            const forecast = (response.feelslike === response.temperature) ?
                (`It is ${response.temperature} degrees outside.`) :
                (`It is ${response.temperature} degrees outside. Feels like ${response.feelslike} doesn't it!`)
            
            res.send({
                description: response.description,
                forecast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error', {
        title: '404 ERROR',
        name: 'SK',
        errormsg: "Help Article not found"
    })
})

app.get('*', (req,res)=>{
    res.render('error', {
        title: '404 ERROR',
        name: 'SK',
        errormsg: "Page not found"
    })
})

app.listen(3000, ()=>{
    console.log("Listening on http://localhost:3000")
})