import { put } from 'redux-saga/effects'

import { INITIATE_ADD_FAVOURITE, COMPLETE_ADD_FAVOURITE, COMPLETE_REMOVE_FAVOURITE } from '../../reducers/user'

export default function* favourite({ type, quizId }) {
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
