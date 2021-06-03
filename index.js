const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const pages = require('./routes/pages')
const series = require('./routes/series')

const mongo = process.env.MONGODB || 'mongodb://localhost/minhas-series'
const port = process.env.PORT ||  3000
const app = express()

// process request body
app.use(bodyParser.urlencoded({ extended: true }))

// view engine - EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// assets
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', pages)
app.use('/series', series)

mongoose
    .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log('Server is running on port: ' + port)
        })
    })
    .catch( e => console.log(e))