import React from 'react'
import { Helmet } from 'react-helmet'
import CodeEditor from './CodeEditor'

import { connect } from 'react-redux'
import { actions } from '../../ducks/reducers/solve'

const SolvePage = ({ submit, runTest, code, task }) => (
  <div>
    <Helmet>
      <title>{`Luna | Task: ${task.name}`}</title>
    </Helmet>
    <div>
      <CodeEditor />
    </div>
    <button
      className="btn btn-dark mt-2 ml-2"
      onClick={() => runTest('1', code)}
    >
      {`Run Test`}
    </button>
    <button
      className="btn btn-dark mt-2 ml-2"
      onClick={() => submit('1', code)}
    >
      {`Submit`}
    </button>
  </div>
)

class SolvePageContainer extends React.Component {
  componentWillMount () {
    const taskID = this.props.match.params.taskID
    this.props.getTask(taskID)
  }

  render () {
    if (this.props.loading) return (<div>Loading ...</div>)
    return (<SolvePage
      runTest={this.props.runTest}
      submit={this.props.submit}
      task={this.props.task}
    />)
  }
}

export default connect(
  state => ({
    loading: state.solve.loading,
    code: state.solve.code,
    task: state.solve.task
  }),
  {
    getTask: actions.getTask,
    runTest: actions.runTest,
    submit: actions.submit
  }
)(SolvePageContainer)
