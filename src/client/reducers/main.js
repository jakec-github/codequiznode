const CHANGE_LOCATION = 'CHANGE_LOCATION'
const CHANGE_QUESTION_STATUS = 'CHANGE_QUESTION_STATUS'
export const LOAD_QUIZZES = 'LOAD_QUIZZES'
export const ADD_QUIZZES = 'ADD_QUIZZES'

export const mainActionCreators = {
  changeLocation: location => ({ type: CHANGE_LOCATION, location }),
  changeQuestionStatus: questionStatus => ({ type: CHANGE_QUESTION_STATUS, questionStatus }),
  loadQuizzes: () => ({ type: LOAD_QUIZZES }),
  addQuizzes: allQuizzes => ({ type: ADD_QUIZZES, allQuizzes }),
}

const initialState = {
  location: 'home',
  // Probably want to come up with better values for this one
  questionStatus: 'answers',
  allQuizzes: [],
  loadingAllQuizzes: false,
}

export const main = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCATION:
      return {
        ...state,
        location: action.location,
      }
    case CHANGE_QUESTION_STATUS:
      return {
        ...state,
        questionStatus: action.questionStatus,
      }
    case LOAD_QUIZZES:
      return {
        ...state,
        loadingAllQuizzes: true,
      }
    case ADD_QUIZZES:
      return {
        ...state,
        allQuizzes: action.allQuizzes,
        loadingAllQuizzes: true,
      }
    default:
      return state
  }
}
