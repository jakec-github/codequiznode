const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const JWTsecret = process.env.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : 'password123'

const { Schema } = mongoose

const QuizSchema = new Schema({
  name: String,
  description: String,
  timeLimit: Number,
  featured: Boolean,
  questions: [
    { type: Schema.Types.ObjectId, ref: 'Question' },
  ],
  creator: String,
})

const FeaturedSchema = new Schema({
  quizzes: [QuizSchema],
})

const ScoreSchema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
})

// May want to add a table of all quizzes

// This user schema should be moved into its own file
// Need to generate secret sensibly
const UserSchema = new Schema({
  username: String,
  hash: String,
  salt: String,
  quizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
  favourites: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
  scores: [ScoreSchema],
})

UserSchema.methods.setPassword = setPassword
UserSchema.methods.validatePassword = validatePassword
UserSchema.methods.generateJWT = generateJWT
UserSchema.methods.toAuthJSON = toAuthJSON

const DudSchema = new Schema({
  text: String,
})

const CodeSchema = new Schema({
  language: String,
  contents: String,
})

const QuestionSchema = new Schema({
  question: String,
  answer: String,
  explanation: String,
  correctReplies: Number,
  incorrectReplies: Number,
  duds: [DudSchema],
  codes: [CodeSchema],
  quizzes: [
    { type: Schema.Types.ObjectId, ref: 'Quiz' },
  ],
})

const Quiz = mongoose.model('Quiz', QuizSchema)
const Featured = mongoose.model('Featured', FeaturedSchema)
const User = mongoose.model('User', UserSchema)
const Question = mongoose.model('Question', QuestionSchema)

function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

function validatePassword(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

function generateJWT() {
  const today = new Date()
  const expirationDate = new Date(today)
  // May want to configure expiry
  expirationDate.setDate(today.getDate() + 60)

  return jwt.sign({
    username: this.username,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, JWTsecret)
}

function toAuthJSON() {
  return {
    _id: this._id,
    username: this.username,
    token: this.generateJWT(),
  }
}

// Would like to condense this code
module.exports.Quiz = Quiz
module.exports.Featured = Featured
module.exports.User = User
module.exports.Question = Question
