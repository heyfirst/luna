import React from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { Container } from 'semantic-ui-react'

const WrapperContainer = styled(Container)`
  padding: 1em;
`

export default (ComposedComponent) => {
  class withLayout extends React.Component {
    render () {
      return (
        <div>
          <WrapperContainer fluid>
            <ComposedComponent {...this.props} />
          </WrapperContainer>
        </div>
      )
    }
  }

  return withRouter(withLayout)
}
