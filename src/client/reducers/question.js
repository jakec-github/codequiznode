const ITERATE_QUESTION = 'ITERATE_QUESTION'
const RESET_QUIZ = 'RESET_QUESTION'
const ITERATE_SCORE = 'ITERATE_SCORE'
const SELECT_QUIZ = 'SELECT_QUIZ'
export const SET_QUESTIONS = 'SET_QUESTIONS'

export const questionActionCreators = {
  iterateQuestion: () => ({ type: ITERATE_QUESTION }),
  resetQuiz: () => ({ type: RESET_QUIZ }),
  iterateScore: () => ({ type: ITERATE_SCORE }),
  // selectQuiz: quizId => ({ type: SELECT_QUIZ, quizId }),
  setQuestions: questionSet => ({ type: SET_QUESTIONS, questionSet }),
}

const initialState = {
  questionNumber: 0,
  questionSet: [],
  score: 0,
}

export const question = (state = initialState, action) => {
  switch (action.type) {
    case ITERATE_QUESTION:
      return Object.assign({}, state, {
        questionNumber: state.questionNumber + 1,
      })
    case RESET_QUIZ:
      return Object.assign({}, state, {
        questionNumber: 0,
        score: 0,
      })
    case ITERATE_SCORE:
      return Object.assign({}, state, {
        score: state.score + 1,
      })
    // I believe this action is no longer used
    // case SELECT_QUIZ:
    //   return Object.assign({}, state, {
    //     quizId: action.quizId,
    //   })
    case SET_QUESTIONS:
      return Object.assign({}, state, {
        questionSet: action.questionSet,
        quizId: action.quizId,
      })
    default:
      return state
  }
}
