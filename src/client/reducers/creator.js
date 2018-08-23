const CHANGE_CREATOR_POSITION = 'CHANGE_CREATOR_POSITION'
const ADD_QUESTION = 'ADD_QUESTION'
const UPDATE_QUESTION_FIELD = 'UPDATE_QUESTION'
const UPDATE_DUD = 'UPDATE_DUD'
const ADD_DUD = 'ADD_DUD'
const UPDATE_CODE = 'UPDATE_CODE'
const ADD_CODE = 'ADD_CODE'
const DELETE_QUESTION = 'DELETE_QUESTION'
const UPDATE_QUIZ = 'UPDATE_QUIZ'
const DELETE_QUIZ = 'DELETE_QUIZ'
const UPDATE_QUIZ_FIELD = 'UPDATE_QUIZ_FIELD'
const UPDATE_CODE_TAB = 'UPDATE_CODE_TAB'

export const creatorActionCreators = {
  changeCreatorPosition: creatorPosition => ({ type: CHANGE_CREATOR_POSITION, creatorPosition }),
  addQuestion: () => ({ type: ADD_QUESTION }),
  updateQuestionField: (index, field, update) =>
    ({ type: UPDATE_QUESTION_FIELD, index, field, update }),
  deleteQuestion: index => ({ type: DELETE_QUESTION, index }),
  updateQuiz: quiz => ({ type: UPDATE_QUIZ, quiz }),
  deleteQuiz: () => ({ type: DELETE_QUIZ }),
  updateQuizField: (field, value) => ({ type: UPDATE_QUIZ_FIELD, field, value }),
  updateDud: (questionIndex, dudIndex, value) =>
    ({ type: UPDATE_DUD, questionIndex, dudIndex, value }),
  addDud: index => ({ type: ADD_DUD, index }),
  updateCode: (questionIndex, codeIndex, contents) =>
    ({ type: UPDATE_CODE, questionIndex, codeIndex, contents }),
  addCode: (index, language) => ({ type: ADD_CODE, index, language }),
  updateCodeTab: (questionIndex, tabIndex) => ({ type: UPDATE_CODE_TAB, questionIndex, tabIndex }),
}

const initialState = {
  creatorPosition: 0,
  questions: [],
  quiz: {
    title: '',
    description: '',
    timer: 0,
  },
}

export const creator = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CREATOR_POSITION:
      return {
        ...state,
        creatorPosition: action.creatorPosition,
      }
    case UPDATE_QUIZ_FIELD:
      return {
        ...state,
        quiz: {
          ...state.quiz,
          [action.field]: action.value,
        },
      }
    case ADD_QUESTION:
      return {
        ...state,
        questions: [...state.questions, {
          question: '',
          codes: [],
          code: 0,
          answer: '',
          duds: [],
          explanation: '',
        }],
      }
    case UPDATE_QUESTION_FIELD:
      return {
        ...state,
        questions: [
          ...state.questions.slice(0, action.index),
          {
            ...state.questions[action.index],
            [action.field]: action.update,
          },
          ...state.questions.slice(action.index + 1),
        ],
      }
    case UPDATE_DUD:
      return {
        ...state,
        questions: [
          ...state.questions.slice(0, action.questionIndex),
          {
            ...state.questions[action.questionIndex],
            duds: [
              ...state.questions[action.questionIndex].duds.slice(0, action.dudIndex),
              action.value,
              ...state.questions[action.questionIndex].duds.slice(action.dudIndex + 1),
            ],
          },
          ...state.questions.slice(action.questionIndex + 1),
        ],
      }
    case ADD_DUD:
      return {
        ...state,
        questions: [
          ...state.questions.slice(0, action.index),
          {
            ...state.questions[action.index],
            duds: [...state.questions[action.index].duds, ''],
          },
          ...state.questions.slice(action.index + 1),
        ],
      }
    case UPDATE_CODE:
      return {
        ...state,
        questions: [
          ...state.questions.slice(0, action.questionIndex),
          {
            ...state.questions[action.questionIndex],
            codes: [
              ...state.questions[action.questionIndex].codes.slice(0, action.codeIndex),
              {
                ...state.questions[action.questionIndex].codes[action.codeIndex],
                contents: action.contents,
              },
              ...state.questions[action.questionIndex].codes.slice(action.codeIndex + 1),
            ],
          },
          ...state.questions.slice(action.questionIndex + 1),
        ],
      }
    // This needs to reflect the fact that codes are objects
    case ADD_CODE:
      return {
        ...state,
        questions: [
          ...state.questions.slice(0, action.index),
          {
            ...state.questions[action.index],
            codes: [...state.questions[action.index].codes, {
              language: action.language,
              contents: '',
            }],
          },
          ...state.questions.slice(action.index + 1),
        ],
      }
    case UPDATE_CODE_TAB:
      return {
        ...state,
        questions: [
          ...state.questions.slice(0, action.questionIndex),
          {
            ...state.questions[action.questionIndex],
            code: action.tabIndex,
          },
          ...state.questions.slice(action.questionIndex + 1),
        ],
      }
    case DELETE_QUESTION:
      return {
        ...state,
        questions: [
          ...state.questions.slice(0, action.index),
          ...state.questions.slice(action.index + 1),
        ],
      }
    case UPDATE_QUIZ:
      return {
        ...state,
        quiz: action.quiz,
      }
    case DELETE_QUIZ:
      return {
        ...state,
        creatorPosition: 0,
        questions: [],
        quiz: {
          title: '',
          description: '',
          timer: 0,
        },
      }
    default:
      return state
  }
}
