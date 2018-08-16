import 'babel-polyfill'

import { put, takeEvery, all } from 'redux-saga/effects'

import { LOAD_QUIZZES, ADD_QUIZZES, LOAD_QUIZ, ADD_QUIZ } from './reducers/main'
import { LOGIN } from './reducers/user'
import { SET_QUESTIONS } from './reducers/question'

// Requires proper error handling
function* getAllQuizzes() {
  try {
    const allQuizzes = yield fetch('/public/quiz/all')
      .then(data => data.json())

    yield put({ type: ADD_QUIZZES, allQuizzes })
  } catch (error) {
    console.log(error)
  }
}

function* getQuiz(action) {
  try {
    const responseBody = yield fetch(`/public/quiz/${action.quizId}`)
      .then(data => data.json())

    console.log(responseBody)
    // Try extracting these before sending actions
    yield put({ type: ADD_QUIZ, quizData: responseBody.quizData })
    yield put({ type: SET_QUESTIONS, questionSet: responseBody.questionSet })
  } catch (error) {
    console.log(error)
  }
}

function* login() {
  console.log('Login detected')
  yield
  // yield put({ type: '' })
}


function* watchLogin() {
  yield takeEvery(LOGIN, login) // Should import from ./reducers.user.js
  yield takeEvery(LOAD_QUIZZES, getAllQuizzes)
  yield takeEvery(LOAD_QUIZ, getQuiz)
}

function* checkSaga() {
  console.log('Saga started')
  yield
}

export default function* rootSaga() {
  yield all([
    checkSaga(),
    watchLogin(),
  ])
}

// import { put, takeEvery, all, select } from 'redux-saga/effects'
//
// import { UPDATE_STATUS } from './reducers/main'
// import { UPDATE_RESULTS } from './reducers/search_results'
//
// function* submit() {
//   // Runs API call when triggered
//   const query = yield select(state => state.searchInput.input)
//
//   const results = yield fetch(`https://blend.media/api/content?q=${query}`)
//     .then(response => response.json())
//     .then(data => data.items)
//   yield put({ type: UPDATE_STATUS, status: 'full' })
//   yield put({ type: UPDATE_RESULTS, results })
// }
//
// function* watchSubmit() {
//   // Monitors UPDATE_STATUS for the 'loading' status and triggers submit()
//   yield takeEvery(action => action.type === UPDATE_STATUS && action.status === 'loading', submit)
// }
//
// function* checkSaga() {
//   // This saga was originally for verifying that redux-saga was working but
//   // I have left it in to deomonstrate use of the all() effect
//   console.log('Saga started')
//   yield
// }
//
// export default function* rootSaga() {
//   yield all([
//     checkSaga(),
//     watchSubmit(),
//   ])
// }
