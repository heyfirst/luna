import React from 'react'
import { connect } from 'react-redux'
import { actions as topicAction } from '../../ducks/reducers/topic'

class Topic extends React.Component {

    state = {
        loading: false,
        topics: []
    }

    async componentDidMount() {
        const topic = await this.props.getTopic().payload
            this.setState({
                 topics: topic
            })
    }
    
    render() {
        return <div>
            <ul>{ this.state.topics.map((e, index) => (
                <li key={index}>
                    <h3>Title: { e.title }</h3>
                    <p>Description: { e.description }</p>
                </li>
            ))}
            </ul>
        </div>
    }
}

export default connect(
    i => ({
        topic: i.topic
    }),
    {
        getTopic: topicAction.getTopic
    }
)(Topic)
