import React from 'react'
import PropTypes from 'prop-types'

import Start from '../start/container'
import Question from '../question/container'
import Result from '../result/container'
import Timer from '../timer/container'

Quiz.propTypes = {
  quizProgress: PropTypes.string.isRequired,
  quizData: PropTypes.shape({
    timeLimit: PropTypes.number,
  }).isRequired,
}

export default function Quiz({ quizProgress, quizData: { timeLimit } }) {
  let quizSection
  switch (quizProgress) {
    case 'start':
      quizSection = <Start />
      break
    case 'question':
      quizSection = <Question />
      break
    case 'result':
      quizSection = <Result />
      break
    default:
      quizSection = <Start />
      break
  }
  console.log(quizProgress)
  console.log(timeLimit)
  const showTimer = quizProgress === 'question' && timeLimit > 0

  return (
    <div className="quiz">
      { showTimer &&
        <Timer />
      }
      { quizSection }
    </div>
  )
}
