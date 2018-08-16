import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import Home from '../home/container'
import Start from '../start/container'
// import Question from '../containers/main/question'
// import Result from '../containers/main/result'
// import Creator from '../containers/main/creator'
// import Created from '../containers/main/created'

Main.propTypes = {
  location: PropTypes.string.isRequired, // Will remove
}

export default function Main(props) {
  console.log(props.location)

  return (
    <Switch>
      <Route
        path="/startquiz/:id"
        exact
        component={Start}
      />
      <Route
        path="/"
        exact
        component={Home}
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
