import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './react/app'

import './scss/main.scss'

import { store, sagaMiddleware } from './store'
import rootSaga from './sagas/index'

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
)
