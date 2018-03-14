import React from 'react'
import { Switch, Route } from 'react-router-dom'

import withLayout from '../../lib/withLayout'
import EditorPage from './EditorPage'

const EditorRoute = props => (
  <div>
    <Switch>
      <Route exact path='/editor' component={EditorPage} />
    </Switch>
  </div>
)

export default withLayout(EditorRoute)
