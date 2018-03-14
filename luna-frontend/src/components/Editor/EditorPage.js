import React from 'react'
import styled from 'styled-components'
import { Header, Segment, Grid, Button } from 'semantic-ui-react'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/java'
import 'brace/theme/monokai'

const StyleAceEditor = styled(AceEditor)`
  width: 100% !important;
`

export default class EditorPage extends React.Component {
  state = {
    code: 'public static void main(String[] args) {\n  System.out.println("Hello World");\n}'
  }

  onChange = (field) => (value) => this.setState({ [field]: value })

  onSubmit = () => {
    console.log(this.state)
  }

  render () {
    return <div>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as='h1'>Editor</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis explicabo fugiat libero enim error dolore aut delectus quis dolorum blanditiis! Asperiores cupiditate velit quod corporis impedit, maxime quia nam laborum!</p>
              <Button
                fluid
                type="button"
                onClick={() => this.onSubmit()}
              >{`Send Code`}</Button>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>
              <StyleAceEditor
                mode="java"
                theme="monokai"
                fontSize={14}
                showPrintMargin
                showGutter
                highlightActiveLine
                onChange={this.onChange('code')}
                value={this.state.code}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                  // enableBasicAutocompletion: true,
                  // enableLiveAutocompletion: true,
                  // enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2
                }}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  }
}
