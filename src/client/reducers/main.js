const CHANGE_LOCATION = 'CHANGE_LOCATION'
const CHANGE_QUESTION_STATUS = 'CHANGE_QUESTION_STATUS'
export const LOAD_QUIZZES = 'LOAD_QUIZZES'
export const ADD_QUIZZES = 'ADD_QUIZZES'
export const LOAD_QUIZ = 'LOAD_QUIZ'
export const ADD_QUIZ = 'ADD_QUIZ'

export const mainActionCreators = {
  changeLocation: location => ({ type: CHANGE_LOCATION, location }),
  changeQuestionStatus: questionStatus => ({ type: CHANGE_QUESTION_STATUS, questionStatus }),
  loadQuizzes: () => ({ type: LOAD_QUIZZES }),
  addQuizzes: allQuizzes => ({ type: ADD_QUIZZES, allQuizzes }),
  loadQuiz: quizId => ({ type: LOAD_QUIZ, quizId }),
  addQuiz: quizData => ({ type: ADD_QUIZ, quizData }),
}

const initialState = {
  location: 'home',
  // Probably want to come up with better values for this one
  questionStatus: 'answers',
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
        loadingAllQuizzes: false,
      }
    case LOAD_QUIZ:
      return {
        ...state,
        loadQuiz: true,
      }
    case ADD_QUIZ:
      return {
        ...state,
        quizData: action.quizData,
        loadQuiz: false,
      }
    default:
      return state
  }
}
