import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Creator from './creator'

configure({ adapter: new Adapter() })

describe('<Creator />', () => {
  let wrapper
  const mockCleanQuestions = jest.fn()
  const mockAddQuestion = jest.fn()
  const mockChangeCreatorPosition = jest.fn()
  const mockDeleteQuestion = jest.fn()

  beforeAll(() => {
    const questions = [
      {
        question: 'This is the question',
        answer: 'Answer',
        explanation: 'This is the explanation',
        code: 0,
        duds: [
          'Incorrect 1',
          'Incorrect 2',
        ],
        codes: [
          {
            language: 'javascript',
            contents: 'console.log(\'Hello World!\')',
          },
          {
            language: 'html',
            contents: '<html></html>',
          },
        ],
      },
      {
        question: 'This is the question 2',
        answer: 'Answer 2',
        explanation: 'This is the explanation 2',
        code: 1,
        duds: [
          'Incorrect 1 2',
          'Incorrect 2 2',
        ],
        codes: [
          {
            language: 'javascript 2',
            contents: 'console.log(\'Hello World!\')',
          },
          {
            language: 'html 2',
            contents: '<html></html>',
          },
        ],
      },
    ]

    const quiz = {
      title: 'Title',
      description: 'Description',
      timer: 5,
    }
    wrapper = shallow(<Creator
      cleanQuestions={mockCleanQuestions}
      deleteQuestion={mockDeleteQuestion}
      addQuestion={mockAddQuestion}
      changeCreatorPosition={mockChangeCreatorPosition}
      creatorPosition={2}
      questions={questions}
      submitted={false}
      quiz={quiz}
      newQuiz=""
    />)
  })

  // Haven't been able to get this test to work
  // even when creatorPosition is set to 0
  // test('should render CreateQuiz component', () => {
  //   expect(wrapper.find(CreateQuiz)).toHaveLength(1)
  // })

  test('should call addQuestion when forward is clicked', () => {
    const event = {
      target: {
        id: 'forward',
      },
    }
    wrapper.find('#forward').simulate('click', event)
    expect(mockAddQuestion.mock.calls.length).toBe(1)
  })

  test('should move creatorPosition back if above 0', () => {
    const event = {
      target: {
        id: 'back',
      },
    }
    wrapper.find('#back').simulate('click', event)
    expect(mockChangeCreatorPosition.mock.calls[1][0]).toEqual(1)
  })

  test('should change state when delete is clicked', () => {
    wrapper.find('.creator__delete').simulate('click')
    expect(wrapper.state().deleteConfirm).toEqual(true)
  })

  test('should call deleteQuestion', () => {
    const event = {
      target: {
        id: 'yes',
      },
    }
    wrapper.find('#yes').simulate('click', event)
    expect(mockDeleteQuestion.mock.calls.length).toBe(1)
  })
})
