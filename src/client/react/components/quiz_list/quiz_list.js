import React from 'react'
import PropTypes from 'prop-types'

import QuizLink from '../quiz_link/container'

QuizList.propTypes = {
  quizzes: PropTypes.arrayOf(PropTypes.string).isRequired,
}

// Ulitmately this component should take an array of quiz objects
export default function QuizList({ quizzes }) {
  return (
    <div className="quiz-list">
      {
        quizzes.map((id, i) => (
          <QuizLink
            id={id}
            key={i.toString()}
          />
        ))
      }
    </div>
  )
}
