import { put, select } from 'redux-saga/effects'

import { COMPLETE_LOGIN, USER_ERROR } from '../../reducers/user'

export default function* login() {
  const username = yield select(state => state.user.usernameInput)
  const password = yield select(state => state.user.passwordInput)
  console.log('++++++++')
  console.log(username, password)
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
        console.log('-----')
        if (response.status === 401) {
          console.log('throwing')
          throw new Error('Invalid auth')
        }
        console.log('No error')
        return response
      })
      .then(response => response.json())
    const { token } = user.user
    const { scores, favourites } = user
    console.log('-----------')
    console.log(scores)
    localStorage.setItem('jwt', token)
    yield put({ type: COMPLETE_LOGIN, username, scores, favourites })
  } catch (error) {
    if (error.toString() === 'Error: Invalid auth') {
      console.log('Invalid detected')
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
    console.log(error)
    // yield put({ type: COMPLETE_LOGIN })
  }
}
