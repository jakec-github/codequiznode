import 'babel-polyfill'
import { all } from 'redux-saga/effects'

import watchAuthentication from './authentication/index'
import watchPrivate from './private/index'
import watchPublic from './public/index'

// import { LOAD_QUIZZES, ADD_QUIZZES, LOAD_QUIZ, COMPLETE_LOAD_QUIZ, ERROR } from './reducers/main'
// import {
//   INITIATE_LOGIN,
//   COMPLETE_LOGIN,
//   LOGOUT,
//   INITIATE_SIGN_UP,
//   COMPLETE_SIGN_UP,
//   INITIATE_VALIDATION,
//   ADD_SCORE,
//   USER_ERROR,
//   INITIATE_ADD_FAVOURITE,
//   COMPLETE_ADD_FAVOURITE,
//   INITIATE_REMOVE_FAVOURITE,
//   COMPLETE_REMOVE_FAVOURITE,
// } from './reducers/user'
// import { INITIATE_SUBMIT, COMPLETE_SUBMIT } from './reducers/creator'
// import { SET_QUESTIONS } from './reducers/question'

// function* checkSaga() {
//   console.log('Saga started')
//   yield
// }

export default function* rootSaga() {
  yield all([
    watchAuthentication(),
    watchPrivate(),
    watchPublic(),
  ])
}
