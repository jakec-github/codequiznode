#!/usr/bin/env nodejs
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
// Will this cause issue in prod if packages aren't available?
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./../../webpack.dev.js')

const Model = require('./models/model')

const { Quiz, Question } = Model

const compiler = webpack(config)

const app = express()

mongoose.connect('mongodb://localhost/codequiz-v1')

const db = mongoose.connection

db.once('open', () => {
  console.log('Connected to db')

  const newQuestion = new Question({
    text: 'This is the question text 2',
    answer: 'Answer',
    explanation: 'Explanation',
    correctReplies: 0,
    incorrectReplies: 0,
  })

  const newQuiz = new Quiz({
    name: 'Hi there',
    description: 'quiz 3',
    timeLimit: 120,
    featured: false,
    questions: [
      newQuestion._id,
    ],
  })

  newQuestion.save(() => {
    console.log('Saved question')
  })

  newQuiz.save(() => {
    console.log('Saved a quiz')
  })
})

db.on('error', (error) => {
  console.log('db error')
  console.log(error)
})


// How to stop using these in prod?
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))

app.use(webpackHotMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

// This line may prove necessary yet
// app.use(express.static('dist'))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../dist/index.html')))

app.listen(3000, () => {
  console.log('Lazy loader listening on port 3000')
})
