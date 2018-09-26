import React from 'react'
import { connect } from 'react-redux'

const TaskInfo = ({ task }) => (
  <div className="p-4">
    { console.log(task) }
    <h1>{ task.task_name }</h1>
    <p>{ task.detail }</p>
  </div>
)

export default connect(
  state => ({
    task: state.solve.task
  }),
  null
)(TaskInfo)
