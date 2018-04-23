import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

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
    <BottomBar />
  </div>
)

export default SolveLayout
