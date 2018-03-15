import React from 'react'
import { compose } from 'recompose'
import { injectGlobal } from 'styled-components'
import { withRouter, Route, Link, Redirect } from 'react-router-dom'

import HelloPage from './components/Hello'

injectGlobal`
  body {
    background: #f7f7f7;
  }
`

const App = props => (
  <div>
    <Route path="/hello" exact component={HelloPage} />
  </div>
)

export default compose(
  withRouter
)(App)
