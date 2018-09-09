import React from 'react'
import PropTypes from 'prop-types'

Loading.propTypes = {
  height: PropTypes.number,
  text: PropTypes.string,
}

Loading.defaultProps = {
  height: 30,
  text: 'Loading...',
}

export default function Loading({ height, text }) {
  const style = {
    height: `${height}rem`,
  }

  return (
    <div
      className="loading"
      style={style}
    >
      <div className="loading__item">
        {text}
      </div>
    </div>
  )
}
