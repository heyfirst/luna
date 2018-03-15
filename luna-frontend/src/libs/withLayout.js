import React from 'react'
import styled from 'styled-components'

export default (ComposedComponent) => {
  class withLayout extends React.Component {
    render () {
      return (
        <div>
          <ComposedComponent {...this.props} />
        </div>
      )
    }
  }

  return withLayout
}
