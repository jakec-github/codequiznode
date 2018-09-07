import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Signup from './Signup'

configure({ adapter: new Adapter() })

describe('<Signup />', () => {
  let wrapper
  const mockInitiateSignUp = jest.fn()
  const mockUpdateInput = jest.fn()

  beforeAll(() => {
    wrapper = shallow(<Signup
      initiateSignUp={mockInitiateSignUp}
      updateInput={mockUpdateInput}
      usernameInput="testdev1"
      passwordInput="qwerty"
      confirmPasswordInput="qwerty"
    />)
  })

  test('should initiate signup on valid submit', () => {
    const event = {
      preventDefault: jest.fn(),
    }
    wrapper.find('.user__submit').simulate('click', event)
    expect(mockInitiateSignUp.mock.calls.length).toBe(1)
  })

  test('should updateInput on input change', () => {
    const event = {
      target: {
        id: 'passwordInput',
        value: 'a',
      },
    }
    wrapper.find('#passwordInput').simulate('change', event)
    expect(mockUpdateInput.mock.calls[0][0])
      .toEqual('passwordInput')
  })
})
