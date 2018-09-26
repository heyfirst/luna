import React from 'react'
import styled, { css } from 'styled-components'
import * as R from 'ramda'

const ResultSpan = styled.span`
  ${props => props.success && css`
    color: green;
  `}
  ${props => props.fail && css`
    color: red;
  `}
`

const TestcaseContainer = styled.div`
  cursor: pointer;
  background-color: #0F1D33;
`

const Carat = styled.div`
  i {
    transform: rotate(${props => props.active ? '90deg' : '0deg'});
  }
`

class Testcase extends React.Component {
  state = {
    isOpen: false
  }

  handleOpen = () => {
    if (this.props.isHidden === 1) {
      return
    }
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    const {
      taskID,
      input,
      expectedValue,
      result,
      isHidden
    } = this.props

    return (
      <TestcaseContainer
        className="testcase p-2 mb-2"
        onClick={() => this.handleOpen()}
      >
        <div className="testcase-title">
          <Carat className="mx-2 d-inline-block" active={this.state.isOpen}>
            <i className="fa fa-caret-right" />
          </Carat>
          {
            (result !== undefined && isHidden !== 1 && result.status) &&
            <div className="float-right">
              <i className="fa fa-check-circle" aria-hidden="true" />
            </div>
          }
          {
            (isHidden === 1) &&
            <div className="float-right">
              <i className="fa fa-lock" aria-hidden="true" />
            </div>
          }
          {`Testcase #${taskID}`}
        </div>
        { this.state.isOpen && (
          <div className="mt-2">
            <div className="row">
              <div className="col-4">{`Input:`}</div>
              <div className="col-8">
                <span >{input}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-4">{`Output:`}</div>
              <div className="col-8">
                <ResultSpan
                  success={result !== undefined && result.status}
                  fail={result !== undefined && !result.status}
                >
                  {
                    result === undefined
                      ? `Empty`
                      : result.output
                  }
                </ResultSpan>
              </div>
            </div>
            <div className="row">
              <div className="col-4">{`Expected Output:`}</div>
              <div className="col-8">
                <span>{expectedValue}</span>
              </div>
            </div>
          </div>
        )}
      </TestcaseContainer>
    )
  }
}

export default Testcase
