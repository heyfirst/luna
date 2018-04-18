import React from 'react'
import styled from 'styled-components'

const TopBarContainer = styled.div`
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

const TopBar = () => (
  <TopBarContainer className="text-center">
    <h1>{`TopBar`}</h1>
  </TopBarContainer>
)

export default TopBar
