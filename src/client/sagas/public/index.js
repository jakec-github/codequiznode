import { takeEvery } from 'redux-saga/effects'

import { LOAD_QUIZZES, LOAD_QUIZ } from '../../reducers/main'
import getAllQuizzes from './get_all_quizzes'
import getQuiz from './get_quiz'

export default function* watchPublic() {
  yield takeEvery(LOAD_QUIZZES, getAllQuizzes)
  yield takeEvery(LOAD_QUIZ, getQuiz)
}
