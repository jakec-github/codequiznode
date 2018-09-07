import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from './app'

configure({ adapter: new Adapter() })

describe('<App />', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<App />)
  })

  test('should load header', () => {
    expect(wrapper.find('header')).toHaveLength(1)
  })
})
