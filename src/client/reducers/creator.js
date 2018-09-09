const CHANGE_CREATOR_POSITION = 'CHANGE_CREATOR_POSITION'
const ADD_QUESTION = 'ADD_QUESTION'
const UPDATE_QUESTION_FIELD = 'UPDATE_QUESTION'
export const UPDATE_DUD = 'UPDATE_DUD'
const ADD_DUD = 'ADD_DUD'
export const UPDATE_CODE = 'UPDATE_CODE'
const ADD_CODE = 'ADD_CODE'
const DELETE_QUESTION = 'DELETE_QUESTION'
const UPDATE_QUIZ = 'UPDATE_QUIZ'
const DELETE_QUIZ = 'DELETE_QUIZ'
const UPDATE_QUIZ_FIELD = 'UPDATE_QUIZ_FIELD'
const UPDATE_CODE_TAB = 'UPDATE_CODE_TAB'
export const INITIATE_SUBMIT = 'INITIATE_SUBMIT'
export const COMPLETE_SUBMIT = 'COMPLETE_SUBMIT'
const REFRESH_SUBMITTED = 'REFRESH_SUBMITTED'
const CLEAN_QUESTIONS = 'CLEAN_QUESTIONS'

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
  initiateSubmit: () => ({ type: INITIATE_SUBMIT }),
  refreshSubmitted: () => ({ type: REFRESH_SUBMITTED }),
  cleanQuestions: () => ({ type: CLEAN_QUESTIONS }),
}

const initialState = {
  creatorPosition: 0,
  questions: [],
  quiz: {
    title: '',
    description: '',
    timer: 0,
  },
  sendingQuiz: false,
  submitted: false,
  newQuiz: '',
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
    case CLEAN_QUESTIONS:
      return {
        ...state,
        questions: state.questions.map(question => ({
          ...question,
          duds: question.duds.filter(dud => dud.length),
          codes: question.codes.filter(code => code.contents.length),
        })),
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
    case INITIATE_SUBMIT:
      return {
        ...state,
        sendingQuiz: true,
      }
    case COMPLETE_SUBMIT:
      return {
        ...state,
        creatorPosition: 0,
        questions: [],
        quiz: {
          title: '',
          description: '',
          timer: 0,
        },
        sendingQuiz: false,
        submitted: true,
        newQuiz: action.newQuiz,
      }
    case REFRESH_SUBMITTED:
      return {
        ...state,
        submitted: false,
        newQuiz: '',
      }
    default:
      return state
  }
}
