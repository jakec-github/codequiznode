const CHANGE_LOCATION = 'CHANGE_LOCATION'
const UPDATE_QUESTION_PROGRESS = 'UPDATE_QUESTION_PROGRESS'
export const LOAD_QUIZZES = 'LOAD_QUIZZES'
export const ADD_QUIZZES = 'ADD_QUIZZES'
export const LOAD_QUIZ = 'LOAD_QUIZ'
export const ADD_QUIZ = 'ADD_QUIZ'
export const UPDATE_QUIZ_PROGRESS = 'UPDATE_QUIZ_PROGRESS'
export const ERROR = 'ERROR'

export const mainActionCreators = {
  changeLocation: location => ({ type: CHANGE_LOCATION, location }),
  loadQuizzes: () => ({ type: LOAD_QUIZZES }),
  addQuizzes: allQuizzes => ({ type: ADD_QUIZZES, allQuizzes }),
  loadQuiz: (username, quizName) => ({ type: LOAD_QUIZ, username, quizName }),
  addQuiz: quizData => ({ type: ADD_QUIZ, quizData }),
  updateQuizProgress: quizProgress => ({ type: UPDATE_QUIZ_PROGRESS, quizProgress }),
  updateQuestionProgress: questionProgress =>
    ({ type: UPDATE_QUESTION_PROGRESS, questionProgress }),
}

const initialState = {
  location: 'home',
  // Should move to question reducer
  questionProgress: 'question',
  quizProgress: 'start',
  allQuizzes: [],
  loadingAllQuizzes: false,
  quizData: {
    _id: 0,
    name: '',
    description: '',
    timeLimit: 0,
    featured: false,
    __v: 0,
  },
  loadingQuiz: false,
  errors: [],
}

export const main = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCATION:
      return {
        ...state,
        location: action.location,
      }
    case UPDATE_QUESTION_PROGRESS:
      return {
        ...state,
        questionProgress: action.questionProgress,
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
        loadingAllQuizzes: false,
        errors: state.errors.filter(error => error.connection !== 'allQuizzes'),
      }
    case LOAD_QUIZ:
      return {
        ...state,
        loadingQuiz: true,
      }
    // I don't think this action is well named
    case ADD_QUIZ:
      return {
        ...state,
        quizData: action.quizData,
        loadingQuiz: false,
        errors: state.errors.filter(error => error.connection !== 'quiz'),
      }
    case UPDATE_QUIZ_PROGRESS:
      return {
        ...state,
        quizProgress: action.quizProgress,
      }
    case ERROR:
      return {
        ...state,
        [action.cancelLoad]: false,
        errors: [
          ...state.errors,
          {
            connection: action.connection,
            message: action.message,
          },
        ],
      }
    default:
      return state
  }
}
