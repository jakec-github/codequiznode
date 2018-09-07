export const ITERATE_QUESTION = 'ITERATE_QUESTION'
export const RESET_QUIZ = 'RESET_QUESTION'
export const ITERATE_SCORE = 'ITERATE_SCORE'
export const SET_QUESTIONS = 'SET_QUESTIONS'

export const questionActionCreators = {
  iterateQuestion: () => ({ type: ITERATE_QUESTION }),
  resetQuiz: () => ({ type: RESET_QUIZ }),
  iterateScore: () => ({ type: ITERATE_SCORE }),
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
      return {
        ...state,
        questionNumber: state.questionNumber + 1,
      }
    case RESET_QUIZ:
      return {
        ...state,
        questionNumber: 0,
        score: 0,
      }
    case ITERATE_SCORE:
      return {
        ...state,
        score: state.score + 1,
      }
    case SET_QUESTIONS:
      return {
        ...state,
        questionSet: action.questionSet,
        quizId: action.quizId,
      }
    default:
      return state
  }
}
