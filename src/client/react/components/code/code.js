import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  static propTypes = {
    questionNumber: PropTypes.number.isRequired,
    questionSet: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      code: 0,
    }
  }

  handleTabClick = ({ target: { dataset } }) => {
    const newCode = parseInt(dataset.value, 10)
    if (newCode !== this.state.code) {
      this.setState({
        code: newCode,
      })
    }
  }

  render() {
    const thisQuestion = this.props.questionSet[this.props.questionNumber]
    const tabs = []
    for (let i = 0; i < thisQuestion.codes.length; i += 1) {
      tabs.push((
        <article
          onClick={this.handleTabClick}
          className={i === this.state.code
            ? 'question__code-tab question__code-tab--selected'
            : 'question__code-tab question__code-tab--unselected'}
          data-value={i.toString()}
          key={i.toString()}
        >
          {thisQuestion.codes[i].language}
        </article>
      ))
    }
    const code = (
      <article className="question__code-block">
        {thisQuestion.codes[this.state.code].contents}
      </article>
    )
    const tabsStyle = {
      gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
    }
    return (
      <article className="question__code" id="code">
        <div className="question__code-tabs" id="code-tabs" style={tabsStyle}>
          {tabs}
        </div>
        <pre className="question__monospace" id="monospace">
          <code>
            {code}
          </code>
        </pre>
      </article>
    )
  }
}
