import React from 'react'
import { compose } from 'recompose'
import { injectGlobal } from 'styled-components'
import { withRouter, Route } from 'react-router-dom'

import HelloPage from './components/Hello'
import BasicPage from './components/Basic'
import SolveRoutes from './components/Solve'
import TopicPage from './components/Topic'

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
    <Route path="/topic" component={TopicPage} />
  </div>
)

export default compose(
  withRouter
)(App)
