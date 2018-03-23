import React from 'react'
import { Helmet } from 'react-helmet'
import CodeEditor from './CodeEditor'

const SolvePage = () => (
  <div>
    <Helmet>
      <title>{`Luna | Solve`}</title>
    </Helmet>
    <div>
      <CodeEditor />
    </div>
  </div>
)

class SolvePageContainer extends React.Component {
  render () {
    console.log(this.props)
    return <SolvePage />
  }
}

export default SolvePageContainer
