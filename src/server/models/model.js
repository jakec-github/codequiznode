const mongoose = require('mongoose')

const { Schema } = mongoose

const QuizSchema = new Schema({
  name: String,
  description: String,
  timeLimit: Number,
  featured: Boolean,
  questions: [
    { type: Schema.Types.ObjectId, ref: 'Question' },
  ],
  // Will need to store creator info here
})

const FeaturedSchema = new Schema({
  quizzes: [QuizSchema],
})

const ScoreSchema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
})

// May want to add a table of all quizzes

const UserSchema = new Schema({
  username: Number,
  passwordHash: String,
  salt: String,
  quizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
  scores: [ScoreSchema],
})

const DudSchema = new Schema({
  text: String,
})

const CodeSchema = new Schema({
  type: String,
  sample: String,
})

const QuestionSchema = new Schema({
  text: String,
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


// Would like to condense this code
module.exports.Quiz = Quiz
module.exports.Featured = Featured
module.exports.User = User
module.exports.Question = Question
