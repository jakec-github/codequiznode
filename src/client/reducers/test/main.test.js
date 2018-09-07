import { main, ADD_QUIZZES } from '../main'

describe('Main Reducer', () => {
  test('should return initial state', () => {
    expect(main(undefined, {})).toEqual({
      location: 'home',
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
    })
  })

  test('should add quizzes correctly', () => {
    const initialState = {
      location: 'home',
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
    }

    const action = {
      type: ADD_QUIZZES,
      allQuizzes: [
        {
          _id: 1,
          name: '1',
          description: '1',
          timeLimit: 1,
          featured: false,
          __v: 0,
        },
        {
          _id: 2,
          name: '2',
          description: '2',
          timeLimit: 2,
          featured: false,
          __v: 0,
        },
      ],
    }

    expect(main(initialState, action)).toEqual({
      location: 'home',
      questionProgress: 'question',
      quizProgress: 'start',
      allQuizzes: [
        {
          _id: 1,
          name: '1',
          description: '1',
          timeLimit: 1,
          featured: false,
          __v: 0,
        },
        {
          _id: 2,
          name: '2',
          description: '2',
          timeLimit: 2,
          featured: false,
          __v: 0,
        },
      ],
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
    })
  })
})
