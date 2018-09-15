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
  beforeAll(() => {
    // fetchMock.mock('*', {
    //   hello: 'there',
    // })
    // fetch
    // console.log(global)
    // fetch = jest.fn().mockImplementation(() => {
    //   Promise.resolve({
    //     ok: true,
    //     CorrelationId: '123',
    //     json: () => ({
    //       passed: 'ok',
    //     }),
    //   })
    // })

    // console.log(global.fetch)
  })

  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })


  test('should work', async () => {
    const dispatched = []
    const body = {
      json: () => {
        Promise.resolve({
          ok: true,
          CorrelationId: '123',
          json: () => ({
            passed: 'ok--------------------',
          }),
        })
      },
    }
    const response = {
      body: { passed: 'ok' },
      status: 200,
    }
    console.log('#######################')
    fetchMock.getOnce('/public/quiz/all', response)
    const result = await runSaga({
      dispatch: action => dispatched.push(action),
    }, getAllQuizzes).done

    await console.log(result)
    await console.log(dispatched)
    // expect(2)
  })
})
