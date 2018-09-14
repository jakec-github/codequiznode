import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  static propTypes = {
    initiateAddFavourite: PropTypes.func.isRequired,
    initiateRemoveFavourite: PropTypes.func.isRequired,
    updateQuizProgress: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    owner: PropTypes.bool.isRequired,
    favourite: PropTypes.bool.isRequired,
    score: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  handleQuizClick = () => {
    const { name, creator, history, updateQuizProgress } = this.props
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
      name,
      creator,
      owner,
      favourite,
      score,
      authenticated,
    } = this.props
    return (
      <div
        className="quiz"
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
        { score !== -1 &&
          <div className="quiz__score">
            {score}%
          </div>
        }
      </div>
    )
  }
}
