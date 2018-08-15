const mongoose = require('mongoose')

const { Quiz, Question } = require('./models/model')

mongoose.connect('mongodb://localhost/codequiz-v1')

const db = mongoose.connection

db.once('open', () => {
  const newQuestion = new Question({
    text: 'Here is a basic question for the quiz',
    answer: 'Answer',
    explanation: 'Explanation',
    correctReplies: 0,
    incorrectReplies: 0,
    duds: [
      {
        text: 'Wrong 1',
      },
      {
        text: 'Wrong 2',
      },
      {
        text: 'Wrong 3',
      },
    ],
    codes: [
      {
        type: 'Javascript',
        sample: 'console.log(\'Hello World!\')',
      },
    ],
  })

  const newQuestion2 = new Question({
    text: 'Here is a basic question for the quiz',
    answer: 'Answer',
    explanation: 'Explanation',
    correctReplies: 0,
    incorrectReplies: 0,
    duds: [
      {
        text: 'Wrong 1',
      },
      {
        text: 'Wrong 2',
      },
    ],
  })

  const newQuiz = new Quiz({
    name: 'First Quiz',
    description: 'This is an example quiz',
    timeLimit: 120,
    featured: false,
    questions: [
      newQuestion._id,
      newQuestion2._id,
    ],
  })

  newQuestion.save(() => {
    console.log('Saved question')
  })

  newQuestion2.save(() => {
    console.log('Saved question')
  })

  newQuiz.save(() => {
    console.log('Saved a quiz')
  })
})
