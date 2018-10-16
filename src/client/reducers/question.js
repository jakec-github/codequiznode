export const ITERATE_QUESTION = 'ITERATE_QUESTION'
export const RESET_QUIZ = 'RESET_QUESTION'
export const ITERATE_SCORE = 'ITERATE_SCORE'
export const SET_QUESTIONS = 'SET_QUESTIONS'
const SET_TIMER = 'SET_TIMER'
const COUNT_TIMER = 'COUNT_TIMER'
const UPDATE_PROGRESS = 'UPDATE_PROGRESS'

export const questionActionCreators = {
  iterateQuestion: () => ({ type: ITERATE_QUESTION }),
  resetQuiz: () => ({ type: RESET_QUIZ }),
  iterateScore: () => ({ type: ITERATE_SCORE }),
  setQuestions: questionSet => ({ type: SET_QUESTIONS, questionSet }),
  setTimer: timeLimit => ({ type: SET_TIMER, timeLimit }),
  countTimer: () => ({ type: COUNT_TIMER }),
  updateProgress: progress => ({ type: UPDATE_PROGRESS, progress }),
}

const initialState = {
  progress: 'question',
  questionNumber: 0,
  questionSet: [],
  score: 0,
  timer: 0,
}

export const question = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROGRESS:
      return {
        ...state,
        progress: action.progress,
      }
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
    case SET_TIMER:
      return {
        ...state,
        timer: action.timeLimit,
      }
    case COUNT_TIMER:
      return {
        ...state,
        timer: state.timer - 1,
      }
    default:
      return state
  }
}
