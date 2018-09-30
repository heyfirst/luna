import React from 'react'
import Navbar from '../Topic/navbar'
import TaskList from './taskList'
import styled from 'styled-components'

const Bg = styled.div`
    background-color: #152d46;
`

class TaskPage extends React.Component {

    render() {
        return <Bg>
                <Navbar />
                <br />
                <TaskList/>
               </Bg>
    }
}

export default TaskPage