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

  handleOpen = () => this.setState({ isOpen: !this.state.isOpen })

  render () {
    return (
      <TestcaseContainer
        className="testcase p-2 mb-2"
        onClick={() => this.handleOpen()}
      >
        <div className="testcase-title">
          <i className="fa fa-caret-right" />
          {`Testcase`}
        </div>
        { this.state.isOpen && (
          <div className="mt-2">
            <div className="row">
              <div className="col-4">{`Input:`}</div>
              <div className="col-8">
                { [...Array(2)].map((param, index) => (
                  <span key={index}>{`Param 1 = 1`}<br /></span>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="col-4">{`Output:`}</div>
              <div className="col-8">
                <span>{`Empty`}<br /></span>
              </div>
            </div>
            <div className="row">
              <div className="col-4">{`Expected Output:`}</div>
              <div className="col-8">
                <span>{`2`}<br /></span>
              </div>
            </div>
          </div>
        )}
      </TestcaseContainer>
    )
  }
}
