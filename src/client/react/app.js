import 'babel-polyfill'

import React from 'react'

import Main from './components/main/container'
import User from './components/user/container'
import Logo from './components/logo/container'

export default function App() {
  return (
    <div id="react-wrapper">
      <User />
      <header className="header">
        <Logo />
      </header>
      <main>
        <Main />
      </main>
    </div>
  )
}
