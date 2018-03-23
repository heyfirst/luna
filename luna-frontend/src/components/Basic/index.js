import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../../ducks/count' 
class Basic extends React.Component {
  state = {
    count: 1
  }

  render () {

    return <div>
      { console.log(this.props) }
      <div>{this.state.count}</div>
      <button
        onClick={() => this.props.addCount()}
      >
        {`Plus`}
      </button>
    </div>
  }
}

export default connect(
  state => ({
    count: state.count.count
  }),
  {
    addCount: actions.plusCounter
  }
)(Basic)
