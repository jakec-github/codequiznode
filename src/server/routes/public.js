const express = require('express')

const Model = require('../models/model')

const { Quiz, Question } = Model

const router = express.Router()

// This route needs to be protected with some state stored in session
router.post('/difficulty', (req, res) => {
  const { _id, correct } = req.body

  if (correct === 'correct') {
    Question.findOneAndUpdate({ _id }, { $inc: { correctReplies: 1 } })
      .then(() => {
        res.send('Successful')
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send('Oops, unable to save')
      })
  } else {
    Question.findOneAndUpdate({ _id }, { $inc: { incorrectReplies: 1 } })
      .then(() => {
        res.send('Successful')
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send('Oops, unable to save')
      })
  }
})

router.get('/quiz/all', (req, res) => {
  const allQuizzes = []

  Quiz.find()
    .then((records) => {
      records.forEach((record) => {
        const { name, description } = record
        allQuizzes.push({
          id: record._id,
          name,
          description,
        })
      })
      res.json(allQuizzes)
    })
})

// Want to use names rather than id. That's for sure
// But would mean a quiz could not be called "all"
router.get('/quiz/:id', (req, res) => {
  const { id } = req.params
  Quiz.findOne({
    _id: id,
  })
    .then((record) => {
      const questionRequests = []
      const questionSet = []

      record.questions.forEach((questionId) => {
        questionRequests.push(Question.findOne({
          _id: questionId,
        })
          .then((question) => {
            questionSet.push(question)
          }))
      })

      Promise.all(questionRequests)
        .then(() => {
          res.json({
            quizData: record,
            questionSet,
          })
        })
    })
})

module.exports = router
