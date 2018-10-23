import { put, select } from 'redux-saga/effects'

import { COMPLETE_LOGIN, USER_ERROR } from '../../reducers/user'

export default function* login() {
  const username = yield select(state => state.user.usernameInput)
  const password = yield select(state => state.user.passwordInput)
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
        if (response.status === 401) {
          throw new Error('Invalid auth')
        }
        return response
      })
      .then(response => response.json())
    const { token } = user.user
    const { scores, favourites } = user
    localStorage.setItem('jwt', token)
    yield put({ type: COMPLETE_LOGIN, username, scores, favourites })
  } catch (error) {
    if (error.toString() === 'Error: Invalid auth') {
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
    // yield put({ type: COMPLETE_LOGIN })
  }
}
