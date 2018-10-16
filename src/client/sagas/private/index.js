import { takeEvery } from 'redux-saga/effects'

import { ADD_SCORE, INITIATE_ADD_FAVOURITE, INITIATE_REMOVE_FAVOURITE } from '../../reducers/user'
import { INITIATE_SUBMIT } from '../../reducers/creator'
import addScore from './add_score'
import favourite from './favourite'
import submit from './submit'

export default function* watchPrivate() {
  yield takeEvery(ADD_SCORE, addScore)
  yield takeEvery(INITIATE_ADD_FAVOURITE, favourite)
  yield takeEvery(INITIATE_REMOVE_FAVOURITE, favourite)
  yield takeEvery(INITIATE_SUBMIT, submit)
}
