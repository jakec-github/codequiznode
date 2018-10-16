export const LOAD_QUIZZES = 'LOAD_QUIZZES'
export const ADD_QUIZZES = 'ADD_QUIZZES'
export const LOAD_QUIZ = 'LOAD_QUIZ'
export const COMPLETE_LOAD_QUIZ = 'COMPLETE_LOAD_QUIZ'
export const UPDATE_QUIZ_PROGRESS = 'UPDATE_QUIZ_PROGRESS'
export const ERROR = 'ERROR'
export const SEND_DIFFICULTY = 'SEND_DIFFICULTY'

export const mainActionCreators = {
  loadQuizzes: () => ({ type: LOAD_QUIZZES }),
  addQuizzes: allQuizzes => ({ type: ADD_QUIZZES, allQuizzes }),
  loadQuiz: (username, quizName) => ({ type: LOAD_QUIZ, username, quizName }),
  // completeLoadQuiz: quizData => ({ type: COMPLETE_LOAD_QUIZ, quizData }),
  updateQuizProgress: quizProgress => ({ type: UPDATE_QUIZ_PROGRESS, quizProgress }),
  sendDifficulty: (_id, correct) => ({ type: SEND_DIFFICULTY, _id, correct }),
}

const initialState = {
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
    case COMPLETE_LOAD_QUIZ:
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
