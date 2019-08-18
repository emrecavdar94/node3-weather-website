const path = require('path')

const express = require('express')

const hbs = require('hbs')

const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')



const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath) //custom view directory
hbs.registerPartials(partialsPath)


//Setup static file location
app.use(express.static(publicDirectoryPath)) //middleware

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Emre Cavdar'
    })

})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Emre Cavdar'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Emre Cavdar',
        message: 'Can I Help You ?'
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {
            latitude,
            longitude,
            location
        } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
        // res.send({
        //     forecast: 'Good'
        // })

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Emre Cavdar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
        res.render('404', {
            title: 404,
            name: 'Emre Cavdar',
            errorMessage: 'Page not found.'
        })
    })
    // app.com
    // app.com/help
    //i removed after created html pages // app.get('/help', (req, res) => {
    //         res.send([{
    //             name: 'Andrew'
    //         }, {
    //             name: 'Sarah'
    //         }])
    //     })
    //     // app.com/about
    // app.get('/about', (req, res) => {
    //     res.send('About page.')
    // })

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})