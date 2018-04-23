import React from 'react'
import styled from 'styled-components'

const BottomBarContainer = styled.div`
  height: 3rem;
  background: #0F1D33;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  h1 {
    font-size: 1.4rem;
    margin: 0;
  }
`

const Navigator = styled.ul`
  height: 100%;
  li {
    display: flex;
    align-items: center;
    z-index: 10;
    margin-right: .5rem;
    padding: 0 .5rem;

    a {
      color: #fff;
    }

    &.active {
      border-bottom: 3px solid #47C9D1;

      a {
        color: #47C9D1;
      }
    }
  }

`

const BottomBar = () => (
  <BottomBarContainer>
    <Navigator className="nav">
      <li className="active"><a href="#">{`Detail`}</a></li>
      <li><a href="#">{`Discussion`}</a></li>
      <li><a href="#">{`Solution`}</a></li>
    </Navigator>
    <div>
      <button className="btn btn-warning mr-2">{`Run Test`}</button>
      <button className="btn btn-primary">{`Submit Code`}</button>
    </div>
  </BottomBarContainer>
)

export default BottomBar
