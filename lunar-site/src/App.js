import React from 'react'
import { injectGlobal } from 'styled-components'
import {
  BrowserRouter,
  Route,
  Switch,
  Link, 
} from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'

import Editor from './components/Editor'

injectGlobal`
  body {
    background: #f7f7f7;
  }
`

const App = props => (
  <div>
    <BrowserRouter>
      <Switch location={props.location}>
        <Route path="/editor" component={Editor} />
      </Switch>
    </BrowserRouter>
  </div>
)

export default App
