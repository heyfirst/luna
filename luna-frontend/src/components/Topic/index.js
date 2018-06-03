import React from 'react'
import Navbar from './navbar'
import TopicList from './topiclist'
import styled from 'styled-components'

const Bg = styled.div`
    background-color: #152d46;
`

class Topic extends React.Component {

    render() {
        return <Bg>
                <Navbar />
                <br />
                <TopicList />
               </Bg>
    }
}

export default Topic