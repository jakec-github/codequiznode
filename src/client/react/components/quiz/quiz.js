import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  static propTypes = {
    initiateAddFavourite: PropTypes.func.isRequired,
    initiateRemoveFavourite: PropTypes.func.isRequired,
    updateQuizProgress: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    allQuizzes: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.string.isRequired,
    scores: PropTypes.arrayOf(PropTypes.object).isRequired,
    favourites: PropTypes.arrayOf(PropTypes.string).isRequired,
    username: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  handleQuizClick = ({ currentTarget }) => {
    const { history, updateQuizProgress } = this.props
    const { name, creator } = currentTarget.dataset
    updateQuizProgress('start')
    const encodedQuiz = encodeURIComponent(name.replace(/ /g, '_'))
    history.push({
      pathname: `/${creator}/${encodedQuiz}`,
    })
  }

  handleFavouriteClick = (event) => {
    event.stopPropagation()
    const { target } = event
    const { id, initiateAddFavourite, initiateRemoveFavourite } = this.props
    if (target.id === 'off') {
      initiateAddFavourite(id)
    } else {
      initiateRemoveFavourite(id)
    }
  }

  render() {
    const {
      allQuizzes,
      id,
      authenticated,
      favourites,
      username,
      scores,
    } = this.props

    const { name, creator, length } = allQuizzes.filter(quiz => quiz.id === id)[0]

    const totalScore = scores.filter(score => score.quiz === id)
    // const favourite = favourites.some(favourite => )
    const percentScore = totalScore.length
      ? Math.floor((totalScore[0].score / length) * 100)
      : -1
    const favourite = favourites.includes(id)
    const owner = creator === username
    return (
      <div
        className="quiz"
        data-name={name}
        data-creator={creator}
        onClick={this.handleQuizClick}
      >
        <p className="quiz__name">
          {name}
        </p>
        <p className="quiz__creator">
          {creator}
        </p>
        { authenticated &&
          <div className="quiz__options">
            { favourite &&
              <svg
                className="quiz__icon"
                id="on"
                onClick={this.handleFavouriteClick}
              >
                <use xlinkHref="/sprite.svg#icon-star" />
              </svg>
            }
            { !favourite &&
              <svg
                className="quiz__icon"
                id="off"
                onClick={this.handleFavouriteClick}
              >
                <use xlinkHref="/sprite.svg#icon-star_border" />
              </svg>
            }
            { owner &&
              <React.Fragment>
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
        }
        { percentScore !== -1 &&
          <div className="quiz__score">
            {percentScore}%
          </div>
        }
      </div>
    )
  }
}
