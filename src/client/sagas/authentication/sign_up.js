import { put, select } from 'redux-saga/effects'

import { COMPLETE_SIGN_UP, USER_ERROR } from '../../reducers/user'

export default function* signUp() {
  const username = yield select(state => state.user.usernameInput)
  const password = yield select(state => state.user.passwordInput)
  const data = {
    user: {
      username,
      password,
    },
  }

  try {
    let status

    const loginToken = yield fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        ({ status } = response)
        return response
      })
      .then(response => response.json())

    if (status === 400) {
      throw new Error(loginToken.error)
    }

    const { token } = loginToken.user
    localStorage.setItem('jwt', token)
    yield put({ type: COMPLETE_SIGN_UP, username })
  } catch (error) {
    yield put({
      type: USER_ERROR,
      errorType: 'signupError',
      message: error.toString() === 'Error: Username already taken'
        ? 'Username already taken'
        : 'Signup failed!',
    })
  }
}
