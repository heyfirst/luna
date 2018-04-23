import React from 'react'
import { connect } from 'react-redux'
import { actions as topicAction } from '../../ducks/reducers/topic'

class TopicList extends React.Component {

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
        return <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-6"> {this.state.topics.map((e, index) => ( 
                            <a href="#">
                            <div class="card" key={index} style={{ marginBottom: 23}}>
                            <div class="row">
                                <div class="col-sm-4 card-image" >
                                    <div style={{ backgroundColor: '#47C9D1', padding: 0, maxWidth: '100%', minWidth: '100%', maxHeight: '100%', minHeight: '100%' }}>
                                    </div>
                                </div>
                                <div class="col-sm-8 card-body" style={{ paddingRight: 50, color: 'black' }}>
                                    <h3>Title: {e.title}</h3>
                                    <p>Description: {e.description}</p>
                                    <br/>
                                    <div class="progress" style={{ height: 10 }}>
                                        <div class="progress-bar" style={{ width: '70%', height: 10, backgroundColor: '#47C9D1'}}></div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </a>
                        ))}
                        </div>
                        <div class="col-sm-3"></div>
                    </div>
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
)(TopicList)
