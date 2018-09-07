import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  static propTypes = {
    updateQuestionField: PropTypes.func.isRequired,
    updateDud: PropTypes.func.isRequired,
    addDud: PropTypes.func.isRequired,
    updateCode: PropTypes.func.isRequired,
    updateCodeTab: PropTypes.func.isRequired,
    addCode: PropTypes.func.isRequired,
    creatorPosition: PropTypes.number.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  handleInputChange = ({ target }) => {
    this.props.updateQuestionField(
      this.props.creatorPosition - 1,
      target.name,
      target.value,
    )
  }

  handleAddCodeChange = ({ target }) => {
    this.props.addCode(this.props.creatorPosition - 1, target.value)
  }

  handleCodeChange = ({ target }) => {
    const { updateCode, creatorPosition } = this.props
    updateCode(creatorPosition - 1, target.dataset.value, target.value)
  }

  handleAddDudClick = () => {
    this.props.addDud(this.props.creatorPosition - 1)
  }

  handleDudChange = ({ target }) => {
    const { updateDud, creatorPosition } = this.props
    updateDud(creatorPosition - 1, target.dataset.value, target.value)
  }

  handleTabClick = ({ target }) => {
    const { updateCodeTab, creatorPosition } = this.props
    updateCodeTab(creatorPosition - 1, parseInt(target.dataset.value, 10))
  }

  handleCodeKey = (event) => {
    const { updateCode, creatorPosition } = this.props
    const {
      key,
      target,
      target: { value, selectionStart, selectionEnd },
    } = event
    if (key === 'Tab') {
      event.preventDefault()
      const newValue = `${value.substring(0, selectionStart)}\t${value.substring(selectionEnd)}`
      updateCode(creatorPosition - 1, target.dataset.value, newValue)
    }
  }

  render() {
    const {
      question,
      answer,
      explanation,
      duds,
      codes,
      code,
    } = this.props.questions[this.props.creatorPosition - 1]
    const tabs = []
    const codeContents = []
    const dudElements = []
    codes.forEach((codeObj, i) => {
      tabs.push((
        <article
          onClick={this.handleTabClick}
          className={i === code
            ? 'create-question__code-tab create-question__code-tab--selected'
            : 'create-question__code-tab create-question__code-tab--unselected'}
          data-value={i.toString()}
          key={i.toString()}
        >
          {codeObj.language}
        </article>
      ))
      codeContents.push((
        <textarea
          rows="12"
          className="create-question__code-content"
          data-value={i.toString()}
          key={i.toString()}
          onKeyDown={this.handleCodeKey}
          onChange={this.handleCodeChange}
          value={codes[i].contents} // Can this use codeObj?
          placeholder="Paste or type your code here"
        />
      ))
    })
    duds.forEach((dud, i) => {
      dudElements.push((
        <input
          className="create-question__choice create-question__choice--incorrect"
          data-value={i.toString()}
          key={i.toString()}
          placeholder="Incorrect Answer"
          onChange={this.handleDudChange}
          value={duds[i]}
        />))
    })
    const tabsStyle = {
      gridTemplateColumns: `repeat(${tabs.length < 3
        ? tabs.length + 1
        : tabs.length}, 1fr)`,
    }

    const progress = ((this.props.creatorPosition) / this.props.questions.length) * 100
    const progressStyle = {
      width: `${progress}%`,
    }
    // Potentially remove code items after they are selected
    return (
      <div className="create-question">
        <div className="question__progress-outer" id="total-progress">
          <div className="question__progress-score-box" id="progress-fraction">
            <p className="question__progress-score">
              { this.props.creatorPosition}/{this.props.questions.length}
            </p>
          </div>
          <div
            className="question__progress-inner"
            id="current-progress"
            style={progressStyle}
          />
        </div>
        <textarea
          name="question"
          rows="3"
          className="create-question__question u-margin-top-tiny"
          placeholder="Question"
          onChange={this.handleInputChange}
          value={question}
        />
        <article className="create-question__code" id="code-input">
          <div className="create-question__code-tabs" id="code-tabs" style={tabsStyle}>
            { tabs }
            { codes.length < 3 &&
              <select
                className="create-question__add-code"
                value="Add code"
                onChange={this.handleAddCodeChange}
              >
                <option value="Add code">Add code</option>
                <option value="html">html</option>
                <option value="css">css</option>
                <option value="javascript">javascript</option>
                <option value="python">python</option>
              </select>
            }
          </div>
          <pre id="monospace">
            { codeContents[code] }
          </pre>
        </article>
        <div className="create-question__choices">
          <input
            name="answer"
            className="create-question__choice create-question__choice--answer"
            onChange={this.handleInputChange}
            placeholder="Answer"
            value={answer}
          />
          {dudElements}
          { duds.length < 5 &&
            <div
              className="create-question__choice create-question__choice--add"
              onClick={this.handleAddDudClick}
            >
              Add incorrect answer
            </div>
          }
        </div>
        <textarea
          name="explanation"
          rows="6"
          className="create-question__explanation"
          onChange={this.handleInputChange}
          placeholder="Explanation"
          value={explanation}
        />
      </div>
    )
  }
}
