const mongoose = require('mongoose')

const Quiz = require('./models/model')

mongoose.connect('mongodb://localhost/codequiz-v1')

const db = mongoose.connection

db.once('open', () => {
  db.collections.quizzes.drop(() => {
    console.log('Dropped quizzes')
  })

  db.collections.questions.drop(() => {
    console.log('Dropped questions')
  })

  db.collections.users.drop(() => {
    console.log('Dropped users')
  })
})
