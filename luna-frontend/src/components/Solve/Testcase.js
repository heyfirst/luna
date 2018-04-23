import React from 'react'
import styled from 'styled-components'

const TestcaseContainer = styled.div`
  cursor: pointer;
  background-color: #0F1D33;
`

export default class Testcase extends React.Component {
  state = {
    isOpen: false
  }

  render () {
    return (
      <TestcaseContainer className="testcase p-2 mb-2">
        <div>{`Testcase`}</div>
      </TestcaseContainer>
    )
  }
}
