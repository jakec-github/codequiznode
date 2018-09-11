import React from 'react'
import PropTypes from 'prop-types'

Quiz.propTypes = {
  name: PropTypes.string.isRequired, // may change to title
  creator: PropTypes.string.isRequired,
  owner: PropTypes.bool.isRequired,
  favourite: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
}


export default function Quiz({ name, creator, owner, score, favourite }) {
  return (
    <div className="quiz">
      <p className="quiz__name">
        {name}
      </p>
      <p className="quiz__creator">
        {creator}
      </p>
      <div className="quiz__options">
        { owner &&
          <React.Fragment>
            { favourite &&
              <svg
                className="quiz__icon"
              >
                <use xlinkHref="/sprite.svg#icon-star" />
              </svg>
            }
            { !favourite &&
              <svg
                className="quiz__icon"
              >
                <use xlinkHref="/sprite.svg#icon-star_border" />
              </svg>
            }
            <svg
              className="quiz__icon"
            >
              <use xlinkHref="/sprite.svg#icon-mode_edit" />
            </svg>
            <svg
              className="quiz__icon"
            >
              <use xlinkHref="/sprite.svg#icon-delete" />
            </svg>
          </React.Fragment>
        }
      </div>
      { score !== -1 &&
        <div className="quiz__score">
          {score}%
        </div>
      }
    </div>
  )
}
