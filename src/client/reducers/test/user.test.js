import { user, COMPLETE_LOGIN } from '../user'

describe('User Reducer', () => {
  const initialState = {
    username: '',
    loggedIn: false,
    loginError: false,
    usernameInput: '',
    passwordInput: '',
    confirmPasswordInput: '',
    scores: [],
  }

  test('should return intial state', () => {
    expect(user(undefined, {})).toEqual(initialState)
  })

  test('should login handle login correctly', () => {
    const oldState = {
      username: '',
      loggedIn: false,
      loginError: false,
      usernameInput: 'something',
      passwordInput: 'password',
      confirmPasswordInput: 'password',
      scores: [],
    }

    const action = {
      type: COMPLETE_LOGIN,
      username: 'username',
      scores: [
        {
          quiz: '1',
          score: 2,
        },
      ],
    }

    expect(user(oldState, action)).toEqual({
      username: 'username',
      loggedIn: true,
      loginError: false,
      usernameInput: '',
      passwordInput: '',
      confirmPasswordInput: '',
      scores: [
        {
          quiz: '1',
          score: 2,
        },
      ],
    })
  })
})
