import React from 'react'
import { compose } from 'recompose'
import { injectGlobal } from 'styled-components'
import { withRouter, Route } from 'react-router-dom'

import HelloPage from './components/Hello'
import BasicPage from './components/Basic'
import SolveRoutes from './components/Solve'
import TopicPage from './components/Topic'
import TaskRoute from './components/Task'

// Add Bootstrap.
import './static/css/bootstrap.min.css'
import './static/css/font-awesome.min.css'

injectGlobal`
  body {
    background: #f7f7f7;
  }
`

const App = props => (
  <div>
    <Route path="/" exact component={BasicPage} />
    <Route path="/hello" component={HelloPage} />
    <Route path="/solve" component={SolveRoutes} />
    <Route path="/topics" component={TopicPage} />
    <Route path="/topic" component={TaskRoute} />
  </div>
)

export default compose(
  withRouter
)(App)
