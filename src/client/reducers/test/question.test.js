import {
  question,
  ITERATE_QUESTION,
  ITERATE_SCORE,
  RESET_QUIZ,
  SET_QUESTIONS,
} from '../question'

describe('Question Reducer', () => {
  const initialState = {
    questionNumber: 0,
    questionSet: [],
    score: 0,
  }

  test('should return initial state', () => {
    expect(question(undefined, {})).toEqual(initialState)
  })

  test('should iterate question', () => {
    const action = { type: ITERATE_QUESTION }

    expect(question(initialState, action)).toEqual({
      questionNumber: 1,
      questionSet: [],
      score: 0,
    })
  })

  test('should iterate score', () => {
    const action = { type: ITERATE_SCORE }

    expect(question(initialState, action)).toEqual({
      questionNumber: 0,
      questionSet: [],
      score: 1,
    })
  })

  test('should reset quiz', () => {
    const oldState = {
      questionNumber: 5,
      questionSet: [],
      score: 4,
    }
    const action = { type: RESET_QUIZ }

    expect(question(oldState, action)).toEqual(initialState)
  })

  test('should set questions', () => {
    const action = {
      type: SET_QUESTIONS,
      questionSet: [
        {
          question: '1',
          answer: '1',
          explanation: '1',
          duds: [
            '1a',
            '1b',
          ],
          codes: [
            '1a',
            '1b',
          ],
        },
        {
          question: '2',
          answer: '2',
          explanation: '2',
          duds: [
            '2a',
            '2b',
          ],
          codes: [
            '2a',
            '2b',
          ],
        },
      ],
    }

    expect(question(initialState, action)).toEqual({
      questionNumber: 0,
      questionSet: [
        {
          question: '1',
          answer: '1',
          explanation: '1',
          duds: [
            '1a',
            '1b',
          ],
          codes: [
            '1a',
            '1b',
          ],
        },
        {
          question: '2',
          answer: '2',
          explanation: '2',
          duds: [
            '2a',
            '2b',
          ],
          codes: [
            '2a',
            '2b',
          ],
        },
      ],
      score: 0,
    })
  })
})
