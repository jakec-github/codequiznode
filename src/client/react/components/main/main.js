import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../home/container'
import Quiz from '../quiz/container'
import Creator from '../creator/container'
import NotFound from '../not_found/not_found'

export default function Main() {
  return (
    <Switch>
      <Route
        path="/:username/:quiz"
        exact
        component={Quiz}
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
