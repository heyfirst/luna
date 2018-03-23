import React from 'react'
import { Helmet } from 'react-helmet'
import CodeEditor from './CodeEditor'

import { connect } from 'react-redux'
import { actions } from '../../ducks/reducers/solve'

const SolvePage = () => (
  <div>
    <Helmet>
      <title>{`Luna | Solve`}</title>
    </Helmet>
    <div>
      <CodeEditor />
    </div>
    <button className="btn btn-dark mt-2 ml-2">
      {`Run Test`}
    </button>
    <button className="btn btn-dark mt-2 ml-2">
      {`Submit`}
    </button>
  </div>
)

export default connect(
  state => ({

  }),
  {
    runTest: actions.runTest,
    submit: actions.submit
  }
)(SolvePage)
