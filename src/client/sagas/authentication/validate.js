import { put } from 'redux-saga/effects'

import { COMPLETE_LOGIN } from '../../reducers/user'

export default function* validate() {
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
