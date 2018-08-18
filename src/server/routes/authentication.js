const express = require('express')
const passport = require('passport')

const auth = require('../auth')
const Model = require('../models/model')

const { User } = Model
const router = express.Router()

// router.use('/users', require('./users'))

// POST new user route (optional, everyone has access)
router.post('/register', auth.optional, (req, res) => {
  console.log('Register reached')
  const { body: { user } } = req
  // A lot more validation required here
  if (!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    })
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    })
  }
  console.log('Passed validation')
  console.log(user)
  const finalUser = new User(user)

  console.log(finalUser)

  finalUser.setPassword(user.password)
  console.log('About to save user')
  return finalUser.save()
    .then(() => {
      console.log('Saved user')
      res.json({ user: finalUser.toAuthJSON() })
    })
})

// POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req

  if (!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    })
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    })
  }

  return passport.authenticate('local', { session: false }, (error, passportUser) => {
    if (error) {
      return next(error)
    }

    if (passportUser) {
      const newUser = passportUser
      newUser.token = passportUser.generateJWT()

      return res.json({ user: newUser.toAuthJSON() })
    }
    // May need to remove res
    return res.status(400).info
  })(req, res, next)
})

// GET current route (required, only authenticated users have access)
// This is a test route
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req

  return User.findById(id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(400)
      }

      return res.json({ user: user.toAuthJSON() })
    })
})

module.exports = router
