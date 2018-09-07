import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Logo from './logo'

configure({ adapter: new Adapter() })

describe('<Logo />', () => {
  let wrapper
  const mockPush = jest.fn()

  beforeAll(() => {
    const history = {
      push: mockPush,
    }
    wrapper = shallow(<Logo
      history={history}
    />)
  })

  test('should update history', () => {
    wrapper.find('h2').simulate('click')
    expect(mockPush.mock.calls[0][0].pathname).toEqual('/')
  })
})
