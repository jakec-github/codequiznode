import 'babel-polyfill'

import { put, takeEvery, all } from 'redux-saga/effects'

import { LOAD_QUIZZES, ADD_QUIZZES } from './reducers/main'

// Requires error handling
function* getAllQuizzes() {
  const allQuizzes = yield fetch('/public/quiz/all')
    .then(data => data.json())

  yield put({ type: ADD_QUIZZES, allQuizzes })
}

function* login() {
  console.log('Login detected')
  yield
  // yield put({ type: '' })
}

// fetch('/allquizzes')
//   .then(data => data.json())
//   .then((data) => {
//     console.log(data)
//     this.setState({ allQuizzes: data })
//
//     if (this.props.loggedIn) {
//       const query = {
//         user_id: parseInt(this.props.userId, 10),
//       }
//       return fetch('/userscores', {
//         method: 'post',
//         headers: {
//           'Content-type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(query),
//       })
//     }
//     return false
//   })
//   .then(data => (data ? data.json() : false))
//   .then((data) => {
//     console.log('All scores for user')
//     console.log(data)
//     this.setState({ allScores: data || [] })
//   })

function* watchLogin() {
  yield takeEvery('LOGIN', login) // Should import from ./reducers.user.js
  yield takeEvery('LOAD_QUIZZES', getAllQuizzes)
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
