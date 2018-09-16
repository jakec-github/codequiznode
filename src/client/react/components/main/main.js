import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import Home from '../home/container'
import Start from '../start/container'
import Question from '../question/container'
import Result from '../result/container'
import Creator from '../creator/container'
import NotFound from '../not_found/not_found'

Main.propTypes = {
  quizProgress: PropTypes.string.isRequired,
}

export default function Main(props) {
  let quizProgress
  switch (props.quizProgress) {
    case 'start':
      quizProgress = Start
      break
    case 'question':
      quizProgress = Question
      break
    case 'result':
      quizProgress = Result
      break
    default:
      quizProgress = Start
      break
  }

  return (
    <Switch>
      <Route
        path="/:username/:quiz"
        exact
        component={quizProgress}
      />
      <Route
        path="/"
        exact
        component={Home}
      />
      <Route
        path="/quizEditor"
        exact
        component={Creator}
      />
      <Route
        component={NotFound}
      />
    </Switch>
  )
}
