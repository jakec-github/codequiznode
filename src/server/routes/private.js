const express = require('express')

const Model = require('../models/model')
const auth = require('../auth')

const { User } = Model

const router = express.Router()

// This route will need data validation
router.post('/score', auth.required, (req, res) => {
  const score = req.body
  const { username } = req.payload

  User.findOne({ username })
    .then((record) => {
      console.log('Found user and updating scores')
      console.log(record.scores)
      console.log(score)
      const index = record.scores.findIndex((oldScore) => {
        console.log('In the loop')
        console.log(typeof oldScore.quiz)
        console.log(typeof score.quiz)
        return oldScore.quiz.toString() === score.quiz
      })
      console.log(index)
      if (index > -1) {
        record.scores[index].remove()
        console.log('removed old scores')
      }
      console.log(record.scores)
      record.scores.push(score)
      console.log('Pushed new score')
      console.log(record.scores)
      record.save()
        .then(() => {
          console.log('saved')
          res.sendStatus(200)
        })
        .catch((error) => {
          console.log(error)
        })

      // if ((highScore.length && score <= highScore[0].score)) {
      //   console.log('Didn\'t actually do anything')
      //   res.sendStatus(200)
      // } else {
      //   record.scores.push({
      //     quiz: quizId,
      //     score,
      //   })
      //   record.save()
      //     .then(() => {
      //       console.log('Saved')
      //       res.sendStatus(200)
      //     })
      // }
    })
})

module.exports = router
