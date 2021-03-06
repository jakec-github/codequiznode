#!/usr/bin/env nodejs
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')

const isProduction = process.env.NODE_ENV === 'production'

require('./models/model')
require('./config/passport')

const authRoutes = require('./routes/authentication')
const publicRoutes = require('./routes/public')
const privateRoutes = require('./routes/private')

const app = express()

// I believe these are only required in dev
if (!isProduction) {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./../../webpack.dev.js')
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }))

  app.use(webpackHotMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }))
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Adds latency for testing purposes
// app.use((req, res, next) => { setTimeout(next, 1500) })

app.use('/auth', authRoutes)
app.use('/public', publicRoutes)
app.use('/private', privateRoutes)

if (!isProduction) {
  app.use(errorHandler())
}

mongoose.connect('mongodb://localhost/codequiz-v1')

app.use(express.static('../../dist'))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/../../dist/index.html')))

// Currently not working. Res is next.
// Should be able to error handle
// if (!isProduction) {
//   app.use((error, req, res) => {
//     console.log('------')
//     console.log(res)
//     console.log('------')
//     res.status(error.status || 500)
//
//     res.json({
//       errors: {
//         message: error.message,
//         error,
//       },
//     })
//   })
// }

app.listen(3000, () => {
  console.log('Lazy loader listening on port 3000')
})
