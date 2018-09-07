import { runSaga } from 'redux-saga'
// import 'node-fetch'
import fetchMock from 'fetch-mock'

import { getAllQuizzes } from './sagas'

// const dispatched = []

// const saga = runSaga({
//   dispatch: action => dispatched.push(action),
// }, getAllQuizzes)

// I have installed fetch-mock and node-fetch as dependencies locally.
// Looks like that is not going to work. May have to remove them

describe('getAllQuizzes', () => {
  const dispatched = []

  beforeAll(() => {
    fetchMock.mock('*', {
      hello: 'there',
    })
  })

  test('should work', async () => {
    const result = await runSaga({
      dispatch: action => dispatched.push(action),
    }, getAllQuizzes)

    await console.log(result)
  })
})
