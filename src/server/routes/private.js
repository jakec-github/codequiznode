const express = require('express')

const Model = require('../models/model')
const auth = require('../auth')

const { User, Quiz, Question } = Model

const router = express.Router()

// This route will need further data validation
router.post('/score', auth.required, (req, res) => {
  const score = req.body
  const { username } = req.payload

  User.findOne({ username })
    .then((record) => {
      const index = record.scores.findIndex(oldScore => oldScore.quiz.toString() === score.quiz)
      if (index > -1) {
        record.scores[index].remove()
      }
      record.scores.push(score)
      record.save()
        .then(() => {
          res.sendStatus(200)
        })
        .catch((error) => {
        })
    })
})

// Further validation required
// Also need to make sure script injection isn't possible by exploiting this route
router.post('/quiz/new', auth.required, (req, res) => {
  const { title, description, timer, questions } = req.body
  const { username } = req.payload
  console.log('-----+')
  console.log(title)
  console.log(description)
  console.log(questions)
  if (
    // Should create max length for these strings
    title.length === 0
    || description.length === 0
    || timer > 30
    || timer < 0
    || timer % 1
    || questions.length > 30
    || questions.length < 1 // This should be 3
  ) {
    return res.sendStatus(400) // Must return here to prevent db save
  }
  console.log('Passed validation')
  const newQuestions = []

  questions.forEach(({ question, codes, answer, duds, explanation }) => {
    // Need to add validation for each question in this loop
    const newQuestion = {
      question,
      answer,
      codes,
      duds: duds.map(dud => ({ text: dud })),
      explanation,
      correctReplies: 0,
      incorrectReplies: 0,
    }
    return newQuestions.push(newQuestion)
  })

  Question.insertMany(newQuestions)
    .then((savedQuestions) => {
      const newQuiz = new Quiz({
        name: title,
        description,
        timeLimit: timer,
        featured: false,
        questions: savedQuestions.map(question => question._id),
      })

      newQuiz.save()
        .then((record) => {
          console.log('Completed')
          return res.send(JSON.stringify({
            quiz: record._id,
          }))
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router
