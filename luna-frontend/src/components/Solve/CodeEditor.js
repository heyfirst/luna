import React from 'react'
import 'brace'
import AceEditor from 'react-ace'

import { connect } from 'react-redux'
import { actions } from '../../ducks/reducers/solve'

import 'brace/mode/java'
import 'brace/theme/github'

class CodeEditor extends React.Component {
  onChange = value => this.props.setField('code', value)

  render () {
    return <AceEditor
      mode="java"
      theme="github"
      onChange={this.onChange}
      value={this.props.code}
      editorProps={{ $blockScrolling: true }}
    />
  }
}

export default connect(
  state => ({
    code: state.solve.code
  }),
  {
    setField: actions.setField
  }
)(CodeEditor)
