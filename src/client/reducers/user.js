export const LOGOUT = 'LOGOUT'
const UPDATE_INPUT = 'UPDATE_INPUT'
export const INITIATE_LOGIN = 'INITIATE_LOGIN'
export const COMPLETE_LOGIN = 'COMPLETE_LOGIN'
export const INITIATE_SIGN_UP = 'INITIATE_SIGN_UP'
export const COMPLETE_SIGN_UP = 'COMPLETE_SIGN_UP'
export const INITIATE_VALIDATION = 'INITIATE_VALIDATION'
const RESET_INPUTS = 'RESET_INPUTS'
export const ADD_SCORE = 'ADD_SCORE'

export const userActionCreators = {
  updateInput: (field, text) => ({ type: UPDATE_INPUT, field, text }),
  handleLogOut: () => ({ type: LOGOUT }),
  initiateSignUp: () => ({ type: INITIATE_SIGN_UP }),
  initiateLogin: () => ({ type: INITIATE_LOGIN }),
  initiateValidation: () => ({ type: INITIATE_VALIDATION }),
  resetInputs: () => ({ type: RESET_INPUTS }),
  addScore: (scores, score) => ({ type: ADD_SCORE, scores, score }),
}

const initialState = {
  username: '',
  authenticated: false,
  loginError: false,
  usernameInput: '',
  passwordInput: '',
  confirmPasswordInput: '',
  scores: [],
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INPUT:
      return {
        ...state,
        [action.field]: action.text,
      }
    case COMPLETE_LOGIN:
      return {
        ...state,
        authenticated: true,
        username: action.username,
        usernameInput: '',
        passwordInput: '',
        confirmPasswordInput: '',
        scores: action.scores,
      }
    case COMPLETE_SIGN_UP:
      return {
        ...state,
        authenticated: true,
        username: action.username,
        usernameInput: '',
        passwordInput: '',
        confirmPasswordInput: '',
      }
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        username: '',
        scores: [],
      }
    case RESET_INPUTS:
      return {
        ...state,
        usernameInput: '',
        passwordInput: '',
        confirmPasswordInput: '',
      }
    case ADD_SCORE:
      return {
        ...state,
        scores: action.scores,
      }
    default:
      return state
  }
}
