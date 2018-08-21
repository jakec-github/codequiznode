
export const LOGOUT = 'LOGOUT'
const UPDATE_INPUT = 'UPDATE_INPUT'
export const INITIATE_LOGIN = 'INITIATE_LOGIN'
export const COMPLETE_LOGIN = 'COMPLETE_LOGIN'
export const INITIATE_SIGN_UP = 'INITIATE_SIGN_UP'
export const COMPLETE_SIGN_UP = 'COMPLETE_SIGN_UP'
export const INITIATE_VALIDATION = 'INITIATE_VALIDATION'
const RESET_INPUTS = 'RESET_INPUTS'

export const userActionCreators = {
  updateInput: (field, text) => ({ type: UPDATE_INPUT, field, text }),
  handleLogOut: () => ({ type: LOGOUT }),
  initiateSignUp: () => ({ type: INITIATE_SIGN_UP }),
  initiateLogin: () => ({ type: INITIATE_LOGIN }),
  initiateValidation: () => ({ type: INITIATE_VALIDATION }),
  resetInputs: () => ({ type: RESET_INPUTS }),
}

const initialState = {
  username: '',
  loggedIn: false,
  loginError: false,
  usernameInput: '',
  passwordInput: '',
  confirmPasswordInput: '',
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INPUT:
      console.log(action.field)
      console.log(action.text)
      return {
        ...state,
        [action.field]: action.text,
      }
    case COMPLETE_LOGIN:
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        usernameInput: '',
        passwordInput: '',
        confirmPasswordInput: '',

      }
    case COMPLETE_SIGN_UP:
      return {
        ...state,
        loggedIn: true,
        username: action.username,
        usernameInput: '',
        passwordInput: '',
        confirmPasswordInput: '',
      }
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        username: '',
      }
    case RESET_INPUTS:
      return {
        ...state,
        usernameInput: '',
        passwordInput: '',
        confirmPasswordInput: '',
      }
    default:
      return state
  }
}
