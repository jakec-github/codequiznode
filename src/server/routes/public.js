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
        const { name, description, questions, creator } = record
        allQuizzes.push({
          id: record._id,
          name,
          description,
          length: questions.length,
          creator,
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
      const unorderedQuestionSet = []

      record.questions.forEach((questionId) => {
        questionRequests.push(Question.findOne({
          _id: questionId,
        })
          .then((question) => {
            unorderedQuestionSet.push(question)
          }))
      })

      Promise.all(questionRequests)
        .then(() => {
          const questionSet = unorderedQuestionSet.sort((a, b) => {
            const difficultyA = getDifficulty(a.correctReplies, a.incorrectReplies)
            const difficultyB = getDifficulty(b.correctReplies, b.incorrectReplies)
            if (difficultyB === Infinity) {
              return -1
            }
            if (difficultyA === Infinity) {
              return 1
            }
            return difficultyA - difficultyB
          })

          res.json({
            quizData: record,
            questionSet,
          })
        })
    })
})

router.get('/:username/:quiz', (req, res) => {
  const { quiz, username } = req.params
  const name = decodeURIComponent(quiz).replace(/_/g, ' ')
  Quiz.findOne({
    name,
    creator: username,
  })
    .then((record) => {
      const questionRequests = []
      const unorderedQuestionSet = []

      record.questions.forEach((questionId) => {
        questionRequests.push(Question.findOne({
          _id: questionId,
        })
          .then((question) => {
            unorderedQuestionSet.push(question)
          }))
      })

      Promise.all(questionRequests)
        .then(() => {
          const questionSet = unorderedQuestionSet.sort((a, b) => {
            const difficultyA = getDifficulty(a.correctReplies, a.incorrectReplies)
            const difficultyB = getDifficulty(b.correctReplies, b.incorrectReplies)
            if (difficultyB === Infinity) {
              return -1
            }
            if (difficultyA === Infinity) {
              return 1
            }
            return difficultyA - difficultyB
          })

          res.json({
            quizData: record,
            questionSet,
          })
        })
    })
})

function getDifficulty(correct, incorrect) {
  if (!correct && !incorrect) {
    return 0
  } else if (!correct) {
    return Infinity
  }
  return incorrect / correct
}

module.exports = router
