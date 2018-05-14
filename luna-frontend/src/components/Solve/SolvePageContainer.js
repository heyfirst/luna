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

const LoadingLayout = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0,0,0,.7);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
`

const Loading = () => (
  <LoadingLayout>
    <h5>{`...Loading...`}</h5>
  </LoadingLayout>
)

const SolveLayout = ({ loading, onSubmit, onRunTest, code, task }) => (
  <div>
    { loading && <Loading />}
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
