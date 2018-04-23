import React from 'react'
import styled from 'styled-components'
import CodeEditor from './CodeEditor'
import Testcase from './Testcase'

const Layout = styled.div`
  > div {
    height: 50%;
  }

  .result {
    background-color: #152D46;
    color: white;
  }

  .nav {
    height: 2rem;
    position: relative;
    a {
      color: white;
    }

    &:after {
      content: '';
      border-bottom: 1px solid white;
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }

  li {
    z-index: 10;
    margin-right: .5rem;

    &.active {
      border-bottom: 3px solid #47C9D1;

      a {
        color: #47C9D1;
      }
    }
  }
`

const TestcaseList = styled.div`
  height: calc(100% - 2rem);
  overflow: auto;

`

const Solution = () => (
  <Layout>
    <div>
      <CodeEditor />
    </div>
    <div className="result p-3">
      <ul className="nav mb-2">
        <li className="active"><a href="#">{`Testcases`}</a></li>
        <li><a href="#">{`Console`}</a></li>
      </ul>
      <TestcaseList>
        {
          [...Array(10)].map((testcase, index) => (
            <Testcase />
          ))
        }
      </TestcaseList>
    </div>
  </Layout>
)

export default Solution
