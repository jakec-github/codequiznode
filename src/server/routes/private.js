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
      const index = record.scores
        .findIndex(oldScore => oldScore.quiz.toString() === score.quiz)
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

router.post('/favourite', auth.required, (req, res) => {
  const { quiz, add } = req.body
  const { username } = req.payload
  User.findOne({ username })
    .then((record) => {
      if (add) {
        const alreadyFavourite = record.favourites
          .some(favourite => favourite.toString() === quiz)
        if (alreadyFavourite) {
          console.log('ALready favourited')
          // handle response
        } else {
          record.favourites.push(quiz)
          record.save()
            .then(() => {
              res.sendStatus(200)
            })
            .catch((error) => {
              console.log(error)
              // handle response
            })
        }
      } else {
        const index = record.favourites
          .findIndex(favourite => favourite.toString() === quiz)
        if (index > -1) {
          record.favourites.remove(quiz)
          record.save()
            .then(() => {
              res.sendStatus(200)
            })
            .catch((error) => {
              console.log(error)
              // handle response
            })
        } else {
          console.log('Not favourite')
          // handle response
        }
      }
    })
})

// Further validation required
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
    || questions.length < 3
  ) {
    return res.sendStatus(400) // Must return here to prevent db save
  }
  Quiz.findOne({
    name: title,
    creator: username,
  })
    .then((record) => {
      console.log('record', record)
      if (record !== null) {
        // return Promise.reject('Quiz titles must be unique')
        throw new Error('Quiz titles must be unique')
      }
      console.log('Passed validation')
    })
    .then(() => {
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

      return Question.insertMany(newQuestions)
    })
    .then((savedQuestions) => {
      const newQuiz = new Quiz({
        name: title,
        description,
        timeLimit: timer * 60,
        featured: false,
        questions: savedQuestions.map(question => question._id),
        creator: username,
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
      console.log(error.toString())
      if (error.toString() === 'Error: Quiz titles must be unique') {
        console.log('returning')
        res.status(400)
        return res.json({
          error: 'Quiz must have new name',
        })
        // return res.sendStatus(400)
      }
      console.log(error)
    })
})

module.exports = router
