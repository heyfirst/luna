import React from 'react'
import { injectGlobal } from 'styled-components'
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
} from 'react-router-dom'

import HelloPage from './components/Hello'

injectGlobal`
  body {
    background: #f7f7f7;
  }
`

const App = props => (
  <div>
    <BrowserRouter>
      <Switch location={props.location}>
        <Route path="/hello" component={HelloPage} />
      </Switch>
    </BrowserRouter>
  </div>
)

export default App
