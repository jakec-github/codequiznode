import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Login from './login'

configure({ adapter: new Adapter() })

describe('<Login />', () => {
  let wrapper
  const mockInitiateLogin = jest.fn()
  const mockUpdateInput = jest.fn()

  beforeAll(() => {
    wrapper = shallow(<Login
      initiateLogin={mockInitiateLogin}
      updateInput={mockUpdateInput}
      usernameInput=""
      passwordInput=""
    />)
  })

  test('should initiate login on submit', () => {
    const event = {
      preventDefault: jest.fn(),
    }
    wrapper.find('.user__submit').simulate('click', event)
    expect(mockInitiateLogin.mock.calls.length).toBe(1)
  })

  test('should updateInput on input change', () => {
    const event = {
      target: {
        id: 'passwordInput',
        value: 'a',
      },
    }

    wrapper.find('#passwordInput').simulate('change', event)
    expect(mockUpdateInput.mock.calls[0][0]).toEqual('passwordInput')
  })
})
