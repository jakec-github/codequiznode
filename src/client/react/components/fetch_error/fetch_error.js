import React from 'react'
import PropTypes from 'prop-types'

FetchError.propTypes = {
  height: PropTypes.number,
  text: PropTypes.string,
  clickable: PropTypes.shape({
    clickable: PropTypes.bool,
    func: PropTypes.func,
  }),
}

FetchError.defaultProps = {
  height: 30,
  text: 'Connection Error!',
  clickable: {
    clickable: false,
    func: () => {},
  },
}

export default function FetchError({ height, text, clickable }) {
  const style = {
    height: `${height}rem`,
  }
  let template

  if (clickable.clickable) {
    template = (
      <div
        className="fetch-error__item fetch-error__item--clickable"
        onClick={clickable.func}
      >
        {text}
        <p className="fetch-error__click">Click here to retry!</p>
      </div>
    )
  } else {
    template = (
      <div className="fetch-error__item">
        {text}
      </div>
    )
  }

  return (
    <div
      className="fetch-error"
      style={style}
    >
      {template}
    </div>
  )
}
