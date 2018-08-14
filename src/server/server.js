#!/usr/bin/env nodejs
const express = require('express')
const path = require('path')
// Will this cause issue in prod if packages aren't available?
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./../../webpack.dev.js')

const compiler = webpack(config)

const app = express()


// How to stop using these in prod?
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))

app.use(webpackHotMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

// app.use(express.static('dist'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../dist/index.html')))

app.listen(3000, () => {
  console.log('Lazy loader listening on port 3000')
})
