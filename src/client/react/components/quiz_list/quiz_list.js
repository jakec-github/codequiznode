import React from 'react'
import PropTypes from 'prop-types'

import Quiz from '../quiz/container'

QuizList.propTypes = {
  quizzes: PropTypes.arrayOf(PropTypes.string).isRequired,
}

// Ulitmately this component should take an array of quiz objects
export default function QuizList({ quizzes }) {
  return (
    <div className="quiz-list">
      {
        quizzes.map((id, i) => (
          <Quiz
            id={id}
            key={i.toString()}
          />
        ))
      }
    </div>
  )
}
