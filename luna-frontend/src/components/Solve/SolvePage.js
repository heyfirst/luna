import React from 'react'
import { Helmet } from 'react-helmet'
import CodeEditor from './CodeEditor'

import { connect } from 'react-redux'
import { actions } from '../../ducks/reducers/solve'

const SolvePage = ({ submit, runTest, code }) => (
  <div>
    <Helmet>
      <title>{`Luna | Solve`}</title>
    </Helmet>
    <div>
      <CodeEditor />
    </div>
    <button
      className="btn btn-dark mt-2 ml-2"
      onClick={() => runTest('1', code)}
    >
      {`Run Test`}
    </button>
    <button
      className="btn btn-dark mt-2 ml-2"
      onClick={() => submit('1', code)}
    >
      {`Submit`}
    </button>
  </div>
)

export default connect(
  state => ({
    code: state.solve.code
  }),
  {
    runTest: actions.runTest,
    submit: actions.submit
  }
)(SolvePage)
