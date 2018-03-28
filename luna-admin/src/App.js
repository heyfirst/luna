import React from 'react'
import { injectGlobal } from 'styled-components'
import {
  BrowserRouter,
  Route,
  Switch,
  Link, 
} from 'react-router-dom'

injectGlobal`
  body {
    background: #f7f7f7;
  }
`

const Home = props => (
  <div>{`LUNA ADMIN`}</div>
)

const App = props => (
  <div>
    <BrowserRouter>
      <Switch location={props.location}>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </div>
)

export default App
