export const LOGOUT = 'LOGOUT'
const UPDATE_INPUT = 'UPDATE_INPUT'
export const INITIATE_LOGIN = 'INITIATE_LOGIN'
export const COMPLETE_LOGIN = 'COMPLETE_LOGIN'
export const INITIATE_SIGN_UP = 'INITIATE_SIGN_UP'
export const COMPLETE_SIGN_UP = 'COMPLETE_SIGN_UP'
export const INITIATE_VALIDATION = 'INITIATE_VALIDATION'
const RESET_INPUTS = 'RESET_INPUTS'
export const ADD_SCORE = 'ADD_SCORE'
export const USER_ERROR = 'USER_ERROR'

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
  usernameInput: '',
  passwordInput: '',
  confirmPasswordInput: '',
  scores: [],
  loadingAuth: false,
  loginError: false,
  signupError: false,
  invalidLogin: false,
  errorMessage: '',
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INPUT:
      return {
        ...state,
        [action.field]: action.text,
      }
    case INITIATE_LOGIN:
      return {
        ...state,
        loadingAuth: true,
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
        loadingAuth: false,
        loginError: false,
        invalidLogin: false,
        errorMessage: '',
      }
    case INITIATE_SIGN_UP:
      return {
        ...state,
        loadingAuth: true,
      }
    case COMPLETE_SIGN_UP:
      return {
        ...state,
        authenticated: true,
        username: action.username,
        usernameInput: '',
        passwordInput: '',
        confirmPasswordInput: '',
        signupError: false,
        errorMessage: '',
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
        loginError: false,
        signupError: false,
        invalidLogin: false,
        errorMessage: '',
      }
    case ADD_SCORE:
      return {
        ...state,
        scores: action.scores,
      }
    case USER_ERROR:
      return {
        ...state,
        loadingAuth: false,
        [action.errorType]: true,
        errorMessage: action.message,
      }
    default:
      return state
  }
}
