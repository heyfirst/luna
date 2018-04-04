import React from 'react'
import { Helmet } from 'react-helmet'

import { connect } from 'react-redux'
import { actions } from '../../ducks/reducers/solve'

import TopBar from './TopBar'
import TaskInfo from './TaskInfo'
import CodeEditor from './CodeEditor'
import TestcaseBar from './TestcaseBar'
import BottomBar from './BottomBar'

const SolvePage = ({ onSubmit, onRunTest, code, task }) => (
  <div>
    <Helmet>
      <title>{`Luna | Task: ${task.name}`}</title>
    </Helmet>
    <div>
      <TopBar />
      <TaskInfo />
      <CodeEditor />
      <BottomBar />
    </div>
  </div>
)

class SolvePageContainer extends React.Component {
  componentWillMount () {
    const taskID = this.props.match.params.taskID
    this.props.getTask(taskID)
  }

  onRunTest = async () => {
    this.props.runTest(this.props.task.id, this.props.code)
  }

  onSubmit = async () => {

  }

  render () {
    if (this.props.loading) return (<div>Loading ...</div>)
    return (<SolvePage
      onRunTest={this.onRunTest}
      onSubmit={this.onSubmit}
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
