import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import Home from '../home/container'
import Start from '../start/container'
import Question from '../question/container'
import Result from '../result/container'
import Creator from '../creator/container'
// import Created from '../containers/main/created'

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
    </Switch>
  )

  // return (
  //   <div className="App">
  //     { props.location === 'home' &&
  //       <Home />
  //     }
  //     { props.location === 'start' &&
  //       <Start />
  //     }
  //     {/* { props.location === 'quiz' &&
  //       <Question />
  //     }
  //     { props.location === 'result' &&
  //       <Result />
  //     }
  //     { props.location === 'creator' &&
  //       <Creator />
  //     }
  //     { props.location === 'created' &&
  //       <Created />
  //     } */}
  //   </div>
  // )
}
