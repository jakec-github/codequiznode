import { put, select } from 'redux-saga/effects'

import { COMPLETE_SUBMIT } from '../../reducers/creator'

export default function* submit() {
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
