import React from 'react'
import PropTypes from 'prop-types'

import Progress from '../progress/container'
import Code from '../code/container'
import Panel from '../panel/container'


Question.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  questionSet: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function Question(props) {
  // Currently this is defined in three separate places
  const thisQuestion = props.questionSet[props.questionNumber]
  return (
    <div className="question">
      <Progress />
      <p className="question__text" id="question-text">
        {props.questionSet[props.questionNumber].question}
      </p>
      { thisQuestion.codes.length === 0 ? (undefined) : (
        <Code />
      )}
      <Panel />
    </div>
  )
}
