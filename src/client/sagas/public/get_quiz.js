import { put } from 'redux-saga/effects'

import { COMPLETE_LOAD_QUIZ, ERROR } from '../../reducers/main'
import { SET_QUESTIONS } from '../../reducers/question'

export default function* getQuiz(action) {
  try {
    const responseBody = yield fetch(`/public/${action.username}/${action.quizName}`)
      .then(response => response.json())
    // Try extracting these before sending actions
    yield put({ type: COMPLETE_LOAD_QUIZ, quizData: responseBody.quizData })
    yield put({ type: SET_QUESTIONS, questionSet: responseBody.questionSet })
  } catch (error) {
    yield put({
      type: ERROR,
      connection: 'quiz',
      message: 'Failed to load quiz!',
      cancelLoad: 'loadingQuiz',
    })
  }
}
