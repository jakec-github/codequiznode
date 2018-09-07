import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import CreateQuiz from './create_quiz'

configure({ adapter: new Adapter() })

describe('<CreateQuiz />', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<CreateQuiz
      title="Title"
      description="Description"
      timer={5}
    />)
  })

  test('should render correct title', () => {
    expect(wrapper.find('.create-quiz__title').props().value)
      .toEqual('Title')
  })

  test('should render correct description', () => {
    expect(wrapper.find('.create-quiz__description').props().value)
      .toEqual('Description')
  })

  test('should render correct timer value', () => {
    expect(wrapper.find('.create-quiz__slider').props().value)
      .toEqual(5)
  })
})
