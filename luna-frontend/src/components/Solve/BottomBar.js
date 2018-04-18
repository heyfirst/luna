import React from 'react'
import styled from 'styled-components'

const BottomBarContainer = styled.div`
  height: 3rem;
  background: #0F1D33;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 1.4rem;
    margin: 0;
  }
`
const BottomBar = () => (
  <BottomBarContainer>
    <div className="container">
      <div className="row">
        <div className="col-6">
          {`h1`}
        </div>
        <div className="col-6 text-right">
          <button className="btn btn-warning btn-sm mr-2">
            {`Run Test`}
          </button>
          <button className="btn btn-primary btn-sm">
            {`Submit`}
          </button>
        </div>
      </div>
    </div>
  </BottomBarContainer>
)

export default BottomBar
