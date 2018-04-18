import React from 'react'

import { connect } from 'react-redux'
import { actions } from '../../ducks/reducers/solve'

import SolveLayout from './SolveLayout'

import swal from 'sweetalert2'

class SolvePageContainer extends React.Component {
  componentWillMount () {
    const taskID = this.props.match.params.taskID
    this.props.getTask(taskID)
  }

  onRunTest = async () => {
  // this.props.runTest(this.props.task.id, this.props.code)
  }

  onSubmit = async () => {

  }

  render () {
    if (this.props.loading) return (<div>Loading ...</div>)

    return (<SolveLayout
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
