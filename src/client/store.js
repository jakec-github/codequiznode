import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { main } from './reducers/main'
import { user } from './reducers/user'
import { question } from './reducers/question'
import { creator } from './reducers/creator'

// Creates store
const rootReducer = combineReducers({
  user,
  main,
  question,
  creator,
})

export const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
)

// module.exports = store
