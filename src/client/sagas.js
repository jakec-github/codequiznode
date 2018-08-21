import 'babel-polyfill'

import { put, takeEvery, all, select } from 'redux-saga/effects'

import { LOAD_QUIZZES, ADD_QUIZZES, LOAD_QUIZ, ADD_QUIZ } from './reducers/main'
import { INITIATE_LOGIN, COMPLETE_LOGIN, LOGOUT, INITIATE_SIGN_UP, COMPLETE_SIGN_UP, INITIATE_VALIDATION } from './reducers/user'
import { SET_QUESTIONS } from './reducers/question'

// Requires proper error handling
function* getAllQuizzes() {
  try {
    const allQuizzes = yield fetch('/public/quiz/all')
      .then(response => response.json())

    yield put({ type: ADD_QUIZZES, allQuizzes })
  } catch (error) {
    console.log(error)
  }
}

function* getQuiz(action) {
  try {
    const responseBody = yield fetch(`/public/quiz/${action.quizId}`)
      .then(response => response.json())

    console.log(responseBody)
    // Try extracting these before sending actions
    yield put({ type: ADD_QUIZ, quizData: responseBody.quizData })
    yield put({ type: SET_QUESTIONS, questionSet: responseBody.questionSet })
  } catch (error) {
    console.log(error)
  }
}

function* login() {
  const username = yield select(state => state.user.usernameInput)
  const password = yield select(state => state.user.passwordInput)
  console.log('++++++++')
  console.log(username, password)
  const data = {
    user: {
      username,
      password,
    },
  }

  try {
    const loginToken = yield fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())

    console.log(loginToken)
    const { token } = loginToken.user
    localStorage.setItem('jwt', token)
    yield put({ type: COMPLETE_LOGIN, username })
  } catch (error) {
    console.log(error)
    // yield put({ type: COMPLETE_LOGIN })
  }
}

function* validate() {
  const jwt = localStorage.getItem('jwt')

  if (jwt) {
    const headers = new Headers()
    headers.append('Authorization', `Token ${jwt}`)

    try {
      const result = yield fetch('/auth/validate', {
        headers,
      })
        .then(response => response.json())

      console.log(result)
      const { username } = result.user
      yield put({ type: COMPLETE_LOGIN, username })
    } catch (error) {
      console.log(error)
    }
  }
}

function* signUp() {
  const username = yield select(state => state.user.usernameInput)
  const password = yield select(state => state.user.passwordInput)
  console.log('++++++++')
  console.log(username, password)
  const data = {
    user: {
      username,
      password,
    },
  }

  try {
    const loginToken = yield fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())

    console.log(loginToken)
    const { token } = loginToken.user
    localStorage.setItem('jwt', token)
    yield put({ type: COMPLETE_SIGN_UP, username })
  } catch (error) {
    console.log(error)
    // yield put({ type: COMPLETE_LOGIN })
  }
}

function* logout() {
  yield localStorage.removeItem('jwt')
}

function* watch() {
  yield takeEvery(LOAD_QUIZZES, getAllQuizzes)
  yield takeEvery(LOAD_QUIZ, getQuiz)
  yield takeEvery(INITIATE_LOGIN, login)
  yield takeEvery(LOGOUT, logout)
  yield takeEvery(INITIATE_VALIDATION, validate)
  yield takeEvery(INITIATE_SIGN_UP, signUp)
}

function* checkSaga() {
  console.log('Saga started')
  yield
}

export default function* rootSaga() {
  yield all([
    checkSaga(),
    watch(),
  ])
}
