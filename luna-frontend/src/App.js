import React from 'react'
import { compose } from 'recompose'
import { injectGlobal } from 'styled-components'
import { withRouter, Route } from 'react-router-dom'

import HelloPage from './components/Hello'
import BasicPage from './components/Basic'
import SolveRoutes from './components/Solve'

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
  </div>
)

export default compose(
  withRouter
)(App)
