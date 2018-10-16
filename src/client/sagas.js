import 'babel-polyfill'

import { put, takeEvery, all, select, call } from 'redux-saga/effects'

import { LOAD_QUIZZES, ADD_QUIZZES, LOAD_QUIZ, ADD_QUIZ, ERROR } from './reducers/main'
import {
  INITIATE_LOGIN,
  COMPLETE_LOGIN,
  LOGOUT,
  INITIATE_SIGN_UP,
  COMPLETE_SIGN_UP,
  INITIATE_VALIDATION,
  ADD_SCORE,
  USER_ERROR,
  INITIATE_ADD_FAVOURITE,
  COMPLETE_ADD_FAVOURITE,
  INITIATE_REMOVE_FAVOURITE,
  COMPLETE_REMOVE_FAVOURITE,
} from './reducers/user'
import { INITIATE_SUBMIT, COMPLETE_SUBMIT } from './reducers/creator'
import { SET_QUESTIONS } from './reducers/question'

// Requires proper error handling
// export function* getAllQuizzes() {
//   try {
//     const result = yield call(fetch, '/public/quiz/all')
//     console.log(result)
//     const allQuizzes = yield call([result, 'json'])
//     console.log('------')
//     console.log(allQuizzes)
//     yield put({ type: ADD_QUIZZES, allQuizzes })
//     return result.status
//   } catch (error) {
//     console.log(error)
//     yield put({
//       type: ERROR,
//       connection: 'allQuizzes',
//       message: 'Failed to load quizzes!',
//       cancelLoad: 'loadingAllQuizzes',
//     })
//     return -1
//   }
// }

// Old version of AllQuizzes
export function* getAllQuizzes() {
  try {
    const allQuizzes = yield fetch('/public/quiz/all')
      .then(response => response.json())
    console.log(allQuizzes)
    yield put({ type: ADD_QUIZZES, allQuizzes })
    console.log('=========')
  } catch (error) {
    console.log(error)
  }
}

function* getQuiz(action) {
  console.log('getting')
  console.log(action.username)
  console.log(action.quizName)
  try {
    const responseBody = yield fetch(`/public/${action.username}/${action.quizName}`)
      .then(response => response.json())

    console.log(responseBody)
    // Try extracting these before sending actions
    yield put({ type: ADD_QUIZ, quizData: responseBody.quizData })
    yield put({ type: SET_QUESTIONS, questionSet: responseBody.questionSet })
  } catch (error) {
    console.log(error)
    yield put({
      type: ERROR,
      connection: 'quiz',
      message: 'Failed to load quiz!',
      cancelLoad: 'loadingQuiz',
    })
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
    const user = yield fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log('-----')
        if (response.status === 401) {
          console.log('throwing')
          throw new Error('Invalid auth')
        }
        console.log('No error')
        return response
      })
      .then(response => response.json())
    const { token } = user.user
    const { scores, favourites } = user
    console.log('-----------')
    console.log(scores)
    localStorage.setItem('jwt', token)
    yield put({ type: COMPLETE_LOGIN, username, scores, favourites })
  } catch (error) {
    if (error.toString() === 'Error: Invalid auth') {
      console.log('Invalid detected')
      yield put({
        type: USER_ERROR,
        errorType: 'invalidLogin',
        message: 'Invalid username or password',
      })
    } else {
      yield put({
        type: USER_ERROR,
        errorType: 'loginError',
        message: 'Login failed!',
      })
    }
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
      const { scores, favourites, user: { username } } = result
      yield put({ type: COMPLETE_LOGIN, username, scores, favourites })
    } catch (error) {
      console.log(error)
    }
  }
}

function* signUp() {
  const username = yield select(state => state.user.usernameInput)
  const password = yield select(state => state.user.passwordInput)
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

    const { token } = loginToken.user
    localStorage.setItem('jwt', token)
    yield put({ type: COMPLETE_SIGN_UP, username })
  } catch (error) {
    yield put({
      type: USER_ERROR,
      errorType: 'signupError',
      message: 'Signup failed!',
    })
    console.log(error)
  }
}

function* logout() {
  yield localStorage.removeItem('jwt')
}

function* addScore({ score }) {
  const jwt = yield localStorage.getItem('jwt')
  // const data = {
  //   quizId: score.quizId,
  //   score: score.score,
  // }
  console.log('Saga')
  console.log(score)

  try {
    const request = yield fetch('/private/score', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${jwt}`,
      },
      body: JSON.stringify(score),
    })
    // .then(response => response.json())

    console.log(request)
  } catch (error) {
    console.log(error)
  }
}

function* favourite({ type, quizId }) {
  const jwt = yield localStorage.getItem('jwt')

  const body = {
    quiz: quizId,
    add: type === INITIATE_ADD_FAVOURITE,
  }

  try {
    const request = yield fetch('/private/favourite', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${jwt}`,
      },
      body: JSON.stringify(body),
    })

    console.log(request)
    if (request.status === 200) {
      yield put({
        type: type === INITIATE_ADD_FAVOURITE
          ? COMPLETE_ADD_FAVOURITE
          : COMPLETE_REMOVE_FAVOURITE,
        quizId,
      })
    }
  } catch (error) {
    console.log(error)
  }
}

function* submit() {
  console.log('Detected initate')
  const jwt = yield localStorage.getItem('jwt')
  const quiz = yield select(state => state.creator.quiz)
  // const questions = yield select(state => state.creator.questions)
  // quiz.questions = questions
  try {
    console.log('Sending fetch request')
    const response = yield fetch('/private/quiz/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${jwt}`,
      },
      body: JSON.stringify(quiz),
    })
      .then(data => data.json())
    console.log('About to complete')
    yield put({ type: COMPLETE_SUBMIT, newQuiz: response.quiz })
  } catch (error) {
    console.log(error)
  }
}

function* watch() {
  yield takeEvery(LOAD_QUIZZES, getAllQuizzes)
  yield takeEvery(LOAD_QUIZ, getQuiz)
  yield takeEvery(INITIATE_LOGIN, login)
  yield takeEvery(LOGOUT, logout)
  yield takeEvery(INITIATE_VALIDATION, validate)
  yield takeEvery(INITIATE_SIGN_UP, signUp)
  yield takeEvery(ADD_SCORE, addScore)
  yield takeEvery(INITIATE_SUBMIT, submit)
  yield takeEvery(INITIATE_ADD_FAVOURITE, favourite)
  yield takeEvery(INITIATE_REMOVE_FAVOURITE, favourite)
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
