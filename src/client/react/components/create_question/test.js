import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import CreateQuestion from './create_question'

configure({ adapter: new Adapter() })

describe('<CreateQuestion />', () => {
  let wrapper

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
    wrapper = shallow(<CreateQuestion
      creatorPosition={1}
      questions={questions}
    />)
  })
  test('should load correct question text', () => {
    expect(wrapper.find('.create-question__question').props().value)
      .toEqual('This is the question')
  })

  test('should load correct question text', () => {
    expect(wrapper.find('.create-question__explanation').props().value)
      .toEqual('This is the explanation')
  })
})
