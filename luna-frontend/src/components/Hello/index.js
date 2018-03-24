import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions as helloAction } from '../../ducks/reducers/hello'

const HelloPage = ({ text, setField, setHello }) => (
  <div>
    <p>Hello Text: {text}</p>
    <input type="text" onChange={e => setField('text', e.target.value)} />
    <button onClick={() => setHello(text)}>Submit</button>
  </div>
)

export default compose(
  connect(
    state => ({
      text: state.hello.text
    }),
    {
      setField: helloAction.setField,
      setHello: helloAction.setHello
    }
  )
)(HelloPage)
