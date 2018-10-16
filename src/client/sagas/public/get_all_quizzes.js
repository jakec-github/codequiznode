import { put } from 'redux-saga/effects'

import { ADD_QUIZZES } from '../../reducers/main'

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

export default function* getAllQuizzes() {
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
