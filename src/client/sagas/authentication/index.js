import { takeEvery } from 'redux-saga/effects'

import { INITIATE_LOGIN, INITIATE_VALIDATION, INITIATE_SIGN_UP, LOGOUT } from '../../reducers/user'
import login from './login'
import validate from './validate'
import signUp from './sign_up'
import logOut from './log_out'

export default function* watchAuthentication() {
  yield takeEvery(INITIATE_LOGIN, login)
  yield takeEvery(INITIATE_VALIDATION, validate)
  yield takeEvery(INITIATE_SIGN_UP, signUp)
  yield takeEvery(LOGOUT, logOut)
}
