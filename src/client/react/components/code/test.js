import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Code from './code'

configure({ adapter: new Adapter() })

describe('<Code />', () => {
  let wrapper

  beforeEach(() => {
    const questionSet = [
      {
        question: '',
        answer: '',
        explanation: '',
        duds: [],
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
    ]
    wrapper = shallow(<Code questionNumber={0} questionSet={questionSet} />)
  })

  test('should render correct number of code block elements', () => {
    expect(wrapper.find('.question__code-tab')).toHaveLength(2)
  })

  test('should render correct content', () => {
    expect(wrapper.find('.question__code-block').text()).toEqual('console.log(\'Hello World!\')')
  })

  test('should render correct context after click on unselected tab', () => {
    const event = {
      target: {
        dataset: {
          value: 1,
        },
      },
    }

    wrapper.find('.question__code-tab--unselected').simulate('click', event)
    expect(wrapper.find('.question__code-block').text()).toEqual('<html></html>')
  })

  test('should render correct context after click on selected tab', () => {
    const event = {
      target: {
        dataset: {
          value: 0,
        },
      },
    }

    wrapper.find('.question__code-tab--selected').simulate('click', event)
    expect(wrapper.find('.question__code-block').text()).toEqual('console.log(\'Hello World!\')')
  })
})
