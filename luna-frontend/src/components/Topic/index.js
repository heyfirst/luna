import React from 'react'
import Navbar from './navbar'
import TopicList from './topiclist'

class Topic extends React.Component {

    render() {
        return <div>
                <Navbar />
                <br />
                <TopicList />
               </div>
    }
}

export default Topic