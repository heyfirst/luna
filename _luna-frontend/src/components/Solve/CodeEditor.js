import React from 'react'
import { injectGlobal } from 'styled-components'
import 'brace'
import AceEditor from 'react-ace'

import { connect } from 'react-redux'
import { actions } from '../../ducks/reducers/solve'

import 'brace/mode/java'
import 'brace/theme/monokai'

injectGlobal`
  #brace-editor {
    height: 100% !important;
    width: 100% !important;
  }
`

class CodeEditor extends React.Component {
  onChange = value => this.props.setField('code', value)

  render () {
    return <AceEditor
      mode="java"
      theme="monokai"
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
