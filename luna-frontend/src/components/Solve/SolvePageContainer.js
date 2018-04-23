import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import { connect } from 'react-redux'
import { actions } from '../../ducks/reducers/solve'

import TopBar from './TopBar'
import TaskInfo from './TaskInfo'
import Solution from './Solution'
import BottomBar from './BottomBar'

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 6rem);

  > div {
    flex: 50%;
  }
`

const SolveLayout = ({ onSubmit, onRunTest, code, task }) => (
  <div>
    <Helmet>
      <title>{`Luna | Task: ${task.name}`}</title>
    </Helmet>
    <TopBar />
    <Layout>
      <TaskInfo />
      <Solution />
    </Layout>
    <BottomBar onRunTest={onRunTest} />
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
    return (<SolveLayout
      loading={this.props.loading}
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
