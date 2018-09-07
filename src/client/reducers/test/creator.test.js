import { creator, UPDATE_DUD, UPDATE_CODE } from '../creator'

describe('Creator Reducer', () => {
  test('should return initial state', () => {
    expect(creator(undefined, {})).toEqual({
      creatorPosition: 0,
      questions: [],
      quiz: {
        title: '',
        description: '',
        timer: 0,
      },
      submitted: false,
      newQuiz: '',
    })
  })

  test('should update correct dud', () => {
    const initialState = {
      creatorPosition: 2,
      questions: [
        {
          question: '',
          codes: [],
          code: 0,
          answer: '',
          duds: [
            'dud 1',
            'dud 2',
            'dud 3',
          ],
          explanation: '',
        },
        {
          question: '',
          codes: [],
          code: 0,
          answer: '',
          duds: [
            'dud 1',
            'dud 2',
            'dud 3',
          ],
          explanation: '',
        },
      ],
      quiz: {
        title: '',
        description: '',
        timer: 0,
      },
      submitted: false,
      newQuiz: '',
    }

    const action = {
      type: UPDATE_DUD,
      questionIndex: 0,
      dudIndex: 1,
      value: 'changed',
    }

    expect(creator(initialState, action)).toEqual({
      creatorPosition: 2,
      questions: [
        {
          question: '',
          codes: [],
          code: 0,
          answer: '',
          duds: [
            'dud 1',
            'changed',
            'dud 3',
          ],
          explanation: '',
        },
        {
          question: '',
          codes: [],
          code: 0,
          answer: '',
          duds: [
            'dud 1',
            'dud 2',
            'dud 3',
          ],
          explanation: '',
        },
      ],
      quiz: {
        title: '',
        description: '',
        timer: 0,
      },
      submitted: false,
      newQuiz: '',
    })
  })

  test('should update correct code', () => {
    const initialState = {
      creatorPosition: 2,
      questions: [
        {
          question: '',
          codes: [
            {
              language: 'javascript',
              contents: 'a1',
            },
            {
              language: 'html',
              contents: 'a2',
            },
            {
              language: 'css',
              contents: 'a3',
            },
          ],
          code: 0,
          answer: '',
          duds: [
            'dud 1',
            'dud 2',
            'dud 3',
          ],
          explanation: '',
        },
        {
          question: '',
          codes: [
            {
              language: 'javascript',
              contents: 'b1',
            },
            {
              language: 'html',
              contents: 'b2',
            },
            {
              language: 'css',
              contents: 'b3',
            },
          ],
          code: 0,
          answer: '',
          duds: [
            'dud 1',
            'dud 2',
            'dud 3',
          ],
          explanation: '',
        },
      ],
      quiz: {
        title: '',
        description: '',
        timer: 0,
      },
      submitted: false,
      newQuiz: '',
    }

    const action = {
      type: UPDATE_CODE,
      questionIndex: 1,
      codeIndex: 0,
      contents: 'changed',
    }

    expect(creator(initialState, action)).toEqual({
      creatorPosition: 2,
      questions: [
        {
          question: '',
          codes: [
            {
              language: 'javascript',
              contents: 'a1',
            },
            {
              language: 'html',
              contents: 'a2',
            },
            {
              language: 'css',
              contents: 'a3',
            },
          ],
          code: 0,
          answer: '',
          duds: [
            'dud 1',
            'dud 2',
            'dud 3',
          ],
          explanation: '',
        },
        {
          question: '',
          codes: [
            {
              language: 'javascript',
              contents: 'changed',
            },
            {
              language: 'html',
              contents: 'b2',
            },
            {
              language: 'css',
              contents: 'b3',
            },
          ],
          code: 0,
          answer: '',
          duds: [
            'dud 1',
            'dud 2',
            'dud 3',
          ],
          explanation: '',
        },
      ],
      quiz: {
        title: '',
        description: '',
        timer: 0,
      },
      submitted: false,
      newQuiz: '',
    })
  })
})
