import { takeEvery } from 'redux-saga/effects'

import { LOAD_QUIZZES, LOAD_QUIZ, SEND_DIFFICULTY } from '../../reducers/main'
import getAllQuizzes from './get_all_quizzes'
import getQuiz from './get_quiz'
import difficulty from './difficulty'

export default function* watchPublic() {
  yield takeEvery(LOAD_QUIZZES, getAllQuizzes)
  yield takeEvery(LOAD_QUIZ, getQuiz)
  yield takeEvery(SEND_DIFFICULTY, difficulty)
}
