import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Home from './home'

configure({ adapter: new Adapter() })

describe('<Home />', () => {
  let wrapper
  const mockLoadQuizzes = jest.fn()

  beforeAll(() => {
    wrapper = shallow(<Home
      loadQuizzes={mockLoadQuizzes}
      allQuizzes={[
        {
          id: '12345',
          name: 'Quiz 1',
        },
        {
          id: '123456',
          name: 'Quiz 2',
        },
      ]}
      loggedIn={false}
      loadingAllQuizzes={false}
      scores={[]}
    />)
  })

  test('should render all quizzes', () => {
    expect(wrapper.find('.button--quiz')).toHaveLength(2)
  })
})
