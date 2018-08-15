import 'babel-polyfill'

import React from 'react'

import Main from './components/main/container'
// import User from './containers/user'
// import Icon from './containers/icon'

export default function App() {
  return (
    <div id="react-wrapper">
      {/* <User /> */}
      <header className="header">
        {/* <Icon /> */}
      </header>
      <main>
        <div className="app" id="quiz">
          <Main />
        </div>
      </main>
    </div>
  )
}
