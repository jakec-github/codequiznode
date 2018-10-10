import 'babel-polyfill'

import React from 'react'

import Main from './components/main/container'
import User from './components/user/container'
import Logo from './components/logo/container'

export default function App() {
  return (
    <React.Fragment>
      <div className="u-push">
        <User />
        <header className="header">
          <Logo />
        </header>
        <main>
          <Main />
        </main>
      </div>
      <footer className="footer">
        <p>Web App by <a href="https://jakec.co.uk">Jake Chorley</a></p>
      </footer>
    </React.Fragment>
  )
}
