import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Layout from '../Core/Layout'
import TaskPage from './TaskPage'

const TaskRoute = props => (
    <Layout>
      <Switch>
        <Route exact path={`${props.match.path}/:id`} component={TaskPage}/>
      </Switch>
    </Layout>
  )
export default TaskRoute