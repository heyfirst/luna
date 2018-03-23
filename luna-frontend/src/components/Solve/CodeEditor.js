import React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/java'
import 'brace/theme/github'

export default class CodeEditor extends React.Component {
  state = {
    code: ''
  }

  onChange = value => this.setState({ code: value })

  render () {
    return <AceEditor
      mode="java"
      theme="github"
      onChange={this.onChange}
      value={this.state.code}
      editorProps={{ $blockScrolling: true }}
    />
  }
}
